<template>
    <q-page>
        <h3> Quests</h3>
        <!-- "to="/questedit"-->
        <q-btn v-if="isAuthenticated" label="New Quest" @click="$router.replace('/questedit')" />
        <q-scroll-area style="width: 800px; height: 800px;">
          <q-list v-for="quest in myQuests" v-bind:key="quest">
            <q-item>
              <a :href="`/questview/${quest.id}`">{{ quest.label }}</a>
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
    listQuests: function () {
      console.log('ListQuests')
      return ['foo', 'bar']
    }
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
