<template>
    <q-page>
        <h3>Node Edit Form</h3>
        <div>
            <h5>URL (Optional)</h5>
            <q-input  v-model="url" />
        </div>
        <div>
            <h5>Subject</h5>
            <q-input  v-model="label" />
        </div>
        <div>
            <h5>Details</h5>
            <q-editor v-model="details" />
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
  props: [ 'user' ],
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
    doUpdate () {
      conversation.get(this.myId)
        .then ((response ) => {
          this.myNode = response
          this.label = response.label
          this.details = response.details
          this.url = response.url
        })
    },
    doSubmit: function () {
      // alert(this.label)
      // alert(this.details);
      var typ = this.$data.type
      if (typ === 'update') {
         conversation.find({ query: { 'id':this.myId } })
          .then ((response) => {
            var json = response.data[0]
            console.info('NF-1', json)
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
        json.parentLabel = this.$data.parentLabel
        const idx = this.$data.parentId
        conversation.create(json).then((response) => {
          // alert(JSON.stringify(response))
          const id= response.id;
          // alert(idx+' '+id)
          conversation.find({ query: { 'id': idx } })
            .then((response) => {
              var x = response.data[0]
              var kids = []
              if (typ === 'question') {
                kids = x.questions
              } else if (typ === 'answer') {
                kids = x.answers
              } else if (typ === 'pro') {
                kids = x.pros
              } else if (typ === 'question') {
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
              } else if (typ === 'question') {
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
    this.$data.type = this.$route.params.type
    if (this.$data.type === 'update') {
      this.$data.isUpdate = true
      this.$data.myId = this.$route.params.id
      this.doUpdate()
    } else {
      this.$data.parentId = this.$route.params.id
      this.$data.parentType = this.$route.params.parentType
      this.$data.parentLabel = this.$route.params.label
    }
  }
}
</script>

<style>
</style>
