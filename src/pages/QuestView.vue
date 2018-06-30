<template>
    <q-page>
        <h3> Quest</h3>
        <span><h4>{{ label }}</h4></span>
        <span v-text="details"></span>
    </q-page>
</template>
<script>
import api from 'src/api'
export default {
  data () {
    return {
      label: '',
      details: ''
    }
  },
  mounted () {
    const id = this.$route.params.id
    const quests = api.service('quests')
    quests.find({ query: { 'id': id } })
      .then((response) => {
        console.log(response)
        var x = response.data[0]
        this.$data.label = x.label
        this.$data.details = x.details
      })
  }
}
</script>

<style>
</style>
