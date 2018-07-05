<template>
    <q-page>
        <h3> Quests</h3>
        <q-btn v-if="isAuthenticated" label="New Quest" @click="$router.replace('/questedit')" />
        <q-scroll-area style="width: 800px; height: 800px;">
          <q-list v-for="quest in myQuests" :key="quest.id">
            <q-item>
              <!-- NOTE: adding /index.html# makes this work, but it's a hack -->
              <a :href="`/index.html#/questview/${quest.id}`">{{ quest.label }}</a>
            </q-item>
          </q-list>
        </q-scroll-area>
    </q-page>
</template>

<script>
import api from 'src/api'
export default {
  props: [ 'user' ],
  data () {
    return {
      isAuthenticated: false,
      myQuests: []
    }
  },
  methods: {

  },
  mounted () {
    const conversation = api.service('conversation')
    if (this.user) {
      this.$data.isAuthenticated = true
    }
    conversation.find({
      query: {
        $limit: 25,
        'type': 'map'
      }
    })
      .then((response) => {
        this.$data.myQuests = response.data
      })
  }
}
</script>

<style>
</style>
