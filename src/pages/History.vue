<template>
  <q-page :padding="true" >
    <q-table 
      title="Conversation History"
      :data="listConversations"
      :columns="columns"
      row-key="id"
      >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td  key="type" style="width: 30px"  :props="props">
          <i style="display: block;" :class="'ibis-icon ibis-' + props.row.type"/>
        </q-td>
        <q-td key="label" :props="props">{{ props.row.label }}</q-td>
            <q-td key="handle" :props="props">
          {{props.row.handle}}
        </q-td>
        <q-td key="date" :props="props">{{props.row.date}}</q-td>
        <q-td key="nodeId" auto-width :props="props">
          <router-link :to="{ name: 'questview', params: { id:  props.row.nodeId }}">View</router-link>
        </q-td>
    </q-tr>
    
  </q-table>

</q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters('conversation', { listConversations: 'list'})
  },
  data () {
    return {
        rawData: [],
        columns: [
           {
            name: 'type',
            required: true,
            label: 'Type',
            align: 'left',
            field: 'type',
            sortable: true
          },
          {
            name: 'label',
            required: true,
            label: 'Label',
            align: 'left',
            field: 'label',
            sortable: true,
            classes: 'my-class',
            style: 'width: 500px'
          },
           {
            name: 'handle',
            required: true,
            label: 'Handle',
            align: 'left',
            field: 'handle',
            sortable: true
          },
          {
            name: 'date',
            required: true,
            label: 'Date',
            align: 'left',
            field: 'date',
            sortable: true
          },
          {
            name: 'nodeId',
            required: true,
            label: 'Action',
            align: 'left',
            field: 'nodeId',
            sortable: true
          }
        ]
    }
  },
  mounted () {
    this.$store.commit('questView', false)
    this.findConversations({sort: {date: -1}})
      .then((response) => {
        console.info({response});
      })
  },
  methods: {
    ...mapActions('conversation', { findConversations: 'find'}),
    historyList: function(type) {
      console.log('HX',type)
      return type === 'topic' ? 'topicView' : 'questView';
    }
  }
}
</script>

<style lang="styl">
</style>
