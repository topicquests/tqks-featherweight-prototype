<template>
  <q-page :padding="true">
    <h4><img style="margin-right:4px;" src="statics/images/tag.png">Tags</h4>
        <q-scroll-area style="width: 800px; height: 800px;">
          <q-list v-for="quest in rawData" :key="quest.id">
            <q-item>
              <!-- NOTE: adding /index.html# makes this work, but it's a hack style="margin-right: 4px"-->
              <a :href="`/index.html#/tagview/${quest.id}`"><img  style="margin-right: 4px" :src="quest.imgsm">{{ quest.label }}</a>
            </q-item>
          </q-list>
        </q-scroll-area>
  
  </q-page>
</template>

<script>
import api from 'src/api'
const tags = api.service('tags')

export default {

  data () {
    return {
      rawData: []
    }
  },
  methods: {

  },
  mounted () {
    this.$store.commit('questView', false)
    tags.find({
      query: {
        $limit: 100,
        $sort: {
          label: 1
        }
      }
    })
      .then((response) => {
        // alert(JSON.stringify(response.data))
        this.$data.rawData = response.data
      })

  }
}
</script>

<style>
</style>

