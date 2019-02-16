<template>
  <q-page class="flex flex-left">
    <h4><img style="margin-right:4px;" src="statics/images/etherpad.png">Etherpad Home</h4>
    <!-- <div>
      <q-btn style="margin-bottom: 4px;" label="New Pad" @click="newPad" />
    </div> -->
  </q-page>
</template>

<script>
// @see https://github.com/ether/etherpad-lite-jquery-plugin/blob/master/js/etherpad.js
// @see https://github.com/tomassedovic/etherpad-lite-client-js
// @see https://github.com/ether/etherpad-lite/wiki/HTTP-API
// Pads belong to a group. To spawn a new pad, first create a group
// Then create one or more authors
// Then create a groupPad
// Then start a session with a group and author
const api = require('etherpad-lite-client')
var etherpad
export default {
  data () {
    return {
    }
  },
  methods: {
    newAuthor (id, handle) {
      //TODO note that ID in the example is a simple integer
      var args = {
        apikey: '7c4ba5773d6ecc8cf7c7b92f50e89bb65c724d4f5825dbf5584b5dfa9d81a3ea',
        name: handle,
        authorMapper: id
      }
      etherpad.createAuthorIfNotExistsFor(args, function (err, response) {
        // Returns authorID to be used elsewhere
      })
    },
    newGroup (id) {
      //TODO note that ID in the example is a simple integer
      var args = {
        apikey: '7c4ba5773d6ecc8cf7c7b92f50e89bb65c724d4f5825dbf5584b5dfa9d81a3ea',
        groupMapper: id
      }
      etherpad.createGroupIfNotExistsFor(args, function (err, response) {
        // Returns groupID to be used elsewhere
      })
    },
    newGroupPad (groupId, padName, text) {
      // groupId established in createGroup
      // padName -- whatever
      // text -- optional, but not null - could be a title to be edited later
      var args = {
        apikey: '7c4ba5773d6ecc8cf7c7b92f50e89bb65c724d4f5825dbf5584b5dfa9d81a3ea',
        groupId: groupId,
        padName: padName,
        text: text
      }
      etherpad.createGroupPad(args, function (err, response) {
        // Returns padID to be used in an index
      })
    },
    createSession (groupId, authorId, validUntil) {
        var args = {
        apikey: '7c4ba5773d6ecc8cf7c7b92f50e89bb65c724d4f5825dbf5584b5dfa9d81a3ea',
        groupId: groupId,
        authorId: authorId,
        validUntil: validUntil
      }
      etherpad.createSession(args, function (err, response) {
        // Returns sessionID to be used in an index
        //Portal places the cookie "sessionID" with the given value on the client and creates an iframe including the pad
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

