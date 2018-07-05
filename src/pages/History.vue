<template>
    <q-page class="flex flex-left">
        <h2>History</h2>
        <q-scroll-area style="width: 800px; height: 800px;">
          <q-list v-for="quest in rawData" :key="quest.id">
            <q-item>
              <!-- NOTE: adding /index.html# makes this work, but it's a hack style="margin-right: 4px"-->
              <a :href="`/index.html#/questview/${quest.id}`"><i  style="margin-right: 4px" :class="quest.type"/>{{ quest.label }}</a>
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
    conversation.find({
      query: {
        $limit: 50,
        $sort: {
          date: -1
        }
      }
    })
      .then((response) => {
        alert(JSON.stringify(response.data))
        this.$data.rawData = response.data
      })
  }
}
</script>

<style>

i.map {
    background-image: url("../statics/images/ibis/map_sm.png");
}
i.question {
    background-image: url("../statics/images/ibis/issue_sm.png");
}
i.answer {
    background-image: url("../statics/images/ibis/position_sm.png");
}
i.pro {
    background-image: url("../statics/images/ibis/plus_sm.png");
}
i.con {
    background-image: url("../statics/images/ibis/minus_sm.png");
}
</style>
