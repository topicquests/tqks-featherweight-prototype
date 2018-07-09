<!--
  This template locks out the rest of the show until one is logged in.<template>
  It illustrates the idea of a private portal.
  To make a public or private portal using isPrivate

-->
<template>
  <q-page class="flex flex-center">
    <div>
      <div class="layout-padding">
        <div class="column items-center">
          <h3>FeatherWeight Prototype</h3>
          <img src="statics/images/earthrise2.png" >
          <h5>
            For a better experience with FeatherWeight, first register your avatar for the email you will use here at <a href="https://www.gravatar.com">https://www.gravatar.com</a>
            then signup and go to the <router-link to="/chat">Chat</router-link>
          </h5>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    authenticated () {
      return this.$store.getters.user !== null
    }
  },
  methods: {
  },
  mounted () {
  },
  beforeDestroy () {
  }
}
</script>

<style lang="styl">

</style>
