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
          <table style="float:left;">
            <tr>
              <th class="hiddencolumn">foo</th>
              <th class="hiddencolumn">foo</th>
              <th class="hiddencolumn">foo<th>
              <th class="hiddencolumn">foo</th>
            </tr>
            <tr>
              <td class="datacolumn" v-for="question in questions" :key="question.id">
            <div class="node">
              <a style="margin-left:4px;" v-on:click="doClick(question.id)">{{ question.label }}</a>
            </div>
              </td>
              <td class="datacolumn" v-for="answer in answers" :key="answer.id">
            <div class="node">
              <a style="margin-left:4px;" v-on:click="doClick(answer.id)">{{ answer.label }}</a>
            </div>
              </td>
              <td class="datacolumn" v-for="pro in pros" :key="pro.id">
            <div class="node">
              <a style="margin-left:4px;" v-on:click="doClick(pro.id)">{{ pro.label }}</a>
            </div>
              </td>
              <td class="datacolumn" v-for="con in cons" :key="con.id">
            <div class="node">
              <a style="margin-left:4px;" v-on:click="doClick(con.id)">{{ con.label }}</a>
            </div>
              </td>
            </tr>
          </table>
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
    showLists: function () {
      var msg = 'SL ' + JSON.stringify(this.questions) + '\n' +
      JSON.stringify(this.answers) + '\n' +
      JSON.stringify(this.pros) + '\n' +
      JSON.stringify(this.cons)
      alert(msg)
    },
    setQuestions: function (data) {
      if (data) {
        alert('SQ ' + JSON.stringify(data))
        this.questions = data
      }
    },
    setAnswers: function (data) {
      if (data) {
        alert('SA ' + JSON.stringify(data))
        this.answers = data
      }
    },
    setPros: function (data) {
      if (data) {
        alert('SP ' + JSON.stringify(data))
        this.pros = data
      }
    },
    setCons: function (data) {
      if (data) {
        alert('SC ' + JSON.stringify(data))
        this.cons = data
      }
    },
    doClick: function (id) {
      // alert('ClICKED ' + id)
      conversation.find({ query: { 'id': id } })
        .then((response) => {
          var x = response.data[0]
          // alert('F ' + JSON.stringify(x))
          this.label = x.label
          this.details = x.details
          this.image = x.img
          this.pid = x.id
          this.ptype = x.type
          this.parentLabel = x.parentLabel
          var self = this
          this.populateChildList(conversation, x.questions, function (data) {
            self.setQuestions(data)
            self.populateChildList(conversation, x.answers, function (data) {
              self.setAnswers(data)
              self.populateChildList(conversation, x.pros, function (data) {
                self.setPros(data)
                self.populateChildList(conversation, x.cons, function (data) {
                  self.setCons(data)
                })
              })
            })
            self.showLists()
          })
        })
    },

    recursiveFetch: function (service, nodeList, cursor, result, callback) {
      // alert(JSON.stringify(nodeList) + ' ' + cursor + ' ' + JSON.stringify(result))
      var jsonQuery = {}
      var idq = {}
      idq.id = nodeList[cursor++]
      jsonQuery.query = idq
      // alert('Q ' + JSON.stringify(jsonQuery))
      service.find(jsonQuery)
        .then((response) => {
          var x = response.data[0]
          // alert('L ' + JSON.stringify(x))
          result.push(x)
          if (nodeList.length === cursor) {
            // alert('R ' + JSON.stringify(result))
            return callback(result)
          } else {
            this.recursiveFetch(service, nodeList, cursor, result, callback)
          }
        })
    },
    populateChildList: function (service, nodeList, callback) {
      // alert(JSON.stringify(nodeList))
      var result = []
      if (!nodeList) {
        return callback(result)
      }
      this.recursiveFetch(service, nodeList, 0, result, function (data) {
        // alert('R2 ' + JSON.stringify(data))
        return callback(data)
      })
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
        var self = this
        var x = response.data[0]
        // alert(JSON.stringify(x))
        this.$data.label = x.label
        this.$data.details = x.details
        this.$data.image = x.img
        this.$data.pid = x.id
        this.$data.ptype = x.type
        this.$parentLabel = x.parentLabel
        // alert('A ' + this.$data.label)
        this.populateChildList(conversation, x.questions, function (data) {
          self.setQuestions(data)
          // self.showLists()
          self.populateChildList(conversation, x.answers, function (data) {
            self.setAnswers(data)
            // self.showLists()
            self.populateChildList(conversation, x.pros, function (data) {
              self.setPros(data)
              // self.showLists()
              self.populateChildList(conversation, x.cons, function (data) {
                self.setCons(data)
                // self.showLists()
              })
            })
          })
        })
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
  min-width: 270px;
  max-width: 270px;
  background: white;
  overflow-x: hidden;
  overflow-y: scroll;
  break-inside: avoid;
  margin-left: 4px;
  margin-right: 4px;
}

.hiddencolumn {
  height: 2px;
  float:left;
  width: 270px;
  visibility: hidden;
}

.datacontainer {
  width: 1200px;
}

.headerimage {
  float: left;
  vertical-align: middle;
  margin-right: 4px;
}

.blanknode {
  visibility: hidden;
  width: 270px;
  height: 2p;
}
.node {
  margin-top: 4px;
  float: top;
  border: 1px solid black;
  border-radius: 3px;
  min-height: 40px;
  width: 270px;
  word-wrap: break-word;
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
