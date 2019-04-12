<template>
  <q-page :padding="true" v-if="currentTag">
    <img style="margin-right:4px;" class="ibis-icon ibis-tag">
    {{ currentTag.label }}
    <q-table title="Tagged Views" :data="rootHits" :columns="columns">
      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td key="type" style="width: 30px" :props="props">
            <i style="display: block;" :class="'ibis-icon ibis-' + props.row.type"/>
          </q-td>
          <q-td key="label" :props="props">{{props.row.label}}</q-td>
          <q-td key="nodeId" auto-width :props="props">
            <router-link :to="{ name: 'topicview', params: { id:  props.row.nodeId }}">View</router-link>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import api from 'src/api'
const tags = api.service('tags')

export default {
  data () {
    return {
      //props: [ "id" ],
      columns: [
        {
          name: "type",
          required: true,
          label: "Type",
          align: "left",
          field: "type",
          sortable: true
        },
        {
          name: "label",
          required: true,
          label: "Label",
          align: "left",
          field: "label",
          sortable: true
        },
        {
          name: "nodeId",
          required: true,
          label: "Action",
          align: "left",
          field: "nodeId",
          sortable: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters('tags', {
      currentTag: 'current'      
    }),
    rootHits() {
      return this.currentTag.nodes;
    }
  },
  methods: {
    ...mapActions('tags', {
      findTags: 'find'
    }),
    ...mapMutations("tags", { setCurrentTag: "setCurrent" })
  },
  async mounted() {
    this.$store.commit("questView", false);
    const nodeId = this.$route.params.id;
          console.info('TagView', 'find', {nodeId});

    // console.info("TagView" , "mounted", "Got id from param", this.$data.id);
    
    const hits = await this.findTags({ 
      query: { nodeId }
    });
    console.info('HITS', hits.data[0])
    //this.$data.serverData = hits;
    //const {
    //      data: [single]
    //    } = hits;

    this.setCurrentTag(hits.data[0]);  
  }
}
</script>

<style>
</style>

