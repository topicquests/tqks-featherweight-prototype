<template>
  <q-page :padding="true">
    <h6>New Connection Form</h6>
    <!-- TODO a massive collection of pull-down selections -->
  </q-page>
</template>
<script>
export default {
  props: [ 'user' ],
  validations: {
    label: { required }
  },
  data () {
    return {
      source: '',
      target: '',
      callerId: '',
      callerType: ''
    }
  },
  methods: {

  },
  mounted () {

  }
</script>
<style>
</style>