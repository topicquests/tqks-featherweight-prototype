import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
// import auth from 'src/auth'
import config from '../../config'
import store from '../store/index'

Vue.use(VueRouter)

const router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})


// from https://stackoverflow.com/a/45581925/439048
function getUserState () {
  return new Promise((resolve, reject) => {
    if (store.state.user === undefined) {
      const unwatch = store.watch(
        () => store.state.user,
        (value) => {
          unwatch()
          resolve(value)
        }
      )
    } else {
      resolve(store.state.user)
    }
  })
}

router.beforeEach((to, from, next) => {
  if (!config.isPrivatePortal || (to && to.name == 'signin')) {
    next()
  } else {
    getUserState().then((user)=>{
        // the above state is not available here, since it
        // it is resolved asynchronously in the store action
      if (user || localStorage.getItem('tqks-auth')) {
        next()
      } else {
        console.log('Not authenticated')
        next({ name: 'signin' })
        // next({ path: '/home' })
      }
    })
  }
})

export default router
