<template>

    <q-page>
      <div id="topbox">
        <h6><img style="margin-right:4px;" src="statics/images/search.png">Search Hits</h6>
        <b>Query: {{ query }}</b>
      </div>
      
      <q-scroll-area style="width: 800px; height: 800px;">
          <q-list v-for="quest in hits" :key="quest.id">
            <q-item>
              <router-link v-if="quest.type === 'tag'" :to="{ name: 'tagview', params: { id: quest.id }}"><img  style="margin-right: 4px" :src="quest.imgsm">{{ quest.label }}</router-link>
              <router-link v-else :to="{ name: 'questview', params: { id: quest.id }}"><img  style="margin-right: 4px" :src="quest.imgsm">{{ quest.label }}</router-link>
            </q-item>
          </q-list>
        </q-scroll-area>
        
    </q-page>
</template>

<script>
import api from 'src/api'
const conversation = api.service('conversation')
const tags = api.service('tags')
export default {
  data () {
    return {
      query: '',
      hits: []
    }
  },
  methods: {
    doSearch () {
      let result = []
      let q = this.query
      conversation.find({ query: { $limit: 100, $search: q, skippop:true }})
        .then ((response) => {
          // alert(JSON.stringify(response))
          let hits = response.data
          //alert(JSON.stringify(hits))
          console.info('SrchCon', JSON.stringify(hits))
          if (hits) {
            for (var i = 0; i < hits.length; i++) {
              result.push(hits[i])
            }
            
          }
          tags.find({ query: { $limit: 100, $search: q, skippop:true }})
            .then ((response) => {
              // alert(JSON.stringify(response))
              let hits = response.data
              //alert(JSON.stringify(hits))
              console.info('SrchTag', JSON.stringify(hits))
              if (hits) {
                for (var i = 0; i < hits.length; i++) {
                  result.push(hits[i])
                }
              }
              console.info('SrchHits', JSON.stringify(result))
              this.hits = result
            })
            .catch ((err) => {
              console.info('tagSearchError', err)
            })
        })
        .catch ((err) => {
          console.ingo('ConversationSearchError', err)
        })
    }
  },
  mounted () {
    this.$store.commit('questView', false)
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

