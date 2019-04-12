<template>
    <q-page :padding="true" class="flex flex-left">
      <q-table title="Bookmarks" :data="rootBookmarks" :columns="columns">
        <template slot="body" slot-scope="props">
          <q-tr :props="props">
            <q-td key="type" style="width: 30px" :props="props">
              <img  src="statics/images/bookmark_sm.png" >
            </q-td>
            <q-td key="label" :props="props">{{props.row.label}}</q-td>
            <q-td key="handle" :props="props">{{props.row.handle}}</q-td>
            <q-td key="date" :props="props">{{props.row.date}}</q-td>
            <q-td key="nodeId" auto-width :props="props">
              <router-link :to="{ name: 'questview', params: { id:  props.row.nodeId }}">View</router-link>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-page>
</template>

<script>
//import api from 'src/api'
import { mapActions, mapGetters } from "vuex";

//const conversation = api.service('conversation')

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
          name: "handle",
          required: true,
          label: "Handle",
          align: "left",
          field: "handle",
          sortable: true
        },
        {
          name: "date",
          required: true,
          label: "Date",
          align: "left",
          field: "date",
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
    }
  },
  methods: {
    ...mapActions("conversation", { findBookmarks: "find" }),
    fill(n) {
      var jsx = {};
      jsx.imgsm = n.imgsm;
      jsx.label = `<router-link :to="{ name: 'questview', params: { nodeId: ${
        n.nodeId
      }}">${n.label}</router-link>`;
      jsx.creator = n.creator;
      jsx.handle = n.handle;
      jsx.date = n.date;
      console.info("JSX", jsx);
      this.$data.serverData.push(jsx);
    }
  },

  computed: {
    ...mapGetters("conversation", { allBookmarks: "list" }),
    rootBookmarks() {
      return this.allBookmarks.filter(c => c.type === "bookmark");
    }
  },
  async mounted () {
    this.$store.commit('questView', false)
    const query = {
      type: "bookmark",
      $limit: 1000
    };
    console.log("Finding w query: ", JSON.stringify(query));
    const bookmarks = await this.findBookmarks({ query });
    console.log("Query returned", { bookmarks });
  }
}
</script>

<style>
</style>

