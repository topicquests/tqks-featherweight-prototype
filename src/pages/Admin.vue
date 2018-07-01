<template>
    <q-page class="flex flex-left">
        <div>
            <h2>Admin</h2>
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
        </div>
    </q-page>
</template>

<script>
import api from 'src/api'
const invites = api.service('invitations')

export default {
  data () {
    return {
      invites: ['None'],
      inviteEmail: '',
      removeEmail: ''
    }
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
