<template>
    <q-page :padding="true" class="flex flex-left">
        <h6>History</h6>
        <q-scroll-area style="width: 800px; height: 800px;">
          <q-list v-for="quest in rawData" :key="quest.id">
            <q-item>
              <!-- NOTE: adding /index.html# makes this work, but it's a hack style="margin-right: 4px"-->
              <a :href="`/index.html#/questview/${quest.id}`"><img  style="margin-right: 4px" :src="quest.imgsm">{{ quest.label }}</a>
            </q-item>
          </q-list>
        </q-scroll-area>
    </q-page>
</template>

<script>
import api from 'src/api'
export default {
  data () {
    return {
        rawData: []

    }
  },
  methods: {

  },
  mounted () {
    const conversation = api.service('conversation')
    this.$store.commit('questView', false)
    conversation.find({
      query: {
        $limit: 50,
        $sort: {
          date: -1
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

<style lang="styl">
</style>
