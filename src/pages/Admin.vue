<template>
    <q-page class="flex justify-center">
        <div>
            <h4>Administration Panel</h4>
            <q-card class="q-pa-sm q-my-sm">
              <q-card-title class="q-headline q-ma-sm">
                Open Invitations
              </q-card-title>
              <q-table
                :data="invitationsList"
                :columns="inviteColumns"
                row-key="name"
              >
                <q-td key="actions" name="actions" slot="body-cell-actions" slot-scope="props">
                  <q-btn small color="negative" @click.prevent="removeInvite(props.row)">
                    Delete
                  </q-btn>
                </q-td>
              </q-table>
            </q-card>
            <q-card class="q-pa-sm q-my-sm">
              <q-card-title class="q-headline q-ma-sm">
                Add Invitations
              </q-card-title>
              <div class="row">
                <q-field
                  icon="email"
                  icon-color="dark"
                  orientation="vertical"
                  helper="Enter an email"
                >
                  <q-input v-model="inviteEmail"/>
                </q-field>
              </div>
              <div class="row justify-end">
                <q-btn color="secondary" icon="email" label="Add" @click="addInvite" />
              </div>
            </q-card>
            <q-card class="q-pa-sm q-my-sm">
              <q-card-title class="q-headline q-ma-sm">
                Current Users
              </q-card-title>
              <q-table
                :data="usersList"
                :columns="userColumns"
                row-key="name"
              >
                <q-td key="actions" name="actions" slot="body-cell-actions" slot-scope="props">
                  <q-btn small color="negative" @click.prevent="removeUser(props.row)">
                    Delete
                  </q-btn>
                  <q-btn small color="primary" @click.prevent="displayUser(props.row.email)">
                    View
                  </q-btn>
                </q-td>
              </q-table>
            </q-card>
            <q-card class="q-pa-sm q-my-sm">
              <q-card-title class="q-headline q-ma-sm">
                Manage Configuration
              </q-card-title>
              <div class="row">
                <q-select v-model="isPrivatePortal" stack-label="Private Portal" :options="selectOptions" />
              </div>
              <div class="row">
                <q-select v-model="requiresInvite" stack-label="Invitation Required" :options="selectOptions"  />
              </div>
              <div class="row">
                <q-input v-model="adminEmail" stack-label="Administrator Email" />
              </div>
              <div class="row justify-end">
                <q-btn color="warning" label="Save Config" @click="saveConfig" />
              </div>
            </q-card>

            <q-card class="q-pa-sm q-my-sm" color="negative">
              <q-card-title class="q-headline q-ma-sm">
                Change Node Type
              </q-card-title>
              <div class="row q-my-sm">
                Select New NodeType
              </div>
              <div class="row">
                <q-radio v-model="option" @input="doRadio" val="question" label="Question" />
                <q-radio v-model="option" @input="doRadio" val="answer" label="Answer/Idea" />
                <q-radio v-model="option" @input="doRadio" val="pro" label="Pro" />
                <q-radio v-model="option" @input="doRadio" val="con" label="Con" />
              </div>
              <div class="row">
                <q-input stack-label="Enter Node ID" v-model="nodeId" />
              </div>
              <div class="row justify-end">
                <q-btn label="Change Node Type" @click="changeNodeType" />
              </div>
            </q-card>
        </div>
        <q-dialog
          v-model="customDialogModel"
          stack-buttons
          prevent-close
          @ok="onOk"
        >
        </q-dialog>
    </q-page>
</template>

<style scoped>
  .q-table-container {
    box-shadow: 0 0 0 0;
  }
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
const actions = mapActions({
  fetchCurrentConfiguration: 'configuration/get',
  updateConfiguration: 'configuration/update',
  findInvites: 'invitations/find',
  createInvite: 'invitations/create',
  deleteInvite: 'invitations/remove',
  findUsers: 'users/find',
  deleteUser: 'users/remove',
  findConversation: 'conversation/find',
  updateConversation: 'conversation/update',
});
const getters = mapGetters({
  currentConfig: 'configuration/getCopy',
  invitationsList: 'invitations/list',
  usersList: 'users/list',
});

