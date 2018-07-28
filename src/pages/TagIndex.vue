<template>
    <q-page :padding="true" class="flex flex-left">
      <h4><img style="margin-right:4px;" src="statics/images/tag.png">Tags</h4>
   </q-page>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {

  },
  mounted () {
    this.$store.commit('questView', false)
  }
}
</script>

<style>
</style>

