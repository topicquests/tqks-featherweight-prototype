<template>
    <q-page :padding="true">
        <h6>Node Edit Form</h6>
        
        <div>
          <b>Subject</b><br/>
          <q-input v-model="label" pattern="[A-Za-z0-9 ]*" required/>
        </div>
        <div>
          <b>URL</b> (Optional)<br/>
          <q-input v-model="url" type="url"/>
        </div>
        <div>
          <b>Details</b><br/>
          <ckeditor type="classic" v-model="details"></ckeditor>
        </div>
        <div>
          <q-btn label="Submit" @click="doSubmit" />
          <q-btn label="Cancel" @click="$router.replace('/home')" />
        </div>
    </q-page>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import VueCkeditor from "vue-ckeditor5";
const options = {
  editors: {
    classic: ClassicEditor
  },
  name: "ckeditor"
};

Vue.use(VueCkeditor.plugin, options);
import { required } from "vuelidate/lib/validators";
import api from "src/api";
const uuidv4 = require("uuid/v4");
const conversation = api.service("conversation");
var router;

export default {
  props: ["user"],
  validations: {
    url: { required },
    label: { required }
  },
  data() {
    return {
      label: "",
      details: "",
      url: "",
      type: "",
      parentId: "",
      parentType: "",
      parentLabel: "",
      isUpdate: false,
      myId: "",
      myNode: null
    };
  },
  methods: {
    ...mapActions("conversation", { findConversations: "find" }),
    doUpdate() {
      conversation.get(this.myId, this.nodeId).then(response => {
        this.myNode = response;
        this.label = response.label;
        this.details = response.details;
        this.url = response.url;
      });
    },
    async doSubmit() {
      // alert(this.label)
      // alert(this.details);
      var typ = this.$data.type;
      const params = {};
      params.depth = 0;
      //Create question, answer, pro, or cons child quest
      if (typ === "update") {
        conversation
          .find({ query: { nodeId: this.myId, skippop: true } })
          .then(response => {
            var json = response.data[0];
            // alert('NF-1', JSON.stringify(json))
            json.label = this.label;
            json.details = this.details;
            json.url = this.url;
            console.info("NVU-1", json);
            conversation.update(json.id, json).then(response => {
              console.info("NVU-2", response);
              router.push({ name: "questview", params: { id: json.id } });
            });
          });
      } else {
        var json = {};
        json.nodeId = uuidv4();
        json.label = this.label;
        json.details = this.details;
        json.url = this.url;
        json.creator = this.user._id;
        json.handle = this.user.handle;
        json.date = new Date();
        json.type = typ;
        // Add icons
        if (typ === "question") {
          json.img = "statics/images/ibis/issue.png";
          json.imgsm = "statics/images/ibis/issue_sm.png";
        } else if (typ === "answer") {
          json.img = "statics/images/ibis/position.png";
          json.imgsm = "statics/images/ibis/position_sm.png";
        } else if (typ === "pro") {
          json.img = "statics/images/ibis/plus.png";
          json.imgsm = "statics/images/ibis/plus_sm.png";
        } else if (typ === "con") {
          json.img = "statics/images/ibis/minus.png";
          json.imgsm = "statics/images/ibis/minus_sm.png";
        }

        // Get parent id from current node, current node becomes the parent of future node
        json.parentId = this.$data.parentId;
        json.parentLabel = this.$data.parentLabel;
        //idx is now the nodeId for the newly created child quest
        const idx = json.nodeId;

        console.info("NodeForm", "creating conversation", JSON.stringify(json));
        conversation.create(json).then(async response => {
          const id = response.parentId;
          router.push({ name: "questview", params: { id: id } });
        });
      }
    }
  },
  mounted() {
    // NOTE: Dual Use
    // If type === "update", we are editing the node
    // Must fetch it
    // Otherwise, this is a node-creation event
    router = this.$router;
    this.$store.commit("questView", false);
    this.$data.type = this.$route.params.type;
    if (this.$data.type === "update") {
      // called by the route 'nodeupdate'
      this.$data.isUpdate = true;
      // myId is this node's identity; it's being updated
      this.$data.myId = this.$route.params.nodeId;
      this.doUpdate();
    } else {
      // called by the route 'nodeedit'
      //path: "/nodeedit/:type/:parentType/:id/:label",
      this.$data.parentId = this.$route.params.id;
      this.$data.parentType = this.$route.params.parentType;
      this.$data.parentLabel = this.$route.params.label;
      console.info("NodeEdit: ", this.$data);
    }
  }
};
</script>

<style>
</style>
