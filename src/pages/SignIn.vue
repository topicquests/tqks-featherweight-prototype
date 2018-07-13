<template>
  <q-page :padding="true" class="flex flex-center">
    <q-dialog v-model="showDialog" :title="title" @ok="onOk" @hide="onHide" >
      <div slot="body">
        <div class="row q-mb-md">
          <q-input
            v-model="email" type="email" name="email" stack-label="E-mail" class="full-width" autofocus
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

export default {
  data () {
    return {
      showDialog: true,
      email: null,
      password: null,
      title: 'SignIn'
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
    onOk (data) {
      this.login(this.email, this.password)
        .then(_ => {
          this.$q.notify({type: 'positive', message: 'You are now logged in'})
        })
        .catch(_ => {
          this.$q.notify({type: 'positive', message: 'Cannot sign in, please check your e-mail or password'})
          this.goHome()
        })
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
