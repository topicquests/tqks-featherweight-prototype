<template>
  <q-layout>
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="false"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"

        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          FeatherWeight Prototype
        </q-toolbar-title>

        <q-btn v-if="!authenticated" flat @click="goTo('signin')">
          Sign In
        </q-btn>
        <q-btn v-if="!authenticated" flat @click="goTo('register')">
          Register
        </q-btn>
        <q-btn flat round @click="goTo('home')" v-show="authenticated">
          <q-icon name="home" />
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 20]">Home</q-tooltip>
        </q-btn>
        <q-btn flat round @click="goTo('chat')" v-show="authenticated">
          <q-icon name="chat" />
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 20]">Chat</q-tooltip>
        </q-btn>
        <q-btn flat round @click="signout" v-show="authenticated">
          <q-icon name="exit_to_app" />
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 20]">Signout</q-tooltip>
        </q-btn>

      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"

      no-hide-on-route-change
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">

      <q-list
        no-border
        link
        inset-delimiter
      >

        <q-item to="/home">
          <q-item-side icon="home" />
          <q-item-main label="Home" />
        </q-item>

        <q-item to="/history">
          <q-item-side icon="history" />
          <q-item-main label="History" />
        </q-item>

        <q-item to="/quests">
          <q-item-side icon="explore" />
          <q-item-main label="Quests" />
        </q-item>

        <q-item to="/ether">
          <q-item-side icon="language" />
          <q-item-main label="Etherpad Home" />
        </q-item>

        <q-item v-if="isAdmin" to="/admin">
          <q-item-side icon="settings" />
          <q-item-main label="Admin" />
        </q-item>

        <q-item v-if="isAuthenticated" to="/chat">
          <q-item-side icon="chat" />
          <q-item-main label="Chat" />
        </q-item>

        <q-collapsible icon="info" label="About">
          <p style="padding: 25px;" class="text-grey-7">
            This is a prototype <i>Structured Conversation</i> system.
          </p>
        </q-collapsible>

      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view :user="user"></router-view>
    </q-page-container>
    <q-layout-footer>
        <a style="float: left;"    href="http://www.topicquests.org/"><img src="assets/TopicQuestsLogo_sm.png"></a>
        <a style="float: right;" href="https://github.com/KnowledgeGarden/tqks-featherweight-prototype"><img src="assets/github-1.jpg"></a>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import auth from 'src/auth'
import config from '../../config'
export default {
  name: 'index',
  components: {
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      isAuthenticated: false,
      isAdmin: false
    }
  },
  computed: {
    authenticated () {
      let a = this.$store.getters.user !== null
      console.info('DA', a)
      console.info('DB', this.$store.getters.user)
      return a
    },
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    goTo (route) {
      this.$router.push({ name: route })
    },
    signout () {
      auth.signout()
        .then(() => {
          this.$store.commit('usr', null)
          this.$store.commit('authenticate', false)
          this.$store.commit('admin', false)
          this.$q.notify({type: 'positive', message: 'You are now logged out, sign in again to continue to work'})
        })
        .catch((err) => {
          this.$q.notify({type: 'positive', message: 'Cannot logout, please check again in a few minutes'})
        })
    },
    setUser (user) {
      this.$store.commit('usr', user)
    },
    checkAdmin () {
      let usx = this.$store.getters.user
      // alert(JSON.stringify(usx))
      if (usx) {
        var email = usx.email
        var admin = config.adminEmail
        var isAuth = this.$store.getters.isAuthenticated
        var truth = (email === admin && isAuth)
        this.$store.commit('admin', truth)
        this.isAdmin = truth
      }
    }
    
  },
  mounted () {
    console.info('MountingDefault', this.$store.getters.user)
    // Check if there is already a session running
    auth.authenticate()
      .then((user) => {
        this.setUser(user)
        this.$q.notify({type: 'positive', message: 'Restoring previous session'})
        this.$store.commit('authenticate', true)
        this.$store.commit('admin', false)
        this.isAuthenticated = true
        this.checkAdmin()
      })
      .catch(_ => {
        // alert('NotAuth')
        this.setUser(null)
        this.$store.commit('authenticate', false)
        this.$store.commit('admin', false)
        this.$data.isAuthenticated = false
        this.$data.isAdmin = false
        this.$router.push({ name: 'home' })
        
      })

    // On successful login
    auth.onAuthenticated((user) => {
      this.setUser(user)
      this.$store.commit('authenticate', true)
      this.$data.isAuthenticated = true
      this.checkAdmin()
      // this.$router.push({ name: 'home' })
    })

    // On logout
    auth.onLogout(() => {
      // alert('Logout')
      this.setUser(null)
      this.$store.commit('authenticate', false)
      this.$router.push({ name: 'home' })
      this.$data.isAuthenticated = false
      this.$data.isAdmin = false
    })
  },
  beforeDestroy () {
  }
}
</script>

<style>
</style>
