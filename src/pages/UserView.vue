<template>
    <q-page :padding="true" class="flex flex-left">
        
        <q-table
          title="My Contributions"
          :data="serverData"
          :columns="columns"
        >
        <template slot="body" slot-scope="props">
          <q-tr :props="props">
                <q-td  key="type" style="width: 30px"  :props="props">
                    <i :class="'ibis-icon ibis-' + props.row.type"/>
                </q-td>
                <q-td key="label" :props="props">
                  {{props.row.label}}
                </q-td>
                <q-td key="handle" :props="props">
                  {{props.row.handle}}
                </q-td>
                <q-td key="date" :props="props">
                  {{props.row.date}}
                </q-td>
                <q-td key="id" auto-width :props="props">
                  <router-link :to="{ name: 'questview', params: { id:  props.row.id }}">View</router-link>
                </q-td>
            </q-tr>
        </template>
        </q-table>
    </q-page>
</template>

<script>
import api from 'src/api'
const conversation = api.service('conversation')
// Mostly cloned from Quests.vue
export default {
  data () {
    return {
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
            sortable: true
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
          },
        ],
        isAuthenticated: true,
        serverPagination: {},
        serverData: [],
        userId: ''
    }
  },
  methods: {
    request({ pagination }) {
        this.$store.dispatch('conversation/find', {
            query: {
                'creator': this.userId,
                $limit: 100,
                $sort: {
                date: -1
                }
            }
            })
            .then((response) => {
                this.$data.serverPagination = pagination
                var data = response.data
                // alert(JSON.stringify(data))
                if (data && data.length > 0) {
                    this.$data.serverData = data
                    // console.info('DATA', JSON.stringify(data))
                }
            })
        }
    },
  mounted () {
    this.$store.commit('questView', false)
    this.userId = this.$route.params.id
    this.request({
        pagination: this.serverPagination
    })

      
  }
}
</script>

<style>
</style>

