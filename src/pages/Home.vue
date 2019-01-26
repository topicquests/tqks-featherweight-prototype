<!--
  This template locks out the rest of the show until one is logged in.<template>
  It illustrates the idea of a private portal.
  To make a public or private portal using isPrivate

-->
<template>
  <q-page :padding="true" class="flex flex-center">
    <div>
        <div class="column items-center">
          
          <h6>{{cms.title}}</h6>
          
          <div v-html="cms.body">
            
          </div>
          <q-inner-loading :visible="stillLoading">
            <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
          </q-inner-loading>
        </div>
      </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed:  {
    ...mapGetters('configuration', { currentConfig: 'getCopy' } ),
    stillLoading() {
      return !(this.currentConfig && this.currentConfig.cms);
    },
    cms() {
      if (this.stillLoading)
        return null;
      // Get the slug from current route and search for it in the config JSON
      const slug = this.$route.name;
      const page = this.currentConfig.cms.pages.filter(({slug}) => slug === slug)[0];
      return page;
    },
     authenticated () {
      return this.$store.getters.user !== null
    }
  },
  mounted () {
    this.$store.commit('questView', false)
    this.fetchCurrentConfiguration(1).then(
      (data) => {
        console.log('Got config', data);
      }
    )
    this.$store.commit('questView', false)
  },
  methods: {
    ...mapActions('configuration', {
      fetchCurrentConfiguration: 'get'
    }),
  }
  
  
}
</script>
<style lang="styl">

</style>
