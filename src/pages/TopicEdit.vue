<template>
  <q-page :padding="true">
      <h6>Topic Edit Form</h6>
      <h6 v-if="type">New Child Topic</h6>
      <div>
        <b>Subject</b><br/>
        <q-input v-model="label" />
      </div>
      <div>
        <b>URL</b> (Optional)<br/>
        <q-input  v-model="url" />
      </div>
      <div>
        <b>Details</b><br/>
        <ckeditor type="classic" class="details" :editor="editor" v-model="details"  @ready="onReady"></ckeditor>
      <!-- <vue-editor v-model="details"></vue-editor> -->
      </div>
      <div>
        <q-btn label="Submit" @click="doSubmit" /><q-btn label="Cancel" @click="$router.replace('/home')" />
      </div>
  </q-page>
</template>

<script>
//Called by two routes from TopicView.vue:
//  topicedit no params for a new topic
//  topicchild/:id/:type  where id is parentId, and type is oneOf 'subclass' or 'instance'
//Note that topic nodes are edited with NodeForm.vue
//https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs.html
/*import Vue from 'vue'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
//import DocumentEditor from '@ckeditor/ckeditor5-build-classic'
import VueCkeditor from 'vue-ckeditor5'
const options = {
  editors: {
    classic: DecoupledEditor,
  },
  name: 'ckeditor'
}
 
Vue.use(VueCkeditor.plugin, options);*/
import { VueEditor, Quill } from 'vue2-editor'
import api from 'src/api'
const uuidv4 = require('uuid/v4')
const conversation = api.service('conversation')
var router

export default {
  props: ["id", "type"],
  components: {
      VueEditor
   },
  data () {
    return {
      // editor: DecoupledEditor,
      // editorConfig: {
			// 	},
      label: '',
      details: '',
      url: '',
      // id: '',
      // user: 
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    onReady( editor )  {
        //document.body.prepend( editor.ui.view.toolbar.element );
        editor.ui.getEditableElement().parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement()
                );
			},
    doSubmit: function () {
      // alert(this.label);
      // alert(this.details);
      // alert(this.type);
      var mytype = this.type
      //console.log('TopicEditDid', mytype)
      var json = {}
      json.nodeId = uuidv4()
      json.label = this.label
      json.url = this.url
      json.details = this.details
      json.img = 'statics/images/cogwheel.png'
      json.imgsm = 'statics/images/cogwheel_sm.png'
      json.creator = this.user._id
      json.handle = this.user.handle
      json.date = new Date()
      json.type = 'topic'
      if (mytype) {
        //only a mytype if this is a child of some other topic
        var kid
        if (mytype === 'subclass') {
          //subclass we are only allowing single inheritance for now
          json.subOf = this.id
        } else {
          json.instanceOf = this.id
        }
      }
      console.info('QFT-1', this.user)
      console.info('QFT-2', json)
      // use the conversation node database
      conversation.create(json).then((response) => {   
          router.push('/topics')
          // parents, if any, set in server
      })
    }
  },
  mounted () {
    console.info('TopicEdit', 'mounted', this.type, this.id);
    //either subclass or instance
    // this.$data.type = this.$route.params.type
    //if this is a subclass or instance, id is parent topic
    // this.$data.id = this.$route.params.id
    // console.log('TopicEdit',this.$data.type,this.$data.id)
    router = this.$router
    this.$store.commit('questView', false)
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style>
.details {
  max-width: 960px;
  height: 400px;
  overflow-wrap: normal;
}
</style>
