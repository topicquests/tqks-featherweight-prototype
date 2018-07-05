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
              <a v-if="isAuthenticated" :href="`/index.html#/nodeedit/question/${q.type}/${q.id}/${q.label}`">
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
// var conversation
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
            const single = await this.$store.dispatch('conversation/get', [id, { depth: 1 }]);
            console.info('Initialize', 'fetching data for ', id, 'success');
          } catch (e) {
            console.info('Initialize', 'fetching data for ', id, 'error', e);
          }
      }
    },

    computed: {
      ...mapGetters({q: 'conversation/current'}),
      isAuthenticated () {
        return this.$store.getters.isAuthenticated
      }
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
