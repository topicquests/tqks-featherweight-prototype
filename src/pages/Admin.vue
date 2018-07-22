<template>
    <q-page class="flex flex-left">
        <div>
            <h6>Admin</h6>
            <div class="box">
                <q-btn label="List Invitations" @click="listInvites" />
                <q-scroll-area style="width: 200px; height: 100px;">
                    <q-list v-for="inv in invites" :key="inv.email">
                        {{ inv.email }}
                    </q-list>
                </q-scroll-area>
            </div>
            <div class="box">
                <h5>Add One Email to Invitations</h5>
                <q-input  v-model="inviteEmail" />
                <q-btn label="Add Invitation" @click="addInvite" />
            </div>
            <div class="box">
                <h5>Remove One Email from Invitations</h5>
                <q-input  v-model="removeEmail" />
                <q-btn label="Remove Invitation" @click="removeInvite" />
            </div>
            <div class="box">
                <q-btn label="List Users" @click="listUsers" /><br/>
                <q-scroll-area style="width: 200px; height: 100px;">
                    <q-list v-for="inv in users" :key="inv.email">
                        {{ inv.email + " " + inv._id }}
                    </q-list>
                </q-scroll-area>
            </div>
            <div class="box">
              <h5>Display a User</h5>
              <q-input  v-model="displayEmail" />
              <q-btn label="Display User" @click="displayUser" />
            </div>
            <div class="box">
              <h5>Remove a User</h5>
              <q-input  v-model="removeUserEmail" />
              <q-btn label="Remove User" @click="removeUser" />
            </div>

        </div>
    </q-page>
</template>

<script>
import api from 'src/api'
const invites = api.service('invitations')
const users = api.service('users')

export default {
  data () {
    return {
      invites: [],
      inviteEmail: '',
      removeEmail: '',
      users: [],
      displayEmail: '',
      removeUserEmail: ''
    }
  },
  mounted () {
    this.$store.commit('questView', false)
  },
  methods: {
    listInvites () {
      // alert('List invites')
      invites.find({ query: { $limit: 100 } })
        .then((response) => { this.$data.invites = response.data })
    },

    addInvite () {
      // alert('Add invite')
      var ems = this.$data.inviteEmail.trim()
      if (ems === '') {
        return
      }
      var json = {}
      json.email = ems
      invites.create(json).then((response) => {
        this.$q.notify({type: 'positive', message: 'Invitations added'})
      }).catch((error) => {
        this.$q.notify({type: 'negative', message: 'Error ' + error})
      })
      this.$data.inviteEmail = ''
    },
    removeInvite () {
      var ems = this.$data.removeEmail.trim()
      if (ems === '') {
        return
      }
      var json = {}
      json.email = ems
      invites.find(json).then((response) => {
        invites.remove(response.data[0]._id).then((response) => {
          this.$q.notify({type: 'positive', message: 'Invitations removed'})
        }).catch((error) => {
          this.$q.notify({type: 'negative', message: 'Error-1 ' + error})
        })
      }).catch((error) => {
        this.$q.notify({type: 'negative', message: 'Error-2 ' + error})
      })
      this.$data.removeEmail = ''
    },
    listUsers () {
      users.find({ query: { $limit: 100 } })
        .then((response) => { this.$data.users = response.data })
    },
    displayUser () {
      var ems = this.$data.displayEmail.trim()
      // alert(ems)
      if (ems === '') {
        return
      }
      var json = {}
      var x = {}
      x.email = ems
      json.query = x
      users.find(json).then((response) => {
        alert(JSON.stringify(response))
        this.displayEmail = ''
      })
    },
    removeUser() {
      var ems = this.$data.removeUserEmail.trim()
      // alert(ems)
      if (ems === '') {
        return
      }
      var json = {}
      var x = {}
      x.email = ems
      json.query = x
      users.find(json).then((response) => {
        // alert(JSON.stringify(response))
        const usr = response.data[0]
        json = {}
        x._id = usr._id
        json.query = x
        users.remove(usr._id).then((foo) => {
          this.removeUserEmail = ''
        })       
      })
    }
  }

}
</script>

<style>
.box {
  border: 1px solid black;
  background: white;
  margin: 12px;
  font-family:pragmatica-web,sans-serif;
  border-radius: 3px;
}
</style>
