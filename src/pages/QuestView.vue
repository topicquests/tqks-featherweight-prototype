<template>
    <q-page>
      <div id="topbox">
        <h4><img style="margin-right:4px;" :src="image">{{ label }}</h4>
        <span v-if="parentLabel"><b>Responds to </b>
          <a v-on:click="doClick(pid)">{{ parentLabel }}</a>
        </span>
        <hr/>
        <q-scroll-area style="width: 960px; height: 400px;">
          <span v-html="details"></span>
        </q-scroll-area>
      </div>
      <div class="columnscroller">
        <div class="columncontainer">
          <div class="columnx" style="text-align: center;">
                <img class="headerimage" src="statics/images/ibis/issue.png">Questions
                <a v-if="isAuthenticated" :href="`/index.html#/nodeedit/question/${ptype}/${pid}/${label}`">
                <img class="respond" src="statics/images/respond_sm.png"></a>
          </div>
          <div class="columnx" style="text-align: center;">
                <img class="headerimage" src="statics/images/ibis/position.png">Ideas
                <a v-if="isAuthenticated" :href="`/index.html#/nodeedit/answer/${ptype}/${pid}/${label}`">
                <img class="respond" src="statics/images/respond_sm.png"></a>
          </div>
          <div class="columnx" style="text-align: center;">
                <img class="headerimage" src="statics/images/ibis/plus.png">Pro
                <a v-if="isAuthenticated" :href="`/index.html#/nodeedit/pro/${ptype}/${pid}/${label}`">
                <img class="respond" src="statics/images/respond_sm.png"></a>
          </div>
          <div class="columnx" style="text-align: center;">
                <img class="headerimage" src="statics/images/ibis/minus.png">Con
                <a v-if="isAuthenticated" :href="`/index.html#/nodeedit/con/${ptype}/${pid}/${label}`">
                <img class="respond" src="statics/images/respond_sm.png"></a>
          </div>
        </div>

        <div class="datacontainer">
          <q-list class="datacolumn" v-for="question in questions" :key="question.id">
            <q-item class="node">
              <a style="margin-left:4px;" v-on:click="doClick(question.id)">{{ question.label }}</a>
            </q-item>
          </q-list>
          <q-list class="datacolumn" v-for="answer in answers" :key="answer.id">
            <q-item class="node">
              <a style="margin-left:4px;" v-on:click="doClick(answer.id)">{{ answer.label }}</a>
            </q-item>
          </q-list>
          <q-list class="datacolumn" v-for="pro in pros" :key="pro.id">
            <q-item class="node">
              <a style="margin-left:4px;" v-on:click="doClick(pro.id)">{{ pro.label }}</a>
            </q-item>
          </q-list>
          <q-list class="datacolumn" v-for="con in cons" :key="con.id">
            <q-item class="node">
              <a style="margin-left:4px;" v-on:click="doClick(con.id)">{{ con.label }}</a>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-page>
</template>
<script>
import api from 'src/api'
var conversation
export default {
  props: [ 'user' ],
  data () {
    return {
      isAuthenticated: false,
      image: '',
      label: '',
      pid: '',
      parentLabel: '',
      ptype: '',
      details: '',
      questions: [],
      answers: [],
      pros: [],
      cons: []
    }
  },
  methods: {
    doClick: function (id) {
      // alert('ClICKED ' + id)
      conversation.find({ query: { 'id': id } })
        .then((response) => {
          var x = response.data[0]
          // alert('F ' + JSON.stringify(x))
          this.$data.label = x.label
          this.$data.details = x.details
          this.$data.image = x.img
          this.$data.pid = x.id
          this.$data.ptype = x.type
          this.$data.parentLabel = x.parentLabel
          try {
            this.$data.questions = this.populateChildList(conversation, x.questions)
            this.$data.answers = this.populateChildList(conversation, x.answers)
            this.$data.pros = this.populateChildList(conversation, x.pros)
            this.$data.cons = this.populateChildList(conversation, x.cons)
          } catch (er) {
            alert('ERROR ' + er)
          }
        })
    },
    loadNode: function (service, jsonQuery, callback) {
      // alert(JSON.stringify(jsonQuery))
      service.find(jsonQuery)
        .then((response) => {
          var x = response.data[0]
          // alert(JSON.stringify(x))
          return callback(x)
        })
        .catch((error) => {
          alert('LOADERROR ' + error)
          console.log(error)
          return null
        })
    },
    populateChildList: function (service, nodeList) {
      var result = []
      var jsonQuery = {}
      var idq = {}
      for (var id in nodeList) {
        idq.id = nodeList[id]
        jsonQuery.query = idq
        this.loadNode(service, jsonQuery, function (data) {
          if (data) {
            result.push(data)
          }
        })
      }
      // alert('RETURNING ' + result)
      return result
    }
  },
  mounted () {
    if (this.user) {
      this.$data.isAuthenticated = true
    }
    const id = this.$route.params.id
    const quests = api.service('quests')
    conversation = api.service('conversation')
    quests.find({ query: { 'id': id } })
      .then((response) => {
        var x = response.data[0]
        this.$data.label = x.label
        this.$data.details = x.details
        this.$data.image = x.img
        this.$data.pid = x.id
        this.$data.ptype = x.type
        this.$parentLabel = x.parentLabel
        this.$data.questions = this.populateChildList(conversation, x.questions)
        this.$data.answers = this.populateChildList(conversation, x.answers)
        this.$data.pros = this.populateChildList(conversation, x.pros)
        this.$data.cons = this.populateChildList(conversation, x.cons)
      })
  }
}
</script>

<style>
/**
 * Enable columns to scroll right and left
 */
.columnscroller {
  border: 1px solid black;
  width: 960;
  white-space:nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  margin: 12px;
  border-radius: 3px;
}

/**
 * width is set to accomodate lots of columns.
 * If they wrap when adding more columns, then
 * width must increase.
 * The formula seems to be column width * num colums + 100px  2500
 */
.columncontainer {
  width: 1200px;
}

.columnx {
  float:left;
  white-space:normal;
  border: 1px solid black;
  width: 270px;
  height: 34px;
  background: rgb(240, 234, 234);
  border-radius: 3px;
  margin-left: 4px;
  margin-right: 4px;
  font-family:pragmatica-web,sans-serif;
}
.datacolumn {
  height: 400px;
  float:left;
  border: 1px solid white;
  width: 270px;
  background: white;
  overflow-x: hidden;
  overflow-y: scroll;
  break-inside: avoid;
  margin-left: 4px;
  margin-right: 4px;
}

.datacontainer {
  width: 1200px;
}

.headerimage {
  float: left;
  vertical-align: middle;
  margin-right: 4px;
}

.node {
  margin-top: 4px;
  float: top;
  border: 1px solid black;
  border-radius: 3px;
  min-height: 40px;
  word-wrap: normal;
  font-family:pragmatica-web,sans-serif;
}
.node:hover {
  background-color: rgba(255, 255, 0, 0.801);
}

.respond {
  float: right;
  margin-right: 4px;
}
/*
 * width: 958px;
 */
#topbox {
  border: 1px solid black;
  background: white;
  margin: 12px;
  font-family:pragmatica-web,sans-serif;
  border-radius: 3px;
}
</style>
