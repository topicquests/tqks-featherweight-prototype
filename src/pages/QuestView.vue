<template>
    <q-page>
        <h3> Quest</h3>
        <span><h4>{{ label }}</h4></span>
        <span v-text="details"></span>
    </q-page>
</template>
<script>
// import api from 'src/api'
export default {
  data () {
    return {
      label: '',
      details: ''
    }
  }
}
</script>

<style>
</style>
