<template>
    <q-page class="flex flex-left">
        <div>
            <h6>Admin</h6>
            <div class="box">
                <q-btn label="List Invitations" @click="listInvites" />
                <q-scroll-area style="width: 200px; height: 100px;">
                    <q-list v-for="inv in invites" :key="inv.email">
                        {{ inv.email }}
                    </q-list>
                </q-scroll-area>
            </div>
            <div class="box">
                <h5>Add One Email to Invitations</h5>
                <q-input  v-model="inviteEmail" />
                <q-btn label="Add Invitation" @click="addInvite" />
            </div>
            <div class="box">
                <h5>Remove One Email from Invitations</h5>
                <q-input  v-model="removeEmail" />
                <q-btn label="Remove Invitation" @click="removeInvite" />
            </div>
            <div class="box">
                <q-btn label="List Users" @click="listUsers" /><br/>
                <q-scroll-area style="width: 200px; height: 100px;">
                    <q-list v-for="inv in users" :key="inv.email">
                        {{ inv.email + " " + inv._id }}
                    </q-list>
                </q-scroll-area>
            </div>
            <div class="box">
              <h5>Display a User</h5>
              <q-input  v-model="displayEmail" />
              <q-btn label="Display User" @click="displayUser" />
            </div>
            <div class="box">
              <h5>Remove a User</h5>
              <q-input  v-model="removeUserEmail" />
              <q-btn label="Remove User" @click="removeUser" />
            </div>

            <div class="box" style="background-color: red;">
              <h5>Change Node Type</h5>
              <b>Select New NodeType, Enter NodeId, Submit</b><br/>
              <q-radio v-model="option" @input="doRadio" val="question" label="Question" />
              <q-radio v-model="option" @input="doRadio" val="answer" label="Answer/Idea" />
              <q-radio v-model="option" @input="doRadio" val="pro" label="Pro" />
              <q-radio v-model="option" @input="doRadio" val="con" label="Con" /><br/>
              <br/><b>Node ID</b><br/>
              <q-input   v-model="nodeId" />
              <q-btn label="Change Node Type" @click="changeNodeType" />
            </div>

        </div>
    </q-page>
</template>

<script>
import api from 'src/api'
const invites = api.service('invitations')
const users = api.service('users')
const conversation = api.service('conversation')

