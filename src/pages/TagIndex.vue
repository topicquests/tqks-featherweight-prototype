<template>
  <q-page :padding="true">
    <h4><img style="margin-right:4px;" class="ibis-icon ibis-tag">Tags</h4>
    <q-table title="Tags" :data="rootTags" :columns="columns">
      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td key="type" style="width: 30px" :props="props">
            <i :class="'ibis-icon ibis-'+'tag'"/>
          </q-td>
          <q-td key="label" :props="props">{{props.row.label}}</q-td>
          <q-td key="nodeId" auto-width :props="props">
            <router-link :to="{ name: 'tagview', params: { id:  props.row.nodeId }}">View</router-link>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
export default {
  data () {
    return {
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
          sortable: true
        }
      ],
      serverPagination: {},
      serverData: []
      //rawData: []
    }
  },
  computed: {
    ...mapGetters('tags', {
      allTags: 'list'
    }),
    rootTags() {
      return this.allTags;
    }
  },
  methods: {
    ...mapActions('tags', {
      findTags: 'find'
    })
  },
  async mounted () {
    this.$store.commit('questView', false)
    const tgs = this.findTags({});
//      .then((response) => {
        // alert(JSON.stringify(response.data))
//        this.$data.rawData = response.data
//      })

  }
}
</script>

<style>
</style>

