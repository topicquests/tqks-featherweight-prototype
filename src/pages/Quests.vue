<template>
  <q-page :padding="true">
    <q-btn style="margin-bottom: 4px;" label="New Quest" @click="$router.replace('/questedit')" />

        <q-table
          title="My Quests"
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

  export default {
    props: ['user'],
    data() {
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
        serverData: []
      }
    },
    methods: {
      fill(n) {
        var jsx = {}
        jsx.imgsm = n.imgsm
        jsx.label = `<router-link :to="{ name: 'questview', params: { id: ${ n.id }}">${ n.label }</router-link>`
        jsx.creator = n.creator
        jsx.handle = n.handle
        jsx.date = n.date
        // console.info('JSX', jsx)
        this.$data.serverData.push(jsx)
      },
      request({ pagination }) {
        //let skip = this.data.
        this.$store.dispatch('conversation/find', {
            query: {
              $limit: 100,
              $sort: {
                date: -1
              },
              'type': 'map'
            }
          })
          .then((response) => {
            this.$data.serverPagination = pagination
            var data = response.data
            // alert(JSON.stringify(data))
            if (data && data.length > 0) {
              this.$data.serverData = data
              // console.info('DATA', JSON.stringify(data))
              // data.map(this.fill)
            }
          })
      }
    },
    mounted() {
      if (this.user) {
        this.$data.isAuthenticated = true
      }
      this.request({
        pagination: this.serverPagination
      })
      
      this.$store.commit('questView', false)

    }
  }
</script>

<style>
</style>
