<template>
  <q-page :padding="true">
    <h4><img style="margin-right:4px;" class="ibis-icon ibis-tag">Tags</h4>
        <q-scroll-area style="width: 800px; height: 800px;">
          <q-list v-for="tag in allTags" :key="tag.nodeId">
            <q-item>
              <!-- NOTE: adding  makes this work, but it's a hack style="margin-right: 4px"-->
              <router-link :to="`/tagview/${tag.nodeId}`"><img  style="margin-right: 4px" :src="tag.imgsm">{{ tag.label }}</router-link>
            </q-item>
          </q-list>
        </q-scroll-area>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data () {
    return {
      rawData: []
    }
  },
  computed: {
    ...mapGetters('tags', {
      allTags: 'list'
    })
  },
  methods: {
    ...mapActions('tags', {
      findTags: 'find'
    })
  },
  mounted () {
    this.$store.commit('questView', false)
    this.findTags({
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