export default {
  data () {
    return {
      selectOptions: [
        {
          label: 'True',
          value: true
        },
        {
          label: 'False',
          value: false
        }
      ],
      inviteColumns: [
        {
          name: 'email',
          required: true,
          label: 'Email',
          align: 'left',
          field: 'email',
          sortable: true,
          style: 'width: 100%'
        },
        {
          name: 'actions',
          required: true,
          label: 'actions',
          align: 'left',
          style: 'width: 100%'
        },
      ],
      userColumns: [
        {
          name: 'email',
          required: true,
          label: 'Email',
          align: 'left',
          field: 'email',
          sortable: true,
          style: 'width: 100%'
        },
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: '_id',
          sortable: true,
          style: 'width: 100%'
        },
        {
          name: 'actions',
          required: true,
          label: 'actions',
          align: 'left',
          style: 'width: 100%'
        },
      ],
      customDialogModel: false,
      invites: [],
      inviteEmail: '',
      users: [],
      option: '',
      nodeId: '',
      isPrivatePortal: false,
      requiresInvite: true,
      adminEmail: ''
    }
  },

  computed:  {
    ...getters,
  },
  async mounted () {
    this.$store.commit('questView', false)
    const config = await this.fetchCurrentConfiguration(1);
    await this.findInvites({ query: { $limit: 100 } });
    await this.findUsers({ query: { $limit: 100 } });
    console.log('Got config', config);
    const { adminEmail, requiresInvite, isPrivatePortal } = config;
    this.$data.isPrivatePortal = isPrivatePortal;
    this.$data.requiresInvite = requiresInvite;
    this.$data.adminEmail = adminEmail;
  },
  methods: {
    ...actions,
    onOk(data) {
      console.log('ok')
    },
    async saveConfig() {
      //var json = {}
      try {
        let config = this.currentConfig;
        config.isPrivatePortal = this.$data.isPrivatePortal
        config.requiresInvite = this.$data.requiresInvite
        config.adminEmail = this.$data.adminEmail
        await this.updateConfiguration([1, config])
        this.$q.notify({type: 'positive', message: 'Successfully updated config'});
      } catch (e) {
        this.$q.notify({type: 'negative', message: 'Error ' + e});
      }
    },
    doRadio (event) {
      this.$data.option = event
    },

    async addInvite() {
      // alert('Add invite')
      const email = this.inviteEmail.trim()
      if (email === '') {
        return
      }
      try {
        await this.createInvite({ email });
        this.$q.notify({type: 'positive', message: 'Invitations added'});
        this.inviteEmail = '';
      } catch(e) {
        this.$q.notify({type: 'negative', message: 'Error ' + error});
      }
    },
    async removeInvite(user) {
      try {
        this.$q.dialog({
          title: 'Confirm',
          message: `Delete invite for ${user.email}?`,
          ok: 'Yes',
          cancel: 'No'
        })
          .then(() => {
            this.deleteInvite(user._id)
              .then(
                  this.$q.notify(`Deleted invite for ${user.email}!`)
              )
              .catch(err => {
                this.$q.notify({type: 'negative', message: 'Error-2 ' + err});
              })
          })
          .catch(() => {
            this.$q.notify('Cancelled...')
          })
      } catch(e) {
        this.$q.notify({type: 'negative', message: 'Error-2 ' + e});
      }
    },
    displayUser(email) {
      this.findUsers({ query: { email }})
        .then((response) => {
          alert(JSON.stringify(response));
          this.displayEmail = '';
        })
        .catch(e => {
          console.error('Admin.vue', 'listUsers', 'error', e);
        })
    },
    async removeUser(user) {
      try {
        this.$q.dialog({
          title: 'Confirm',
          message: `Delete: ${user.email}?`,
          ok: 'Yes',
          cancel: 'No'
        })
          .then(() => {
            this.deleteUser(user._id)
              .then(
                  this.$q.notify(`Deleted user: ${user.email}!`)
              )
              .catch(err => {
                this.$q.notify({type: 'negative', message: 'Error-2 ' + err});
              })
            })
          .catch(() => {
            this.$q.notify('Cancelled...')
          });
        this.removeUserEmail = '';
      } catch (e) {
        console.error('Admin.vue', 'removeUser', 'error', e);
      }
    },
    getLargeIcon (typ) {
        if (typ === 'question') {
          return 'statics/images/issue.png'
        } else if (typ === 'answer') {
          return 'statics/images/position.png'
        } else if (typ === 'pro') {
          return 'statics/images/plus.png'
        } else if (typ === 'con') {
          return 'statics/images/minus.png'
        }
        return ''
    },
    getSmallIcon (typ) {
        if (typ === 'question') {
          return 'statics/images/issue_sm.png'
        } else if (typ === 'answer') {
          return 'statics/images/position_sm.png'
        } else if (typ === 'pro') {
          return 'statics/images/plus_sm.png'
        } else if (typ === 'con') {
          return 'statics/images/minus_sm.png'
        }
        return ''
    },
    changeNodeType () {
      const nid = this.$data.nodeId.trim()
      const choice = this.$data.option
      const newtype = choice+'s'
      //Get that node and perform surgery on it
      this.findConversation({ query: { 'id':nid, skippop:true } })
        .then ((response) => {
          var child = response.data[0]
          const oldType = child.type+'s'
          console.info('CNT-Child', JSON.stringify(child))
/*
{"id":"9a21ed84-b66a-4a87-9f33-c65a21a39b6d","label":"Why is the sky blue?","details":"","url":"","creator":"Uyrena5iH2SGdvPY","handle":"sue","date":"2018-07-24T23:56:06.603Z",
"type":"answer",
"img":"statics/images/position.png",
"imgsm":"statics/images/position_sm.png",
"parentId":"bb86153f-6d50-4526-bc10-28f0731d7278","parentLabel":"Jim's Second Quest","_id":"DRWKPMobqL9YscSw"}
*/
          child.type = choice
          child.img = this.getLargeIcon(choice)
          child.imgsm = this.getSmallIcon(choice)
          console.info('CNT-Child-2', JSON.stringify(child))
/*
{"id":"9a21ed84-b66a-4a87-9f33-c65a21a39b6d","label":"Why is the sky blue?","details":"","url":"","creator":"Uyrena5iH2SGdvPY","handle":"sue","date":"2018-07-24T23:56:06.603Z",
"type":"question",
"img":"statics/images/issue.png",
"imgsm":"statics/images/issue_sm.png","parentId":"bb86153f-6d50-4526-bc10-28f0731d7278","parentLabel":"Jim's Second Quest","_id":"DRWKPMobqL9YscSw"}
*/
          const parentId = child.parentId
          this.updateConversation(child.id, child)
            .then((resp) => {
              if (parentId) {
                this.findConversation({ query: { 'id':parentId, skippop:true } })
                  .then ((response2) => {
                    console.info('XXX', parentId, response2)
                    const parent = response2.data[0]
                    console.info('CNT-Parent', JSON.stringify(parent))
/*
{"id":"e64d7264-6a31-44a3-9a99-84ebc904a382","type":"map","label":"Test  Quest","url":"","details":"","img":"statics/images/map.png","imgsm":"statics/images/map_sm.png","creator":"Uyrena5iH2SGdvPY","handle":"sue","date":"2018-07-25T00:52:29.998Z",
"answers":["72d22096-aef8-4e89-9f6d-ddaffd80dc36"],"_id":"B48n0KwxK1y7CXyV"}
*/
                    const oldkids = parent[oldType]
                    console.info('OLDKIDS', oldkids)
                    if (oldkids) {
                      var where = oldkids.indexOf(nid)
                      console.info('WHERE', where)
                      if (where !== -1) {
                        oldkids.splice(where, 1);
                        console.info('OLDKIDS-2', oldkids)
                        parent[oldType] = oldkids
                      }
                    }
                    var newkids = parent[newtype]
                    if (!newkids) {
                      newkids = []
                    }
                    where = newkids.indexOf(nid)
                    console.info('WHERE-2', where)
                    if (where === -1) {
                      newkids.push(nid)
                      parent[newtype] = newkids
                    }
                    console.info('CNT-Parent-2', JSON.stringify(parent))
/*
{"id":"e64d7264-6a31-44a3-9a99-84ebc904a382","type":"map","label":"Test  Quest","url":"","details":"","img":"statics/images/map.png","imgsm":"statics/images/map_sm.png","creator":"Uyrena5iH2SGdvPY","handle":"sue","date":"2018-07-25T00:52:29.998Z",
"answers":[],"_id":"B48n0KwxK1y7CXyV",
"questions":["72d22096-aef8-4e89-9f6d-ddaffd80dc36"]}*/
                    this.updateConversation(parent.id, parent)
                      .then((resp2) => {
                        this.$data.nodeId = ''
                      })
                  })
              }
            })

        })

    }
  }

}
</script>

<style>
.box {
  border: 1px solid black;
  background: white;
  margin: 12px;
  font-family:pragmatica-web,sans-serif;
  border-radius: 3px;
}
</style>
