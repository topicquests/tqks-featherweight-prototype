<template>
  <q-page :padding="true" v-if="currentTag">
    <h4>
      <img style="margin-right:4px;" class="ibis-icon ibis-tag">
      {{ currentTag.label }}
    </h4>
    <q-scroll-area style="width: 800px; height: 800px;">
      <q-list v-if="nodes" v-for="node in currentTag.nodes" :key="node.id">
        <q-item>
          <router-link :to="{ name: 'questview', params: { id: node.id }}">{{ node.label }}</router-link>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
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
    // console.info("TagView" , "mounted", "Got id from param", this.$data.id);
    this.findTags({
      nodeId
    }).then( result => {
      const {
          data: [single]
        } = result;

      this.setCurrentTag(single);  
    });
    // tags.find({nodeId}).then(response => {
    //   console.info("TagView" , "mounted", "Find results", response);
    //   // alert(response)
    //   //this.$data.theTag = response
    //   this.$data.label = response.label;
    //   this.$data.nodes = response.nodes;
    // });
  }
};
</script>

<style>
</style>

