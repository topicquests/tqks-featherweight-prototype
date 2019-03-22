<template>
    <q-page :padding="true">
        <h6>Node Edit Form</h6>
        
        <div>
          <b>Page Title</b> (should not edit)<br/>
          <q-input v-model="label" required/>
        </div>
        <div>
          <b>URL</b> (should not edit)<br/>
          <q-input v-model="url" />
        </div>
        <div>
          <b>Annotation</b><br/>
          <ckeditor type="classic" v-model="details"></ckeditor>
        </div>
        <div>
          <q-btn label="Submit" @click="doSubmit" /><q-btn label="Cancel" @click="$router.replace('/home')" />
        </div>
    </q-page>
</template>
<script>
import Vue from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VueCkeditor from 'vue-ckeditor5'
const options = {
  editors: {
    classic: ClassicEditor,
  },
  name: 'ckeditor'
}
 
Vue.use(VueCkeditor.plugin, options);
import { required } from 'vuelidate/lib/validators'
import api from 'src/api'
const uuidv4 = require('uuid/v4')
const conversation = api.service('conversation')
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
      isUpdate: false,
      myId: "",
      myNode: null
    };
  },
  methods: {
    async doSubmit() {
      var json = {};
      json.nodeId = uuidv4();
      json.label = this.label;
      json.details = this.details;
      json.url = this.url;
      json.creator = this.user._id;
      json.handle = this.user.handle;
      json.date = new Date();
      json.type = "bookmark";
      json.img = "statics/images/bookmark.png";
      json.imgsm = "statics/images/bookmark_sm.png";
      conversation.create(json).then(response => {
        this.$router.push({ name: "questview", params: { id: json.nodeId } });
      });
    }
  },
  mounted() {
    this.$store.commit("questView", false);
    let url = this.$route.query.url;
    this.$data.url = url;
    this.$data.label = this.$route.query.title;
    //TODO there is an opportunity to push these values
    //to localStore and set a flag to return here after
    //authentication
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push("/signin");
    }
  }
};
</script>
<style>
</style>