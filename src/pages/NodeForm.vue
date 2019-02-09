<template>
    <q-page :padding="true">
        <h6>Node Edit Form</h6>
        
        <div>
          <b>Subject</b><br/>
          <q-input v-model="label" required/>
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
var router

export default {
  props: [ 'user' ],
  validations: {
    url: { required },
    label: { required },
  },
  data () {
    return {
      label: '',
      details: '',
      url: '',
      type: '',
      parentId: '',
      parentType: '',
      parentLabel: '',
      isUpdate: false,
      myId: '',
      myNode: null
    }
  },
  methods: {
    validateURL () {
      var urx = this.url
      //see to it that, if there is a url, it's valid
      if (urx !== '') {
        if ((!/^https?:\/\//i.test(urx)) || 
            (!/^ftp:\/\//i.test(urx))) {
                        urx = 'http://' + urx;
                        this.url = urx
                    }

      }
    },
    doUpdate () {
      conversation.get(this.myId)
        .then ((response ) => {
          this.validations()
          this.myNode = response
          this.label = response.label
          this.details = response.details
          this.url = response.url
        })
    },
    async doSubmit () {
      // alert(this.label)
      // alert(this.details);
      this.validateURL()
      var typ = this.$data.type
      const params = {}
        params.depth = 0
      if (typ === 'update') {        
        conversation.find({ query: { 'id':this.myId, skippop:true } })
          .then ((response) => {
            var json = response.data[0]
            // alert('NF-1', JSON.stringify(json))
            json.label = this.label
            json.details = this.details
            json.url = this.url
            console.info('NVU-1', json)
            conversation.update(json.id, json)
              .then((response) => {
                console.info('NVU-2', response)
                router.push({name: 'questview', params: { 'id':json.id }})
              })
          })
      } else {
        var json = {}
        json.id = uuidv4()
        json.label = this.label
        json.details = this.details
        json.url = this.url
        json.creator = this.user._id
        json.handle = this.user.handle
        json.date = new Date()
        json.type = typ
        if (typ === 'question') {
          json.img = 'statics/images/ibis/issue.png'
          json.imgsm = 'statics/images/ibis/issue_sm.png'
        } else if (typ === 'answer') {
          json.img = 'statics/images/ibis/position.png'
          json.imgsm = 'statics/images/ibis/position_sm.png'
        } else if (typ === 'pro') {
          json.img = 'statics/images/ibis/plus.png'
          json.imgsm = 'statics/images/ibis/plus_sm.png'
        } else if (typ === 'con') {
          json.img = 'statics/images/ibis/minus.png'
          json.imgsm = 'statics/images/ibis/minus_sm.png'
        }
        json.parentId = this.$data.parentId
        
        const idx = this.$data.parentId
        conversation.find({ query: { 'id':this.parentId, skippop:true } })
          .then((response) => {
            var x = response.data[0]
            this.$data.parentLabel = x.label
            json.parentLabel = this.$data.parentLabel
            conversation.create(json).then((response) => {
          // alert(JSON.stringify(response))
              const id= response.id;
          // alert(idx+' '+id)
              // alert(JSON.stringify(x))
              var kids = []
              if (typ === 'question') {
                kids = x.questions
              } else if (typ === 'answer') {
                kids = x.answers
              } else if (typ === 'pro') {
                kids = x.pros
              } else if (typ === 'con') {
                kids = x.cons
              }
              if (!kids) {
                kids = []
              }
              kids.push(json.id)
              if (typ === 'question') {
                x.questions = kids
              } else if (typ === 'answer') {
                x.answers = kids
              } else if (typ === 'pro') {
                x.pros = kids
              } else if (typ === 'con') {
                x.cons = kids
              }
              // alert(JSON.stringify(x))
              conversation.update(idx, x)
                .then((response) => {
                  router.push({name: 'questview', params: { 'id':id }})
                })
            })
          // alert(JSON.stringify(response))
        })
      }
    }
  },
  mounted () {
    // NOTE: Dual Use
    // IF type === "update", we are editing the node
    //   Must fetch it
    // Otherwise, this is a node-creation event
    router = this.$router
    this.$store.commit('questView', false)
    this.$data.type = this.$route.params.type
    if (this.$data.type === 'update') {
      // called by the route 'nodeupdate'
      this.$data.isUpdate = true
      // myId is this node's identity; it's being updated
      this.$data.myId = this.$route.params.id
      this.doUpdate()
    } else {
      // called by the route 'nodeedit'
      this.$data.parentId = this.$route.params.id
      this.$data.parentType = this.$route.params.parentType
    }
  }
}
</script>

<style>
</style>
