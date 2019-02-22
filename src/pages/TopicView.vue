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
      <q-scroll-area class="details">
        <div  v-html="q.details"></div>
      </q-scroll-area>
    </div>
    <!-- Edit and other controls go here -->
    <router-link v-if="canEdit" style="margin-left:20px;" :to="{ name: 'nodeupdate', params: { type: 'update', id: q.id }}"><b>Edit This Node</b></router-link>
    <span v-if="isRelation" style="margen-left:20px;">
      <b>Source Node</b> <router-link :to="{ name: 'questview', params: { id: q.sourceNode.nodeId }}">{{ q.theSource.label }}</router-link>
        <br/>
      <b>Target Node</b> <router-link :to="{ name: 'questview', params: { id: q.targetNode.nodeId }}">{{ q.theTarget.label }}</router-link>
    </span>
    <!-- What follows is any child nodes and tags around this topic -->
    
    <div class="columnscroller">
      <div class="columncontainer">
        <div class="columnx" style="text-align: center;">
          <img class="headerimage" src="statics/images/ibis/issue.png">Questions
          <a v-if="isAuthenticated" :href="`/nodeedit/question/${q.type}/${q.id}`">
          <img class="respond" src="statics/images/respond_sm.png"></a>
        </div>
        <div class="columnx" style="text-align: center;">
          <img class="headerimage" src="statics/images/ibis/position.png">Answers/Ideas
          <a v-if="isAuthenticated" :href="`/nodeedit/answer/${q.type}/${q.id}`">
          <img class="respond" src="statics/images/respond_sm.png"></a>
        </div>
        <div class="columnx" style="text-align: center;">
          <img class="headerimage" src="statics/images/ibis/plus.png">Pro
          <a v-if="isAuthenticated" :href="`/nodeedit/pro/${q.type}/${q.id}`">
          <img class="respond" src="statics/images/respond_sm.png"></a>
        </div>
        <div class="columnx" style="text-align: center;">
              <img class="headerimage" src="statics/images/ibis/minus.png">Con
              <a v-if="isAuthenticated" :href="`/nodeedit/con/${q.type}/${q.id}`">
              <img class="respond" src="statics/images/respond_sm.png"></a>
        </div>
        <div class="columnx" style="text-align: center;">
          <img class="headerimage" src="statics/images/cogwheel.png">Subclasses
          <a v-if="isAuthenticated" :href="`/topicchild/${q.id}/subclass`">
          <img class="respond" src="statics/images/respond_sm.png"></a>
        </div>
        <div class="columnx" style="text-align: center;">
          <img class="headerimage" src="statics/images/cogwheel.png">Instances
          <a v-if="isAuthenticated" :href="`/topicchild/${q.id}/instance`">
          <img class="respond" src="statics/images/respond_sm.png"></a>
        </div>
        <div class="columnx" style="text-align: center;">
          <img class="headerimage" src="statics/images/tag.png">Tags
          <a v-if="isAuthenticated" :href="`/tagform/${q.id}`">
          <img class="respond" src="statics/images/respond_sm.png"></a>
        </div>
        <div class="columnx" style="text-align: center;">
              <img class="headerimage" src="statics/images/link.png">Connections
              <a v-if="isAuthenticated" :href="`/connectionform/${q.id}/${q.label}`">
              <img class="respond" src="statics/images/respond_sm.png"></a>
        </div>
      </div>
      <div class="datacontainer">
        <q-list class="datacolumn">
          <q-item class="node wordwrap" v-for="question in q.questions" :key="question.id">
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
        <q-list class="datacolumn">
          <q-item class="node" v-for="sub in q.subclasses" :key="sub.id">
            <router-link :to="{ name: 'topicview', params: { id: sub.id }}">{{ sub.label }}</router-link>
          </q-item>
        </q-list>
        <q-list class="datacolumn">
          <q-item class="node" v-for="inst in q.instances" :key="inst.id">
            <router-link :to="{ name: 'topicview', params: { id: inst.id }}">{{ inst.label }}</router-link>
          </q-item>
        </q-list>
        <q-list class="datacolumn">
          <q-item class="node" v-for="tag in q.tags" :key="tag.id">
            <router-link :to="{ name: 'tagview', params: { id: tag.id }}">{{ tag.label }}</router-link>
          </q-item>
        </q-list>
        <q-list class="datacolumn">
          <q-item class="node" v-for="reln in q.relations" :key="reln.id">
            <router-link :to="{ name: 'topicview', params: { id: reln.id}}">{{ reln.label }}</router-link>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>
<script>
import api from 'src/api'
import { mapGetters } from 'vuex'
const treeview = api.service('tree-view')
console.log('QVTV', treeview)
export default {
  data () {
    return {
      rightDrawerOpen: this.$q.platform.is.desktop,
      isRelation: false
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
      const self = this
      try {
        //TODO treeview must look for 'topic' 
        // rather than 'map' to paint a tree view
        treeview.get(id)
          .then(function (tree) {
            console.info('TopicTreeView', tree)
            const img = tree.img
            // only show the tree if the root is a map
            if (img === 'statics/images/ibis/map_sm.png' ||
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
          if (name === 'topicview' && id) {
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
        id = id || this.$route.params.id
        console.info('Initialize', 'fetching data for ', id)
        try {
          const single = await this.$store.dispatch('conversation/get', [id, { depth: 1 }])
          console.info('Initialize', 'fetching data for ', id, 'success')
          console.info('SINGLE', JSON.stringify(single))
          this.$data.isRelation = (this.$q.type === 'relation') //TODO check this
        } catch (e) {
          console.info('Initialize', 'fetching data for ', id, 'error', e)
        }
      }
    },
    computed: {
      ...mapGetters({q: 'conversation/current'}),
      isAuthenticated () {
        return this.$store.getters.isAuthenticated
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
 * Lives inside #columnscroller which defaults to the parent width
 * The formula seems to be column width * num colums + 100px
 */
.columncontainer {
 width: 2000px;
}

/** 
 * Individual columns
 */
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
  overflow-wrap: normal;
}

.datacontainer {
  width: 100%;
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
  font-family:pragmatica-web,sans-serif;
  white-space: -moz-pre-wrap !important;  /* Mozilla, since 1999 */
  white-space: -pre-wrap;      /* Opera 4-6 */
  white-space: -o-pre-wrap;    /* Opera 7 */
  white-space: pre-wrap;       /* css-3 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */
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
 * 
 */
#topbox {
  border: 1px solid black;
  background: white;
  margin: 12px;
  font-family:pragmatica-web,sans-serif;
  border-radius: 3px;
}
</style>
