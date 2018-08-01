<template>
    <q-page :padding="true" >
      <h4><img style="margin-right:4px;" src="statics/images/tag.png">{{ label }}</h4>
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
const tags = api.service('tags')

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
    tags.get(this.$data.id)
      .then((response) => {
        // alert(response)
        //this.$data.theTag = response
        this.$data.label = response.label
        this.$data.nodes = response.nodes
      })
  }
}
</script>

<style>
</style>

