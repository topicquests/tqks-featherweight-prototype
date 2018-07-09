<template>
  <q-page>
        <h4><img style="margin-right:4px;" src="statics/images/ibis/map.png">Quests</h4>
        <q-btn v-if="isAuthenticated" style="margin-bottom: 4px;" label="New Quest" @click="$router.replace('/questedit')" />
        <q-scroll-area style="width: 800px; height: 400px;  margin-top: 1px;">
        <table class="q-table">
          <tbody >
            <tr v-for="quest in serverData" :key="quest.id">
              <td class="text-left"><img :src="quest.imgsm"></td>
              <td class="text-left"><a :href="`/index.html#/questview/${quest.id}`">{{ quest.label }}</a></td>
              <td class="text-left">{{ quest.handle }}</td>
              <td class="text-left">{{ quest.date }}</td>
            </tr>
          </tbody>
        </table>
        </q-scroll-area>
  </q-page>
</template>

<script>
import api from 'src/api'
const conversation = api.service('conversation')

export default {
  props: [ 'user' ],
  data () {
    return {
      isAuthenticated: false,
      serverPagination: {},
      serverData: []
    }
  },
  methods: {
    fill (n) {
      var jsx = {}
      jsx.imgsm = n.imgsm
      jsx.label = `<router-link :to="{ name: 'questview', params: { id: ${ n.id }}">${ n.label }</router-link>`
      jsx.creator = n.creator
      jsx.handle = n.handle
      jsx.date = n.date
      this.$data.serverData.push(jsx)
    },
    request ({ pagination }) {
      //let skip = this.data.
      this.$store.dispatch('conversation/find', { 
        query: {
          $sort: {
            date: -1
          },
          'type': 'map'
        }} )
        .then((response) => {
          this.$data.serverPagination = pagination
          var data = response.data
          // alert(JSON.stringify(data))
          if (data && data.length > 0) {
            this.$data.serverData = data
            // data.map(this.fill)
          }
        })
      }
  },
  mounted () {
    if (this.user) {
      this.$data.isAuthenticated = true
    }
    this.request({
      pagination: this.serverPagination
    })
    
  }
}
</script>

<style>
</style>
