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
  // these props are for a new node
  // when type = 'update', "id" is passed as a param
  props: ["user", "type", "parentType", "parentId" ],
  validations: {
    url: { required },
    label: { required }
  },
  data() {
    return {
      label: "",
      details: "",
      url: "",
      isUpdate: false,
      nodeId: null,
      myNode: null
    };
  },
  methods: {
    ...mapActions("conversation", { findConversations: "find" }),
    doUpdate() {
      conversation
          .find({ query: { nodeId: this.$data.nodeId, skippop: true } })
          .then(response => {
        const resp = response.data[0]
        //    alert(JSON.stringify(resp))
        this.$data.myNode = resp;
        this.$data.label = resp.label;
        this.$data.details = resp.details;
        this.$data.url = resp.url;
      });
    },
    async doSubmit() {
      const params = {};
      params.depth = 0;
      //alert(this.$data.nodeId, this.type)
      //Create question, answer, pro, or cons child quest
      if (this.type === "update") {
        var json = this.$data.myNode; //response.data[0];
        // alert('NF-1', JSON.stringify(json))
        json.label = this.label;
        json.details = this.details;
        json.url = this.url;
        console.info("NVU-1", json);
        conversation.update(json._id, json).then(response => {
          console.info("NVU-2", response);
          router.push({ name: "questview", params: { id: json.nodeId } });
        });
      } else {
        let typ = this.type
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
          json.img = "statics/images/issue.png";
          json.imgsm = "statics/images/issue_sm.png";
        } else if (typ === "answer") {
          json.img = "statics/images/position.png";
          json.imgsm = "statics/images/position_sm.png";
        } else if (typ === "pro") {
          json.img = "statics/images/plus.png";
          json.imgsm = "statics/images/plus_sm.png";
        } else if (typ === "con") {
          json.img = "statics/images/minus.png";
          json.imgsm = "statics/images/minus_sm.png";
        }
        conversation
          .find({ query: { nodeId: this.parentId, skippop: true } })
          .then(response => {
            const resp = response.data[0]
            const label = resp.label //*
            console.log("NF-1", this.parentId, label)
            // Get parent id from current node, current node becomes the parent of future node
            json.parentId = this.parentId;
            json.parentLabel = label;
            //idx is now the nodeId for the newly created child quest
            const idx = json.nodeId;
            console.info("NodeForm", "creating conversation", JSON.stringify(json));
            conversation.create(json).then(async response => {
              router.push({ name: "questview", params: { id: idx } });
              //Parent node is updated in server
            });
        });
      }
    }
  },
  mounted() {
    // NOTE: Dual Use
    // If type === "update", we are editing the node
    // Must fetch it
    // Otherwise, this is a node-creation event
    //alert("editing")
    router = this.$router;
    this.$store.commit("questView", false);
    //this.$data.type = this.$route.params.type;
    if (this.type === "update") {
      //alert('updating', this.parentType, this.parentId, this.parentLabel)
      // called by the route 'nodeupdate'
      this.$data.isUpdate = true;
      // myId is this node's identity; it's being updated
      this.$data.nodeId = this.$route.params.id;
      // Go fetch this node for editing
      this.doUpdate();
    } 
  }
};
</script>

<style>
</style>
