<template>
  <q-page class="flex flex-left">
    <h4><img style="margin-right:4px;" src="statics/images/etherpad.png">Etherpad Home</h4>
    <div>
      <q-btn style="margin-bottom: 4px;" label="New Pad" @click="newPad" />
    </div>
  </q-page>
</template>

<script>
// @see https://github.com/tomassedovic/etherpad-lite-client-js
const api = require('etherpad-lite-client')
var etherpad
export default {
  data () {
    return {
    }
  },
  methods: {
    newPad () {
      var args = {
        groupID: 'g.123',
        padName: 'testpad',
        text: 'Hello world!',
      }
      etherpad.createGroupPad(args, function(error, data) {
        if(error) {
          console.error('Error creating pad: ' + error.message)
        } else {
          console.log('New pad created: ' + data.padID)
        }
      })
    }
  },
  mounted () {
    this.$store.commit('questView', false)
    etherpad = api.connect({
        apikey: '7c4ba5773d6ecc8cf7c7b92f50e89bb65c724d4f5825dbf5584b5dfa9d81a3ea',
        host: 'localhost',
        port: 8080,
        rootPath : '/etherpad/api/1.2.12/'
    })
    console.info('EP', etherpad)
  }
}
</script>

<style>
</style>

