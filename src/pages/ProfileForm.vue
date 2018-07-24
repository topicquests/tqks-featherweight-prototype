<template>
  <q-page :padding="true">
    <h6>Profile Edit Form</h6>
    
    <div>
      <b>Email</b><br/>
      <q-input v-model="myEmail" type="email"/><br/>
    </div>
    <div>
      <b>Full Name</b><br/>
      <q-input v-model="myName" /><br/>
    </div>

    <div>
      <b>Homepage URL</b> (Optional)<br/>
      <q-input  v-model="myUrl" /><br/>
    </div>

    <div>
      <b>Password</b><br/>
      <q-input  v-model="myPassword" type="password"/>
    </div>

    <div>
      <q-btn label="Submit" @click="doSubmit" /><q-btn label="Cancel" @click="$router.replace('/home')" />
    </div>
    
  </q-page>
</template>
<script>
import api from 'src/api'
const users = api.service('users')

export default {
  data () {
    return {
      myId: '',
      myEmail: '',
      myName: '',
      myUrl: '',
      myPassword: '',
      thisUser: null
    }
  },
  methods: {
    doSubmit () {
      var usr = this.thisUser
      var data = {}
      //usr.email = this.myEmail
      if (usr.homepage !== this.myUrl) {
        data.homepage = this.myUrl
      }
      if (usr.email !== this.myEmai) {
        data.email = this.myEmail
      }
      if (usr.fullname !== this.myName) {
        data.fullname = this.myName
      }
      if (this.myPassword !== '') {
        data.password = this.myPassword
      }
      users.patch(usr._id, data)
          .then ((response) => {
            this.$router.push('/home')
      })
    }
  },
  mounted () {
    this.$store.commit('questView', false)
    this.myId = this.$route.params.id
    users.get(this.myId)
      .then((user) => {
        this.thisUser = user
        this.myEmail = user.email
        this.myName = user.fullname
        this.myUrl = user.homepage // likely doesn't exist
      })
  }
}
</script>
<style>
</style>
