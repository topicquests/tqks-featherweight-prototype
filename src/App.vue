<template>
  <div id="q-app">
    <InitConfigStepper :show="renderInitConfig" />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InitConfigStepper from './components/InitConfigStepper'

const getters = mapGetters({
  isAdmin: 'isAdmin',
  initConfigCompleted: 'configuration/initConfigCompleted'
});

export default {
  name: 'App',
  components: {
    InitConfigStepper
  },
  computed: {
    ...getters,
    renderInitConfig() {
      // add logic to test if init config has been completed and if admin
      // if it is, return true, else return false
      if (this.isAdmin && !initConfigCompleted) {
        return true;
      }
      return false;
    },
  }
}
</script>

<style lang="styl">
  @import '~variables'

  $link-color          ?= lighten($primary, 25%)
  $link-color-active   ?= $primary

  a
    color $link-color
    text-decoration none
    cursor pointer
    outline 0
    transition color .25s
    &:hover
      color $link-color-active
    &:active, &:hover
      outline-width 0

  .modal-header
    padding-bottom 20px

  .modal-body
    padding-bottom 20px

</style>
