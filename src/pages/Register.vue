<template>
  <q-page :padding="true" class="flex flex-center">
    <div class="panel-body">
      <h6>Register</h6>
      <div slot="body">
        <div class="row q-mb-md">
          <q-input
            v-model="email" type="email" name="email" stack-label="E-mail" class="full-width" autofocus
          />
        </div>
        <div class="row q-mb-md">
          <q-input
            v-model="fullName" type="text" name="fname" stack-label="Full Name" class="full-width" autofocus
          />
        </div>
        <div class="row q-mb-md">
          <q-input
            v-model="handle" type="text" name="handle" stack-label="Handle" class="full-width" autofocus
          />
        </div>
        <div class="row q-mb-md">
          <q-input
            v-model="homepage" type="text" name="homepage" stack-label="Homepage" class="full-width" autofocus
          />
        </div>

        <div class="row q-mb-md">
          <q-input
            v-model="password" type="password" name="email" stack-label="Password" class="full-width"
          />
        </div>
      </div>
      <div>
      <q-btn label="Register" @click="doRegister" /><q-btn label="Cancel" @click="$router.replace('/home')" />
    </div>

    </div>
  </q-page>
</template>

<script>

import auth from 'src/auth'
import config from '../../config'
import api from 'src/api'
const invites = api.service('invitations')

export default {
  data () {
    return { 
      showDialog: true,
        email: null,
        handle: null,
        homepage: null,
        fullName: null,
        password: null,
      title: 'Register'
    }
  },
      
  computed: {
  },
  methods: {
    goHome () {
      this.$router.push({ name: 'home' })
    },
    onHide () {
      // Workaround needed because of timing issues (sequencing of 'hide' and 'ok' events) ...
      setTimeout(() => {
        this.goHome()
      }, 50)
    },
    canRegister (email, callback) {
      var result = true
      if (!config.requiresInvite) {
        return callback(result)
      } else {
        var json = {}
        var x = {}
        x.email = email
        json.query = x
        invites.find(json)
          .then((response) => {
            // alert(JSON.stringify(response))
            if (response.total === 0) {
              result = false
            }
            // alert(result)
            return callback(result)
          })
          .catch ((err) => {
            console.log('CanRegisterError', err)
          })
      }
    },
    doRegister () {
      console.info('Register-1', this.$data.email)
      const theEmail = this.$data.email
      const theHandle = this.$data.handle
      const theFullName = this.$data.fullName
      if (!theEmail) {
        this.$q.notify({type: 'negative', message: 'Missing Email'})
        return 
      }
      if (!theHandle) {
        this.$q.notify({type: 'negative', message: 'Missing Handle'})
        return      
      }
      if (!theFullName) {
        this.$q.notify({type: 'negative', message: 'Missing FullName'})
        return
      }
      if (!this.$data.password) {
        this.$q.notify({type: 'negative', message: 'Missing Password'})
        return
      }

      const self = this
      this.canRegister(theEmail, function (truth) {
        console.info('Register-2', truth)
        if (truth) {
          self.register(theEmail, self.$data.password, theFullName, theHandle, self.$data.homepage)
            .then(() => {
              console.info('Register-3', self.email)
              return self.login(self.email, self.password)
            })
            .then(_ => {
              self.$q.notify({type: 'positive', message: 'You are now registered'})
              self.goHome()
            })
            .catch(_ => {
              // alert('wtf')
              self.$q.notify({type: 'positive', message: 'Cannot register, please check your e-mail or password'})
              self.goHome()
            })
        } else {
          // alert('bad')
          self.$q.notify({type: 'negative', message: 'Cannot register, email not found on invitations list'})
          self.goHome()
        }
      })
    },
    register (email, password, fullName, handle, homepage) {
      return auth.register(email, password, fullName, handle, homepage)
    },
    login (email, password) {
      return auth.login(email, password)
    }
  },
  mounted () {

  },
  beforeDestroy () {
  }
}
</script>

<style lang="styl">

</style>
