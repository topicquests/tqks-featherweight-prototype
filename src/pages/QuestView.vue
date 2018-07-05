<template>
    <q-page v-if="!!q">
      <div  id="topbox">
        <h4><img style="margin-right:4px;" :src="q.img">{{ q.label }}</h4>
        <span v-if="q.parentLabel"><b>Responds to </b>
          <router-link :to="{ name: 'questview', params: { id: q.id }}">{{ q.parentLabel }}</router-link>
        </span>
        <hr/>
        <q-scroll-area style="width: 960px; height: 400px;">
          <span v-html="q.details"></span>
        </q-scroll-area>
      </div>
      <div class="columnscroller">
        <div class="columncontainer">
          <div class="columnx" style="text-align: center;">
                <img class="headerimage" src="statics/images/ibis/issue.png">Questions
                <a v-if="isAuthenticated" :href="`/index.html#/nodeedit/question/question/${q.id}/${q.label}`">
                <img class="respond" src="statics/images/respond_sm.png"></a>
          </div>
          <div class="columnx" style="text-align: center;">
                <img class="headerimage" src="statics/images/ibis/position.png">Ideas
                <a v-if="isAuthenticated" :href="`/index.html#/nodeedit/answer/${q.type}/${q.id}/${q.label}`">
                <img class="respond" src="statics/images/respond_sm.png"></a>
          </div>
          <div class="columnx" style="text-align: center;">
                <img class="headerimage" src="statics/images/ibis/plus.png">Pro
                <a v-if="isAuthenticated" :href="`/index.html#/nodeedit/pro/${q.type}/${q.id}/${q.label}`">
                <img class="respond" src="statics/images/respond_sm.png"></a>
          </div>
          <div class="columnx" style="text-align: center;">
                <img class="headerimage" src="statics/images/ibis/minus.png">Con
                <a v-if="isAuthenticated" :href="`/index.html#/nodeedit/con/${q.type}/${q.id}/${q.label}`">
                <img class="respond" src="statics/images/respond_sm.png"></a>
          </div>
        </div>
        <div class="datacontainer">
          <q-list class="datacolumn">
            <q-item class="node" v-for="question in q.questions" :key="question.id">
              <router-link :to="{ name: 'questview', params: { id: question.id }}">{{ question.label }}</router-link>
          </q-item>
          </q-list>
          <q-list class="datacolumn">
            <q-item class="node" v-for="answer in q.answers" :key="answer.id">
              <router-link :to="{ name: 'questview', params: { id: answer.id }}">{{ answer.label }}</router-link>
            </q-item>
          </q-list>
          <q-list class="datacolumn">
            <q-item class="node" v-for="pro in q.pros" :key="pro.id">
              <router-link :to="{ name: 'questview', params: { id: pro.id }}">{{ pro.label }}</router-link>
            </q-item>
          </q-list>
          <q-list class="datacolumn">
            <q-item class="node" v-for="con in q.cons" :key="con.id">
              <router-link :to="{ name: 'questview', params: { id: con.id }}">{{ con.label }}</router-link>
          </q-item>
          </q-list>
          </div>
        </div>

    </q-page>
</template>
<script>
import api from 'src/api'
import { mapGetters } from 'vuex';
var conversation
export default {
  props: [ 'user' ],
    beforeRouterUpdate () {
      alert('Ssx')
      console.info('Router', 'start')
      setTimeout(() => {
        this.initialize.apply(this).then(() => {
          console.info('Router', 'done')
          // next()
        })
      }, 500)
    },
    mounted () {
      this.initialize()
    },
    watch: {
      '$route' (to, from) {
        console.info('Going ',from,'to',to);
        try {
          const { name, params: {id} } = to;
          if (name === 'questview' && id) {
            this.initialize(id);
          }

        } catch (e) {

        }
        // react to route changes...
      }
    },
    methods: {
      // Pass id, or it will take it from current $route context
      async initialize (id = null) {
          id = id || this.$route.params.id;
          console.info('Initialize', 'fetching data for ', id);
          try {
            // const results = await this.$store.dispatch('quests/find', {query: { id }});
            // const { data: [ { _id } ] } = results;
            const single = await this.$store.dispatch('quests/get', [id, { depth: 1 }]);
            console.info('Initialize', 'fetching data for ', id, 'success');
          } catch (e) {
            console.info('Initialize', 'fetching data for ', id, 'error', e);
          }
      }
    },

    computed: {
      ...mapGetters({q: 'quests/current'}),
      isAuthenticated () {
        return this.$store.getters.isAuthenticated
      }
      // questState: {
      //   // THEORY
      //   //  This fires first to load the page
      //   //  The rest must wait for that to finish
      //   //  TODO figure out how to make that work
      //   thePage () {
      //     return this.$store.getters.thePage(this.$route.params.id)
      //   },
      //   // ...mapGetters ([
      //   //   image,
      //   //   label,
      //   //   details,
      //   //   parentLabel,
      //   //   ptype,
      //   //   pid
      //   // ]),
      //   isAuthenticated () {
      //     return this.$store.getters.isAuthenticated
      //   }
      // }
    }
  }


/**
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
    initialize () {
      return new Promise((resolve, reject) => {
        console.info('Initialize', 'start')
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
              self.populateChildList(conversation, x.answers, function (data) {
                self.setAnswers(data)
                self.populateChildList(conversation, x.pros, function (data) {
                  self.setPros(data)
                  self.populateChildList(conversation, x.cons, function (data) {
                    self.setCons(data)
                    console.info('Initialize', 'done')
                    resolve()
                  })
                })
              })
            })
          })
      })
    },
    setQuestions: function (data) {
      // alert('SQ ' + JSON.stringify(data))
      if (data) {
        this.questions = data
      }
    },
    setAnswers: function (data) {
      // alert('SA ' + JSON.stringify(data))
      if (data) {
        this.answers = data
      }
    },
    setPros: function (data) {
      // alert('SP ' + JSON.stringify(data))
      if (data) {
        this.pros = data
      }
    },
    setCons: function (data) {
      // alert('SC ' + JSON.stringify(data))
      if (data) {
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
          })
          // this.questions = this.populateChildList(conversation, x.questions)
          // this.answers = this.populateChildList(conversation, x.answers)
          // this.pros = this.populateChildList(conversation, x.pros)
          // this.cons = this.populateChildList(conversation, x.cons)
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
  beforeRouterUpdate () {
    console.info('Router', 'start')
    setTimeout(() => {
      this.initialize.apply(this).then(() => {
        console.info('Router', 'done')
        // next()
      })
    }, 500)
  },
  mounted () {
    alert('Mounted')
    this.initialize()
  }
}
*/
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
