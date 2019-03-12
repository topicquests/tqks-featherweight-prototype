import Vue from "vue";
import Vuex from "vuex";
import feathersVuex from "feathers-vuex";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

// we first import the module
// import quests from './quests'

// Initialize Feathers Vuex
import feathersClient from "../api";
const { service, auth, FeathersVuex } = feathersVuex(feathersClient, {
  idField: "_id"
});

Vue.use(Vuex);
Vue.use(FeathersVuex);

const store = new Vuex.Store({
  state: {
    isAuthenticated: true,
    canEdit: true,
    isAdmin: true,
    user: null,
    treeView: null,
    isQuestView: false,

    serverPagination: {},
    serverData: []
  },

  actions: {
    verifyToken(context, payload) {
      console.info("Verifying token", { payload });
      return feathersClient.service("authManagement").create(payload);
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    canEdit: state => state.canEdit,
    isAdmin: state => state.isAdmin,
    node: state => state.conversation.copy,
    user: state => state.user,
    treeView: state => state.treeView,
    isQuestView: state => state.isQuestView
  },
  mutations: {
    admin(state, t) {
      console.info("CommitAdmin", t);
      state.isAdmin = t;
    },
    authenticate(state, t) {
      state.isAuthenticated = t;
    },
    usr(state, user) {
      console.info("CommitUser", user);
      state.user = user;
    },
    /**
     * @method tree
     * @description saves the tree from the QuestView page and stores it to the state     *
     * @param {*} state
     * @param {*} tree
     */
    tree(state, tree) {
      state.treeView = tree;
    },
    questView(state, t) {
      state.isQuestView = t;
    }
  },
  modules: {
    // then we reference it
    //quests
  },
  plugins: [service("conversation"), 
    service("tags"), 
    service("authManagement"), 
    service("configuration", {
      idField: 'id'
    })]
});
export default store;
