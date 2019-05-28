<template>
  <q-layout v-if="cms">
    <q-layout-header>
      <q-toolbar color="primary" :glossy="false" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen">
          <q-icon name="menu"/>
        </q-btn>

        <q-toolbar-title>{{cms.site.title}}</q-toolbar-title>

        <q-search style="background-color: white;" v-model="search" v-on:keyup.13="doSearch"/>

        <q-btn v-if="!authenticated" flat @click="goTo('signin')">Sign In</q-btn>
        <q-btn v-if="!authenticated" flat @click="goTo('register')">Register</q-btn>
        <q-btn flat round @click="goTo('home')" v-show="authenticated">
          <q-icon name="home"/>
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 20]">Home</q-tooltip>
        </q-btn>
        <q-btn flat round @click="goTo('chat')" v-show="authenticated">
          <q-icon name="chat"/>
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 20]">Chat</q-tooltip>
        </q-btn>
        <q-btn flat round @click="signout" v-show="authenticated">
          <q-icon name="exit_to_app"/>
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 20]">Signout</q-tooltip>
        </q-btn>
        <q-btn v-if="isQuestView" flat dense round aria-label="Tree View" @click="toggleNav">
          <q-icon name="menu"/>
        </q-btn>
      </q-toolbar>
    </q-layout-header>
    <!--<q-layout-drawer side = "right"
      v-model="rightDrawerOpen"
      overlay
      no-hide-on-route-change
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <h6 @click="rightDrawerOpen = false">Tree View</h6>
      <div>
        <q-tree v-if="simple"
          :nodes="simple"
          node-key="id"
          default-expand-all
          :selected.sync="selected"
        />
        </div>
    </q-layout-drawer>-->
    <div id="mySidenav" class="sidenav">
      <div>
        <q-tree
          v-if="simple"
          :nodes="simple"
          node-key="nodeId"
          default-expand-all
          :selected.sync="selected"
        />
      </div>
    </div>

    <q-layout-drawer
      side="left"
      v-model="leftDrawerOpen"
      no-hide-on-route-change
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list no-border link inset-delimiter>
        <q-item to="/home">
          <q-item-side icon="home"/>
          <q-item-main label="Home"/>
        </q-item>

        <q-item v-if="isAuthenticated" :to="{ name: 'profile', params: { id:  userId }}">
          <q-item-side icon="settings"/>
          <q-item-main label="Profile"/>
        </q-item>

        <!-- <q-item to="/calendar">
          <q-item-side icon="calendar_today" />
          <q-item-main label="Calendar" />
        </q-item>-->

        <q-item v-if="isAuthenticated" to="/history">
          <q-item-side icon="history"/>
          <q-item-main label="Recent Changes"/>
        </q-item>

        <q-item v-if="isAuthenticated" to="/bookmarks">
          <q-item-side icon="bookmark"/>
          <q-item-main label="Bookmarks"/>
        </q-item>

        <q-item v-if="isAuthenticated" :to="quests">
          <q-item-side icon="explore"/>
          <q-item-main label="Quests"/>
        </q-item>

        <q-item v-if="isAuthenticated" to="/topics">
          <q-item-side icon="info"/>
          <q-item-main label="Topics"/>
        </q-item>

        <q-item v-if="isAuthenticated" to="/tags">
          <q-item-side icon="check_box"/>
          <q-item-main label="Tags"/>
        </q-item>

        <q-collapsible icon="help" label="Help">
          <q-item to="/aboutb">
            <q-item-side icon="help"/>
            <q-item-main label="Bookmarks Help"/>
          </q-item>
          <q-item to="/aboutc">
            <q-item-side icon="help"/>
            <q-item-main label="Quests Help"/>
          </q-item>
          <q-item to="/aboutcons">
            <q-item-side icon="help"/>
            <q-item-main label="Connections Help"/>
          </q-item>

          <q-item to="/aboutt">
            <q-item-side icon="help"/>
            <q-item-main label="Tags Help"/>
          </q-item>
        </q-collapsible>

        <!--    <q-item to="/ether">
          <q-item-side icon="language" />
          <q-item-main label="Etherpad Home" />
        </q-item>
        -->
        <q-item v-if="isAdmin" to="/admin">
          <q-item-side icon="settings"/>
          <q-item-main label="Admin"/>
        </q-item>

        <q-item v-if="isAuthenticated" to="/chat">
          <q-item-side icon="chat"/>
          <q-item-main label="Chat"/>
        </q-item>

        <q-collapsible icon="info" label="About">
          <p style="padding: 25px;" class="text-grey-7">
            This is a prototype
            <i>Structured Conversation</i> system.
          </p>
        </q-collapsible>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view :user="user"></router-view>
    </q-page-container>
    <q-layout-footer class="footer">
      <a href="http://www.topicquests.org/">
        <img src="statics/images/TopicQuestsLogo_sm.png">
      </a>
      <a href="https://creativecommons.org/licenses/by-nc/4.0/">
        <img src="statics/images/cc-by-nc.png" style="height: 46px;">
      </a>
      <a href="https://github.com/KnowledgeGarden/tqks-featherweight-prototype">
        <img src="statics/images/github-1.jpg">
      </a>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import auth from "src/auth";
