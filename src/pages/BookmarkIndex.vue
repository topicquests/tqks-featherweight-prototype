<template>
    <q-page :padding="true" class="flex flex-left">
      <q-table title="Bookmarks" :data="rootBookmarks" :columns="columns">
        <template slot="body" slot-scope="props">
          <q-tr :props="props">
            <q-td key="type" style="width: 30px" :props="props">
              <i :class="'ibis-icon ibis-' + props.row.type"/>
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
      <!--<h4><img style="margin-right:4px;" src="statics/images/bookmark.png">Web Annotations</h4>
        <q-scroll-area style="width: 800px; height: 800px;">
          <q-list v-if="nodes" v-for="node in nodes" :key="node.id">
            <q-item>
              <router-link :to="{ name: 'questview', params: { id: node.id }}">{{ node.label }}</router-link>
            </q-item>
          </q-list>
        </q-scroll-area>-->
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
  mounted () {
    this.$store.commit('questView', false)
    const query = {
      limit: 100,
      sort: {
        date: -1
      },
      type: "bookmark"
    };
    console.log("Finding w query: ", JSON.stringify(query));
    this.findBookmarks(query).then(
      d => console.log("Query returned", { d }),
      console.error
    );
  }
}
</script>

<style>
</style>

