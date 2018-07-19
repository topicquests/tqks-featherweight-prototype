<template>
    <q-page :padding="true" class="flex flex-left">
        <div>
            <h6>Channels</h6>
        </div>
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