import config from "../../config";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "index",
  components: {},
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      rightDrawerOpen: this.$store.getters.isQuestView,
      isAuthenticated: false,
      userId: null,
      isAdmin: false,
      selected: null,
      search: ""
    };
  },
  watch: {
    selected: function(val, oldVal) {
      this.$router.push({ name: "questview", params: { id: val } });
    }
  },
  computed: {
    authenticated() {
      let usx = this.$store.getters.user;
      let a = usx !== null;
      console.info("DA", a);
      console.info("DB", this.$store.getters.user);
      if (usx) {
        this.userId = usx._id;
      }
      return a;
    },
    user() {
      return this.$store.getters.user;
    },
    isQuestView() {
      if (
        this.$store.getters.isQuestView == false &&
        document.getElementById("mySidenav") != null
      ) {
        document.getElementById("mySidenav").style.width = "0";
      }
      return this.$store.getters.isQuestView;
    },
    simple() {
      const tre = this.$store.getters.treeView;
      return tre;
    },
    ...mapGetters("configuration", { currentConfig: "getCopy" }),
    stillLoading() {
      return !(this.currentConfig && this.currentConfig.cms);
    },
    cms() {
      if (this.stillLoading) return null;
      // Get the slug from current route and search for it in the config JSON
      return this.currentConfig.cms;
    }
  },
  methods: {
    ...mapActions("configuration", {
      fetchCurrentConfiguration: "get"
    }),
    toggleNav() {
      if (this.rightDrawerOpen) {
        this.closeNav();
      } else {
        this.rightDrawerOpen = true;
        document.getElementById("mySidenav").style.width = "450px";
      }
    },
    closeNav() {
      this.rightDrawerOpen = false;
      document.getElementById("mySidenav").style.width = "0";
    },

    doSearch() {
      let q = this.search;
      this.$router.push({ name: "search", params: { q } });
    },
    goTo(route) {
      this.$router.push({ name: route });
    },
    signout() {
      auth
        .signout()
        .then(() => {
          this.$store.commit("usr", null);
          this.$store.commit("authenticate", false);
          this.$store.commit("admin", false);
          localStorage.removeItem("tqks-auth");
          this.$q.notify({
            type: "positive",
            message: "You are now logged out, sign in again to continue to work"
          });
        })
        .catch(err => {
          this.$q.notify({
            type: "positive",
            message: "Cannot logout, please check again in a few minutes"
          });
        });
    },
    setUser(user) {
      this.$store.commit("usr", user);
    },
    checkAdmin() {
      let usx = this.$store.getters.user;
      // alert(JSON.stringify(usx))
      if (usx) {
        var email = usx.email;
        var admin = config.adminEmail;
        var isAuth = this.$store.getters.isAuthenticated;
        var truth = email === admin && isAuth;
        this.$store.commit("admin", truth);
        this.isAdmin = truth;
      }
    }
  },
  mounted() {
    this.fetchCurrentConfiguration(1).then(data => {
      console.log("Got config", data);
    });

    console.info("MountingDefault", this.$store.getters.user);

    // Check if there is already a session running
    auth
      .authenticate()
      .then(user => {
        this.setUser(user);
        this.$q.notify({
          type: "positive",
          message: "Restoring previous session"
        });
        this.$store.commit("authenticate", true);
        this.$store.commit("admin", false);
        this.isAuthenticated = true;
        this.checkAdmin();
      })
      .catch(_ => {
        // alert('NotAuth')
        this.setUser(null);
        this.$store.commit("authenticate", false);
        this.$store.commit("admin", false);
        this.$data.isAuthenticated = false;
        this.$data.isAdmin = false;
        // this.$router.push({ name: 'home' })
      });

    // On successful login
    auth.onAuthenticated(user => {
      this.setUser(user);
      this.$store.commit("authenticate", true);
      this.$data.isAuthenticated = true;
      this.checkAdmin();
      // this.$router.push({ name: 'home' })
    });

    // On logout
    auth.onLogout(() => {
      // alert('Logout')
      this.setUser(null);
      this.$store.commit("authenticate", false);
      this.$router.push({ name: "home" });
      this.$data.isAuthenticated = false;
      this.$data.isAdmin = false;
    });
  }
};
</script>

<style>
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: rgb(218, 212, 212);
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}
img.q-tree-img.q-mr-sm {
  height: 20px;
}
.footer {
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}
</style>
