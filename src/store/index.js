import Vue from 'vue'
import Vuex from 'vuex'

// we first import the module
import quests from './quests'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // then we reference it
    quests
  }
})
export default store
