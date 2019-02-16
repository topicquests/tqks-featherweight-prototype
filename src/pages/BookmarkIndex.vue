<template>
    <q-page :padding="true" class="flex flex-left">
      <h4><img style="margin-right:4px;" src="statics/images/bookmark.png">Web Annotations</h4>
        <q-scroll-area style="width: 800px; height: 800px;">
          <q-list v-if="nodes" v-for="node in nodes" :key="node.id">
            <q-item>
              <router-link :to="{ name: 'questview', params: { id: node.id }}">{{ node.label }}</router-link>
            </q-item>
          </q-list>
        </q-scroll-area>
    </q-page>
</template>

<script>
import api from 'src/api'
const conversation = api.service('conversation')

export default {
  data () {
    return {
      label: '',
      id: '',
      nodes: null
    }
  },
  methods: {

  },
  mounted () {
    this.$store.commit('questView', false)
    this.$data.id = this.$route.params.id
    console.info('TAGS-1', this.$data.id)
    conversation.find({
      query: {
        $limit: 100,
        $sort: {
          date: -1
        },
        'type': 'bookmark'
      }
    })
      .then((response) => {
        // alert(JSON.stringify(response.data))
        this.$data.nodes = response.data
      })
  }
}
</script>

<style>
</style>

