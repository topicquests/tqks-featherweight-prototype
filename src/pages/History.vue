<template>
<q-page :padding="true" class="flex flex-left">
<!--<h6>History</h6>-->
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
            
<q-td key="label" :props="props"><router-link to="">{{ props.row.label }}</router-link></q-td>
            <q-td key="handle" :props="props">
          {{props.row.handle}}
        </q-td>
            <q-td key="date" :props="props">
          {{props.row.date  | moment("dddd, MMMM Do YYYY") }}
        </q-td>
                 <q-td key="id" auto-width :props="props">
                  <router-link :to="{ name: 'questview', params: { id:  props.row.id }}">View</router-link>
                </q-td>
</q-tr>
    
  </q-table>
<!--<q-scroll-area style="width: 800px; height: 800px;">-->
  

<!--  <q-list v-for="quest in listConversations" :key="quest.id">-->
<!--    <q-item>-->
      <!-- NOTE: adding /index.html# makes this work, but it's a hack style="margin-right: 4px"-->
<!--      <router-link :to="`/index.html#/${historyList(quest.type)}/${quest.id}`"><img  style="margin-right: 4px" :src="quest.imgsm">{{ quest.label }}</router-link>-->
<!--    </q-item>-->
<!--  </q-list>-->
<!--</q-scroll-area>-->
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
            name: 'id',
            required: true,
            label: 'Action',
            align: 'left',
            field: 'id',
            sortable: true
          }
        ]
    }
  },
  mounted () {
    this.$store.commit('questView', false)
    this.findConversations({
      query: {
        $limit: 50,
        $sort: {
          date: -1
        }
      }
    })
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