export default {
  data () {
    return {
      invites: [],
      inviteEmail: '',
      removeEmail: '',
      users: [],
      displayEmail: '',
      removeUserEmail: '',
      option: '',
      nodeId: ''
    }
  },
  mounted () {
    this.$store.commit('questView', false)
  },
  methods: {
    doRadio (event) {
      this.$data.option = event
    },
    listInvites () {
      // alert('List invites')
      invites.find({ query: { $limit: 100 } })
        .then((response) => { this.$data.invites = response.data })
    },

    addInvite () {
      // alert('Add invite')
      var ems = this.$data.inviteEmail.trim()
      if (ems === '') {
        return
      }
      var json = {}
      json.email = ems
      invites.create(json).then((response) => {
        this.$q.notify({type: 'positive', message: 'Invitations added'})
      }).catch((error) => {
        this.$q.notify({type: 'negative', message: 'Error ' + error})
      })
      this.$data.inviteEmail = ''
    },
    removeInvite () {
      var ems = this.$data.removeEmail.trim()
      if (ems === '') {
        return
      }
      var json = {}
      json.email = ems
      invites.find({ query: { 'email':ems } }).then((response) => {
        // console.info('INVITE', JSON.stringify(response))
        invites.remove(response.data[0]._id).then((response) => {
          this.$q.notify({type: 'positive', message: 'Invitations removed'})
        }).catch((error) => {
          this.$q.notify({type: 'negative', message: 'Error-1 ' + error})
        })
      }).catch((error) => {
        this.$q.notify({type: 'negative', message: 'Error-2 ' + error})
      })
      this.$data.removeEmail = ''
    },
    listUsers () {
      users.find({ query: { $limit: 100 } })
        .then((response) => { this.$data.users = response.data })
    },
    displayUser () {
      var ems = this.$data.displayEmail.trim()
      // alert(ems)
      if (ems === '') {
        return
      }
      var json = {}
      var x = {}
      x.email = ems
      json.query = x
      users.find(json).then((response) => {
        alert(JSON.stringify(response))
        this.displayEmail = ''
      })
    },
    removeUser() {
      var ems = this.$data.removeUserEmail.trim()
      // alert(ems)
      if (ems === '') {
        return
      }
      var json = {}
      var x = {}
      x.email = ems
      json.query = x
      users.find(json).then((response) => {
        // alert(JSON.stringify(response))
        const usr = response.data[0]
        json = {}
        x._id = usr._id
        json.query = x
        users.remove(usr._id).then((foo) => {
          this.removeUserEmail = ''
        })       
      })
    },
    getLargeIcon (typ) {
        if (typ === 'question') {
          return 'statics/images/ibis/issue.png'
        } else if (typ === 'answer') {
          return 'statics/images/ibis/position.png'
        } else if (typ === 'pro') {
          return 'statics/images/ibis/plus.png'
        } else if (typ === 'con') {
          return 'statics/images/ibis/minus.png'
        }
        return ''
    },
    getSmallIcon (typ) {
        if (typ === 'question') {
          return 'statics/images/ibis/issue_sm.png'
        } else if (typ === 'answer') {
          return 'statics/images/ibis/position_sm.png'
        } else if (typ === 'pro') {
          return 'statics/images/ibis/plus_sm.png'
        } else if (typ === 'con') {
          return 'statics/images/ibis/minus_sm.png'
        }
        return ''
    },
    changeNodeType () {
      const nid = this.$data.nodeId.trim()
      const choice = this.$data.option
      const newtype = choice+'s'
      //Get that node and perform surgery on it
      conversation.find({ query: { 'id':nid, skippop:true } })
        .then ((response) => {
          var child = response.data[0]
          const oldType = child.type+'s'
          console.info('CNT-Child', JSON.stringify(child))
/*
{"id":"9a21ed84-b66a-4a87-9f33-c65a21a39b6d","label":"Why is the sky blue?","details":"","url":"","creator":"Uyrena5iH2SGdvPY","handle":"sue","date":"2018-07-24T23:56:06.603Z",
"type":"answer",
"img":"statics/images/ibis/position.png",
"imgsm":"statics/images/ibis/position_sm.png",
"parentId":"bb86153f-6d50-4526-bc10-28f0731d7278","parentLabel":"Jim's Second Quest","_id":"DRWKPMobqL9YscSw"}
*/
          child.type = choice
          child.img = this.getLargeIcon(choice)
          child.imgsm = this.getSmallIcon(choice)
          console.info('CNT-Child-2', JSON.stringify(child))
/*
{"id":"9a21ed84-b66a-4a87-9f33-c65a21a39b6d","label":"Why is the sky blue?","details":"","url":"","creator":"Uyrena5iH2SGdvPY","handle":"sue","date":"2018-07-24T23:56:06.603Z",
"type":"question",
"img":"statics/images/ibis/issue.png",
"imgsm":"statics/images/ibis/issue_sm.png","parentId":"bb86153f-6d50-4526-bc10-28f0731d7278","parentLabel":"Jim's Second Quest","_id":"DRWKPMobqL9YscSw"}
*/          
          const parentId = child.parentId
          conversation.update(child.id, child)
            .then((resp) => {
              if (parentId) {
                conversation.find({ query: { 'id':parentId, skippop:true } })
                  .then ((response2) => {
                    console.info('XXX', parentId, response2)
                    const parent = response2.data[0]
                    console.info('CNT-Parent', JSON.stringify(parent))
/*
{"id":"e64d7264-6a31-44a3-9a99-84ebc904a382","type":"map","label":"Test  Quest","url":"","details":"","img":"statics/images/ibis/map.png","imgsm":"statics/images/ibis/map_sm.png","creator":"Uyrena5iH2SGdvPY","handle":"sue","date":"2018-07-25T00:52:29.998Z",
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
{"id":"e64d7264-6a31-44a3-9a99-84ebc904a382","type":"map","label":"Test  Quest","url":"","details":"","img":"statics/images/ibis/map.png","imgsm":"statics/images/ibis/map_sm.png","creator":"Uyrena5iH2SGdvPY","handle":"sue","date":"2018-07-25T00:52:29.998Z",
"answers":[],"_id":"B48n0KwxK1y7CXyV",
"questions":["72d22096-aef8-4e89-9f6d-ddaffd80dc36"]}*/                    
                    conversation.update(parent.id, parent)
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
