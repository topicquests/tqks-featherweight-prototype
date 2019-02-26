<template>
  <q-page :padding="true">
    <q-btn
      v-if="isAuthenticated"
      style="margin-bottom: 4px;"
      label="New Quest"
      @click="$router.replace('/questedit')"
    />

    <q-table title="My Quests" :data="rootConversations" :columns="columns">
      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td key="type" style="width: 30px" :props="props">
            <i style="display: block;" :class="'ibis-icon ibis-' + props.row.type"/>
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
import api from "src/api";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["user"],
  data() {
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
      isAuthenticated: false,
      serverPagination: {},
      serverData: []
    };
  },

  computed: {
    ...mapGetters("conversation", { allConversations: "list" }),
    rootConversations() {
      return this.allConversations.filter(c => c.type === "map");
    }
  },

  methods: {
    ...mapActions("conversation", { findConversations: "find" }),
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
  mounted() {
    this.$data.isAuthenticated = this.$store.getters.isAuthenticated;
    const query = {
      $limit: 100,
      $sort: {
        date: -1
      },
      type: "map"
    };
    console.log("Finding w query: ", JSON.stringify(query));
    this.findConversations(query).then(
      d => console.log("Query returned", { d }),
      console.error
    );

    this.$store.commit("questView", false);
  }
};
</script>

<style>
</style>
