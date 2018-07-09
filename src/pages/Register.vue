<template>
  <q-page class="flex flex-center">
    <q-dialog v-model="showDialog" :title="title" @ok="onOk" @hide="onHide" >
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

        <div class="row">
          <q-input
            v-model="password" type="password" name="email" stack-label="Password" class="full-width"
          />
        </div>
      </div>
    </q-dialog>
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
            console.err('CanEditError', err)
          })
      }
    },
    onOk (data) {
      console.info('Register-1', this.email)
      const self = this
      this.canRegister(self.email, function (truth) {
        console.info('Register-2', this.truth)
        if (truth) {
          self.register(self.email, self.password, self.fullName, self.handle)
            .then(() => {
              console.info('Register-3', self.email)
              return self.login(self.email, self.password)
            })
            .then(_ => {
              self.$q.notify({type: 'positive', message: 'You are now registered'})
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
    register (email, password, fullName, handle) {
      return auth.register(email, password, fullName, handle)
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
