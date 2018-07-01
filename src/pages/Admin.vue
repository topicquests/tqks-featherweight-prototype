<template>
    <q-page class="flex flex-left">
        <div>
            <h2>Admin</h2>
            <q-btn label="List Invitations" @click="listInvites" />
            <q-scroll-area style="width: 200px; height: 100px;">
                <q-list v-for="inv in invites" :key="inv.email">
                    {{ inv.email }}
                </q-list>
            </q-scroll-area>
            <h5>Add One Email to Invitations</h5>
            <q-input  v-model="inviteEmail" />
            <q-btn label="Add Invitation" @click="addInvite" />
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
      inviteEmail: '' // possibly a space-delimited collection
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
    }

  }
}
</script>

<style>
</style>
