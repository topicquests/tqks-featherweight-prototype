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
import { required } from 'vuelidate/lib/validators'
import api from 'src/api'
const uuidv4 = require('uuid/v4')
const conversation = api.service('conversation')
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
      isUpdate: false,
      myId: '',
      myNode: null
    }
  },
  methods: {
    async doSubmit () {
      var json = {}
      json.id = uuidv4()
      json.label = this.label
      json.details = this.details
      json.url = this.url
      json.creator = this.user._id
      json.handle = this.user.handle
      json.date = new Date()
      json.type = 'bookmark'
      json.img = 'statics/images/bookmark.png'
      json.imgsm = 'statics/images/bookmark_sm.png'
      conversation.create(json).then((response) => {
        this.$router.push({name: 'questview', params: { 'id':json.id }})
      })

    }
  },
  mounted () {
    this.$store.commit('questView', false)
    let url = this.$route.query.url
    this.$data.url = url
    this.$data.label = this.$route.query.title
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push('/signin');
    }
  }
}

</script>
<style>
</style>