<template>
  <q-page :padding="true" v-if="!!q">

    <div  id="topbox">
      <span style="float:right; font-size:small;"><a :href="`/userview/${q.creator}`">{{q.handle}}</a> {{q.date}}</span>
      <h4><img style="margin-right:4px;" :src="q.img">{{ q.label }}</h4>
      <span v-if="q.url"><b>URL:</b> <a :href="q.url">{{ q.url}}</a><br/><br/></span>
      <!-- parent refers to type, this node being an instanceOf type -->
      <span v-if="q.parentLabel"><b>Responds to </b>
        <router-link :to="{ name: 'questview', params: { id: q.parentId }}">{{ q.parentLabel }}</router-link>
      </span>
      <!-- TODO enumerate superclasses if any -->
      <hr/>
      <div class="details">
        <div  v-html="q.details"></div>
      </div>
    </div>
    <!-- Edit and other controls go here -->
    <router-link 
      v-if="canEdit" 
      style="margin-left:20px;" 
      :to="{ name: 'nodeupdate', params: { type: 'update', id: q.nodeId }}"
    >
      <b>Edit This Node</b>
    </router-link>
    <span v-if="isRelation" style="margen-left:20px;">
      <br/>
      <b style="margin-left:20px;">Source Node </b> <router-link :to="{ name: 'questview', params: { id: q.sourceNode }}">{{ q.sourceLabel }}</router-link>
        <br/>
      <b style="margin-left:20px;">Target Node </b> <router-link :to="{ name: 'questview', params: { id: q.targetNode }}">{{ q.targetLabel }}</router-link>
    </span>
    <!-- What follows is any child nodes and tags around this topic -->
    <q-list>
      <q-collapsible image="statics/images/issue_sm.png" label="Questions" >
        <div>
          <div v-if="isAuthenticated" class="node">
            <a :href="`/nodeedit/question/${q.type}/${q.nodeId}/${q.label}`">
              New Question</a>
          </div>
          <q-list>
            <q-item class="node wordwrap" v-for="question in q.questions" :key="question.nodeId">
              <router-link :to="{ name: 'questview', params: { id: question.nodeId }}">{{ question.label }}</router-link>
            </q-item>
          </q-list>
        </div>
      </q-collapsible>
      <q-collapsible image="statics/images/position_sm.png" label="Answers"      >
        <div>
          <div v-if="isAuthenticated" class="node">
            <a :href="`/nodeedit/answer/${q.type}/${q.nodeId}/${q.label}`">
              New Answer</a>
          </div>
        </div>
        <q-list>
          <q-item class="node" v-for="answer in q.answers" :key="answer.nodeId">
            <router-link :to="{ name: 'questview', params: { id: answer.nodeId }}">{{ answer.label }}</router-link>
          </q-item>
        </q-list>
      </q-collapsible>
      <q-collapsible image="statics/images/plus_sm.png" label="Pro Arguments">
        <div>
          <div v-if="isAuthenticated" class="node">
            <a :href="`/nodeedit/pro/${q.type}/${q.nodeId}/${q.label}`">
              New Pro Argument</a>
          </div>
        </div>
        <q-list>
          <q-item class="node" v-for="pro in q.pros" :key="pro.nodeId">
            <router-link :to="{ name: 'questview', params: { id: pro.nodeId }}">{{ pro.label }}</router-link>
          </q-item>
        </q-list>
      </q-collapsible>
      <q-collapsible image="statics/images/minus_sm.png" label="Con Arguments">
        <div>
          <div v-if="isAuthenticated" class="node">
            <a :href="`/nodeedit/con/${q.type}/${q.nodeId}/${q.label}`">
              New Con Argument</a>
          </div>
        </div>
        <q-list>
          <q-item class="node" v-for="con in q.cons" :key="con.nodeId">
            <router-link :to="{ name: 'questview', params: { id: con.nodeId }}">{{ con.label }}</router-link>
          </q-item>
        </q-list>
      </q-collapsible>
      <q-collapsible v-if="isTopic" image="statics/images/cogwheel_sm.png" label="Subclasses">
        <div>
          <div v-if="isAuthenticated" class="node">
            <a :href="`/topicchild/${q.nodeId}/subclass`">
              New Subclass Topic</a>
          </div>
        </div>
        <q-list>
          <q-item class="node" v-for="sub in q.subclasses" :key="sub.nodeId">
            <router-link :to="{ name: 'topicview', params: { id: sub.nodeId }}">{{ sub.label }}</router-link>
          </q-item>
        </q-list>
      </q-collapsible>
      <q-collapsible v-if="isTopic" image="statics/images/cogwheel_sm.png" label="Instances">
        <div>
          <div v-if="isAuthenticated" class="node">
            <a :href="`/topicchild/${q.nodeId}/instance`">
              New Instance Topic</a>
          </div>
        <q-list>
          <q-item class="node" v-for="inst in q.instances" :key="inst.nodeId">
            <router-link :to="{ name: 'topicview', params: { id: inst.nodeId }}">{{ inst.label }}</router-link>
          </q-item>
        </q-list>
        </div>
      </q-collapsible>
      <q-collapsible image="statics/images/tag_sm.png" label="Tags">
        <div>
          <div v-if="isAuthenticated" class="node">
            <a :href="`/tagform/${q.nodeId}`">
              Add Tags</a>
          </div>
        </div>
        <q-list>
          <q-item class="node" v-for="tag in q.tags" :key="tag.nodeId">
            <router-link :to="{ name: 'tagview', params: { id: tag.nodeId }}">{{ tag.label }}</router-link>
          </q-item>
        </q-list>
      </q-collapsible>
      <q-collapsible image="statics/images/link_sm.png" label="Connections">
        <div>
          <div>
            <div v-if="isAuthenticated" class="node">
              <a :href="`/connedit/${q.nodeId}/${q.label}`">
                New Connection</a>
            </div>
          </div>
          <q-list>
            <q-item class="node" v-for="reln in q.relations" :key="reln.nodeId">
              <router-link :to="{ name: 'topicview', params: { id: reln.nodeId}}">{{ reln.label }}</router-link>
            </q-item>
          </q-list>
        </div>
      </q-collapsible>
    </q-list>    


  </q-page>
