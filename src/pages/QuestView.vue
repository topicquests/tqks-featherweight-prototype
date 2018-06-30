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
    quests.find({ 'id': id })
      .then((response) => {
        console.log(response)
        // TODO this is a hack to pluck a hit out of 5 hits
        // which means that query is not working.
        // A stored quest looks like this:
        // {"id":"e601cafc-7565-4058-aec3-229be2eada26","label":"Another test","details":"Yup","_id":"RFNf5Pb7CNG9vN6S"}
        // and the query against 'id' seems to be failing
        var x = response.data[0]
        this.$data.label = x.label
        this.$data.details = x.details
      })
  }
}
</script>

<style>
</style>
