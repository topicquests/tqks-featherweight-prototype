<template>
  <q-page :padding="true" v-if="currentTag">
    <h4>
      <img style="margin-right:4px;" class="ibis-icon ibis-tag">
      {{ currentTag.label }}
    </h4>
    <q-scroll-area v-if="currentTag.nodes" style="width: 800px; height: 800px;">
      <q-list  v-for="node in currentTag.nodes" :key="node.nodeId">
        <q-item>
          <router-link :to="{ name: 'questview', params: { id: node.nodeId }}">{{ node.label }}</router-link>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import api from 'src/api'
const tags = api.service('tags')

export default {
  computed: {
    ...mapGetters('tags', {
      currentTag: 'current'
    })
  },
  methods: {
    ...mapActions('tags', {
      findTags: 'find'
    }),
    ...mapMutations("tags", { setCurrentTag: "setCurrent" })
  },
  mounted() {
    this.$store.commit("questView", false);
    const nodeId = this.$route.params.id;
          console.info('TagView', 'find', {nodeId});

    // console.info("TagView" , "mounted", "Got id from param", this.$data.id);
    this.findTags({
      query: { nodeId }
    }).then( result => {
      console.info('TagView', 'find', {result});
      const {
          data: [single]
        } = result;

      this.setCurrentTag(single);  
    });
    /*tags.find({nodeId}).then(response => {
       console.info("TagView" , "mounted", "Find results", response);
       //alert(response)
       this.$data.theTag = response
       this.$data.label = response.label;
       this.$data.nodes = response.nodes;
    });*/
  }
};
</script>

<style>
</style>

