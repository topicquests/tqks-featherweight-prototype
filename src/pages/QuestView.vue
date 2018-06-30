<template>
    <q-page>
        <h3> Quest</h3>
        <span><h4>{{ label }}</h4></span>
        <span v-text="details"></span>
    </q-page>
</template>
<script>
// TODO the process of acquiring the passed parameter 'id'
// is not working. It looks like we are forced to look at Vuex
// because the Vue and Quasar literature and all examples completely
// ignore this issue
import api from 'src/api'
var x = { props: ['id'] }
console.log(x.props[0])
var id = this.id
// this.$router.params.id
export default {
  data () {
    return {
      label: '',
      details: ''
    }
  },
  mounted () {
    const quests = api.service('quests')
    quests.get({ 'id': id })
      .then((response) => {
        console.log(response)
        this.$data.label = response.label
        this.$data.details = response.details
      })
  }
}
</script>

<style>
</style>
