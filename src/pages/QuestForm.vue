<template>
    <q-page>
        <h3>Quest Edit Form</h3>
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
var router

export default {
  data () {
    return {
      label: '',
      details: ''
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
      json.img = 'statics/images/publication.png'
      json.imgsm = 'statics/images/publication_sm.png'
      // TODO add creatorId, date
      // alert(JSON.stringify(json))
      quests.create(json).then((response) => {
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