</template>
<script>
import api from 'src/api'
import { mapGetters, mapActions, mapMutations } from "vuex";
const treeview = api.service('tree-view')
console.log('QVTV', treeview)
export default {
  data () {
    return {
      rightDrawerOpen: this.$q.platform.is.desktop//,
    }
  },
    beforeRouterUpdate () {
      alert('Tsx')
      console.info('Router', 'start')
      setTimeout(() => {
        this.initialize.apply(this).then(() => {
          console.info('Router', 'done')
        })
      }, 500)
    },
    mounted () {
      const id = this.$route.params.id
      this.$data.rightDrawerOpen = false
      //turn off conversation tree
      this.$store.commit('questView', false)

      const self = this
      try {
        //TODO treeview must look for 'topic' 
        // rather than 'map' to paint a tree view
        treeview.get(id)
          .then(function (tree) {
            console.info('TopicTreeView', tree)
            const img = tree.img
            // only show the tree if the root is a map
            if (img === 'statics/images/map_sm.png' ||
                img === 'statics/images/bookmark_sm.png') {
              const result = []
              result.push(tree)
              self.$store.commit('tree', result)
            }
          })     
      } catch (err) {
        console.log('QuestViewTreeError', err)
      }
      this.initialize()
    },
    watch: {
      '$route' (to, from) {
        console.info('Going ',from,'to',to)
        try {
          const { name, params: { id } } = to
          if (name === 'topicview' || name === 'questview' && id) {
            this.initialize(id);
          }

        } catch (e) {
          console.error(e)
        }
        // react to route changes...
      }
    },
    methods: {
      // Pass id, or it will take it from current $route context
      async initialize (id = null) {
        this.$store.commit('questView', true)
        console.info('QV-1', id)
        const nodeId = id || this.$route.params.id
        console.info('Initialize', 'fetching data for ', nodeId)
        try {
          const result = await this.findConversations({
            query: { nodeId },
            depth: 1
          });
          console.info("Initialize", "result", { result });
          const {
            data: [single]
          } = result;

          this.setCurrentConversation(single);
          console.info("Initialize", "fetching data for ", nodeId, "success");
          console.info("SINGLE", JSON.stringify(single));
        } catch (e) {
          console.info("Initialize", "fetching data for ", nodeId, "error", e);
        }
      },
      ...mapActions("conversation", { findConversations: "find" }),
      ...mapMutations("conversation", { setCurrentConversation: "setCurrent" })

    },
    computed: {
      ...mapGetters({q: 'conversation/current'}),
      isAuthenticated () {
        return this.$store.getters.isAuthenticated
      },
      isRelation () {
        return (this.q.type === 'relation')
      },
      isTopic (){
        return (this.q.type === 'topic')
      },
      notTopic (){
        return (this.q.type !== 'topic')
      },
      canEdit () {
        let result = this.$store.getters.isAdmin
        console.info('CE-1', result)
        let cid
        let uid
        let usx = this.$store.getters.user
        if (usx) {
          cid = this.$store.getters.node.creator
          uid = usx._id
        }
        console.info('CE-2', cid, uid)
        if (result) {
          return result
        } else if (!usx) {
          return false
        } else if (cid === uid) {
          return true
        } else {
          return false
        }
      }
    }
  }

</script>

<style lang="styl">
.scroll.relative-position.overflow-hidden.fit.q-touch {
  user-select: auto !important;
}


.details {
  max-width: 960px;
  height: 400px;
  overflow: auto;
  overflow-wrap: normal;
}
.spanwrap {
  float: left;
  word-wrap: normal;
  white-space: normal;
  overflow-wrap: inherit;
}
/**
 * Enable columns to scroll right and left
 */
.columnscroller {
  border: 1px solid black;
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
  width: 2300px;
  -webkit-column-count: 8;
     -moz-column-count: 8;
          column-count: 8;
}
.columncontainer6 {
  width: 2200;
  -webkit-column-count: 8;
     -moz-column-count: 8;
          column-count: 8;
}

.columnx {
  float: left;
  white-space: normal;
  border: 1px solid black;
  width: 270px;
  height: 34px;
  background: rgb(240, 234, 234);
  border-radius: 3px;
  margin-left: 4px;
  margin-right: 4px;
  font-family: pragmatica-web, sans-serif;
}
.datacolumn {
  height: 400px;
  float: left;
  border: 1px solid white;
  min-width: 270px;
  max-width: 270px;
  background: white;
  overflow-x: hidden;
  overflow-y: scroll;
  break-inside: avoid;
  margin-left: 4px;
  margin-right: 4px;
  overflow-wrap: normal;
  /*width: 960;*/
  }

.datacontainer6 {
  width: 2200px;
    -webkit-column-count: 6;
     -moz-column-count: 6;
          column-count: 6;
}
.datacontainer {
  width: 2300px;
    -webkit-column-count: 8;
     -moz-column-count: 8;
          column-count: 8;

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
  overflow-wrap: inherit;
  font-family: pragmatica-web, sans-serif;
  white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  white-space: pre-wrap; /* css-3 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
  white-space: -webkit-pre-wrap; /* Newer versions of Chrome/Safari*/
  white-space: normal;
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
  font-family: pragmatica-web, sans-serif;
  border-radius: 3px;
}
</style>
