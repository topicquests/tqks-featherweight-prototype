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
        <q-editor v-model="details"
        :toolbar="[
          ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
          ['token', 'hr', 'link', 'custom_btn'],
          ['fullscreen'],
          [
            {
              label: $q.i18n.editor.formatting,
              icon: $q.icon.editor.formatting,
              list: 'no-icons',
              options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
            },
            {
              label: $q.i18n.editor.fontSize,
              icon: $q.icon.editor.fontSize,
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
            },
            {
              label: $q.i18n.editor.defaultFont,
              icon: $q.icon.editor.font,
              fixedIcon: true,
              list: 'no-icons',
              options: ['default_font', 'arial', 'arial_black', 'comic_sans', 'courier_new', 'impact', 'lucida_grande', 'times_new_roman', 'verdana']
            },
            'removeFormat'
          ],
          ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
          [
            {
              label: $q.i18n.editor.align,
              icon: $q.icon.editor.align,
              fixedLabel: true,
              list: 'only-icons',
              options: ['left', 'center', 'right', 'justify']
            }
          ],
          ['undo', 'redo']
          ]"
          :fonts="{
            arial: 'Arial',
            arial_black: 'Arial Black',
            comic_sans: 'Comic Sans MS',
            courier_new: 'Courier New',
            impact: 'Impact',
            lucida_grande: 'Lucida Grande',
            times_new_roman: 'Times New Roman',
            verdana: 'Verdana'
          }"
        />
      </div>
      <div>
        <q-btn label="Submit" @click="doSubmit" /><q-btn label="Cancel" @click="$router.replace('/home')" />
      </div>
  </q-page>
</template>

<script>
import api from 'src/api'
const uuidv4 = require('uuid/v4')
const conversation = api.service('conversation')
var router

export default {
  data () {
    return {
      label: '',
      details: '',
      url: '',
      id: '',
      type: '',
      user: this.$store.getters.user
    }
  },
  methods: {
    doSubmit: function () {
      // alert(this.label);
      // alert(this.details);
      var mytype = this.type
      console.log('TopicEditDid',mytype)
      var json = {}
      json.id = uuidv4()
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
        var kid
        if (mytype === 'subclass') {
          //subclass we are only allowing single inheritance for now
          json.subOf = this.$data.id
        } else {
          json.instanceOf = this.$data.id
        }
      }
      console.info('QFT-1', this.user)
      console.info('QFT-2', json)
      // use the conversation node database
      conversation.create(json).then((response) => {
        // alert(JSON.stringify(response))
        if (mytype) {
          //add child to parent
          conversation.find({ query: { 'id':this.id, skippop:true } })
            .then ((response) => {
              var parent = response.data[0]
              var kids
              if (this.type === 'subclass') {
                kids = parent.subclasses
                if (!kids) {
                  kids = []
                }
                kids.push(json.id)
                parent.subclasses = kids
              } else {
                //default instance
                kids = parent.instances
                if (!kids) {
                  kids = []
                }
                kids.push(json.id)
                parent.instances = kids
              }
              conversation.update(parent.id, parent)
                .then((response) => {
                  console.info('NVU-2', response)
                  router.push({name: 'topicview', params: { 'id':parent.id }})
                })
          })
        } else {
          router.push('/topics')
        }
      })
    }
  },
  mounted () {
    //either subclass or instance
    this.$data.type = this.$route.params.type
    //if this is a subclass or instance, id is parent topic
    this.$data.id = this.$route.params.id
    console.log('TopicEdit',this.$data.type,this.$data.id)
    router = this.$router
    this.$store.commit('questView', false)
  }
}
</script>

<style>
</style>
