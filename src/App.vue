<template>
  <div id="q-app">
    <InitConfigStepper :class="{hidden: !renderInitConfig}" />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InitConfigStepper from './components/InitConfigStepper'

const getters = mapGetters({
  isAdmin: 'isAdmin',
  currentConfig: 'configuration/getCopy',
});

export default {
  name: 'App',
  components: {
    InitConfigStepper
  },
  computed: {
    ...getters,
    renderInitConfig() {
      if (this.currentConfig && !this.currentConfig.isInitConfigCompleted && this.currentConfig.loginCount < 2) {
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
