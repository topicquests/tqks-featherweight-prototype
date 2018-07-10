<template>
<div>
  <!--  <q-page class="flex flex-left"> -->
      <div  id="topbox">
        <h4><img style="margin-right:4px;" src="statics/images/search.png">Search Hits</h4>
        <b>Query: {{ query }}</b>
      </div>
      
      <q-scroll-area style="width: 800px; height: 800px;">
          <q-list v-for="quest in hits" :key="quest.id">
            <q-item>
              <!-- NOTE: adding /index.html# makes this work, but it's a hack style="margin-right: 4px"-->
              <a :href="`/index.html#/questview/${quest.id}`"><img  style="margin-right: 4px" :src="quest.imgsm">{{ quest.label }}</a>
            </q-item>
          </q-list>
        </q-scroll-area>
        </div>
    <!--</q-page>-->
</template>

<script>
import api from 'src/api'
const conversation = api.service('conversation')
export default {
  data () {
    return {
      query: '',
      hits: []
    }
  },
  methods: {
    doSearch () {
      let q = this.query
      conversation.find({ query: { $limit: 25, $search: q }})
        .then ((response) => {
          // alert(JSON.stringify(response))
          let hits = response.data
          // alert(JSON.stringify(hits))
          if (hits) {
            this.hits = hits
          } else {
            this.$q.notify({type: 'positive', message: 'No hits found'})
          }
        })
        .catch ((err) => {
          console.log('SearchError', err)
        })
    }
  },
  mounted () {
    let q = this.$route.params.q
    console.info('SRCH',  q)
    this.$data.query = q
    this.doSearch()
  }
}
</script>

<style>
#topbox {
  border: 1px solid black;
  background: white;
  margin: 12px;
  font-family:pragmatica-web,sans-serif;
  border-radius: 3px;
}
</style>

