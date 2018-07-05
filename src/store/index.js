import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'


// we first import the module
import quests from './quests'

// Initialize Feathers Vuex
import feathersClient from '../api';
const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' })

Vue.use(Vuex)
Vue.use(FeathersVuex)

const store = new Vuex.Store({
  state: {
    isAuthenticated: true
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated
  },
  modules: {
    // then we reference it
    quests
  },
  plugins: [
    service("quests", { idField: 'id'})
  ]
})
export default store
