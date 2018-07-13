<template>
    <q-page :padding="true">
        <h6>Quest Edit Form</h6>
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
const conversation = api.service('conversation')
var router

export default {
  data () {
    return {
      label: '',
      details: '',
      user: this.$store.getters.user
    }
  },
  methods: {
    doSubmit: function () {
      // alert(this.label);
      // alert(this.details);
      var json = {}
      json.id = uuidv4()
      json.type = 'quest'
      json.label = this.label
      json.details = this.details
      json.img = 'statics/images/ibis/map.png'
      json.imgsm = 'statics/images/ibis/map_sm.png'
      json.creator = this.user._id
      json.handle = this.user.handle
      json.date = new Date()
      json.type = 'map'
      console.info('QF-1', this.user)
      console.info('QF-2', json)
      // TODO add creatorId, date
      // alert(JSON.stringify(json))
      conversation.create(json).then((response) => {
        // alert(JSON.stringify(response))
        router.push('/quests')
      })
    }
  },
  mounted () {
    router = this.$router
  }
}
</script>

<style>
</style>
