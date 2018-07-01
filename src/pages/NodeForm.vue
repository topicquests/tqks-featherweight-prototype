<template>
    <q-page>
        <h3>Node Edit Form</h3>
        <!-- todo -->
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
const quests = api.service('quests')
const conversation = api.service('conversation')
var router

export default {
  data () {
    return {
      label: '',
      details: '',
      type: '',
      parentId: '',
      parentType: ''
    }
  },
  methods: {
    doSubmit: function () {
      alert(this.label)
      // alert(this.details);
      var typ = this.$data.type
      var json = {}
      json.id = uuidv4()
      json.label = this.label
      json.details = this.details
      if (typ === 'question') {
        json.img = 'statics/images/ibis/issue.png'
        json.imgsm = 'statics/images/ibis/issue_sm.png'
      } else if (typ === 'answer') {
        json.img = 'statics/images/ibis/position.png'
        json.imgsm = 'statics/images/ibis/position_sm.png'
      } else if (typ === 'pro') {
        json.img = 'statics/images/ibis/plus.png'
        json.imgsm = 'statics/images/ibis/plus_sm.png'
      } else if (typ === 'question') {
        json.img = 'statics/images/ibis/minus.png'
        json.imgsm = 'statics/images/ibis/minus_sm.png'
      }
      json.parentId = this.$data.parentId
      // TODO add creatorId, date
      // alert(JSON.stringify(json))
      conversation.create(json).then((response) => {
        if (this.$data.parentType === 'quest') {
          quests.find({ query: { 'id': this.$data.parentId } })
            .then((response) => {
              // console.log(response)
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
              quests.update(x._id, x)
                .then((response) => {
                  router.push('/questview/' + this.$data.parentId)
                })
            })
        } else {
          // It's a conversation node
          conversation.find({ query: { 'id': this.$data.parentId } })
            .then((response) => {
              // console.log(response)
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
              conversation.update(x._id, x)
                .then((response) => {
                  router.push('/questview/' + this.$data.parentId)
                })
            })
        }
        // alert(JSON.stringify(response))
      })
    }
  },
  mounted () {
    router = this.$router
    this.$data.type = this.$route.params.type
    this.$data.parentId = this.$route.params.id
    this.$data.parentType = this.$route.params.parentType
    alert(this.$data.type + ' ' + this.$data.parentType + ' ' + this.$data.parentId)
  }
}
</script>

<style>
</style>
