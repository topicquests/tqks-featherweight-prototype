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
  data () {
    return {
      isAuthenticated: true,
      myQuests: []
    }
  },
  methods: {

  },
  mounted () {
    const quests = api.service('quests')
    quests.find({
      query: {
        $limit: 25
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
