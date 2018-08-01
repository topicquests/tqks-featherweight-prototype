<template>
    <q-page :padding="true">
      <h4><img style="margin-right:4px;" src="statics/images/tag.png">New Tag</h4>
      <div id="newtagview">
        <div id="tagform">
          
          <b>Tag Labels (comma separated)</b><br/>
          <q-input v-model="labels" required/>
          <br/><br/>
          <b>Note:</b> Tag labels cannot include characters such as ' @ # $. They can include spaces.<br/>
          If a tag such as "My First Tag" is new, that is the tag which will prevail, even if 
          e.g. "my first Tag" is later entered.<br/><br/>
          Tags are important markers of topics: in that case using upper case such as "My Topic"<br/>
          is a reasonable policy.
          <br/><br/>
          <q-btn label="Submit" @click="doSubmit" /><q-btn label="Cancel" @click="$router.replace('/home')" />
        </div>
      </div>
    </q-page>
</template>

<script>
import api from 'src/api'
const conversation = api.service('conversation')
const tags = api.service('tags')
export default {
  props: [ 'user' ],
  data () {
    return {
      labels: '',
      parentId: ''
    }
  },
  methods: {
    async doSubmit () {
      //alert(this.$data.labels)
      //alert(this.$data.parentId)
      //
      this.processLabels();
    },
    replaceSpaces (str) {
      return str.replace(/ /g, '_')
    },
    labelToId (label) {
      let result = this.replaceSpaces(label)
      return result.toLowerCase()
    },
    processLabels () {
      console.info('Tagomizer', this.labels)
      // create an array of labels based on the Labels input field
      let ta = this.labels.split(',')
      let len = ta.length
      console.info('TX', len)
      let labelArray = []
      if (len > 0) {
        for (var i = 0; i < len; i++) {
          console.info('TY', ta[i])
          labelArray.push(ta[i].trim())
        }
      } else if (ta !== '') {
        labelArray.push(ta.trim())
      }      
      console.info('TagProcessLabels', labelArray.length)
      if (labelArray.length > 0) {
        this.findOrCreateTags(labelArray)
      }
    },
    grabTag (id, callback) {
      tags.find({ query: { 'id':id, skippop:true } }) 
        .then((response) => {
          return callback(response.data[0])
        })
        .catch((err) => {
          console.info('TagFindeOrCreate Error', err)
          return callback(undefined)
        })
    },
    findOrCreateTag (label, callback) {
      console.info('NT', label)
      // returns a tag, either new or existing
      let id = this.labelToId(label)
      console.info('NT-1', id)
      let self = this
      this.grabTag(id, function (theTag) {
        console.info('NT-2', theTag)
        if (theTag) {
          return callback(theTag)
        } else {
          console.info('NTC')
          // create a new tag
          var json = {}
          json.id = id
          json.label = label
          json.creator = self.user._id
          json.handle = self.user.handle
          json.date = new Date()
          json.type = 'tag'
          json.img = 'statics/images/tag.png'
          json.imgsm = 'statics/images/tag_sm.png'
          tags.create(json)
            .then((response) => {
              console.info('TagCreate', response)
              return callback(response)
            })
        }
      })
          
    },
    findOrCreateTags (labelArray) {
      // Each label in labelArray will become a tag
      // which may or may not exist
      // In any case, the tag must know about parentId
      // and the node associated with parentId must know about tag
      var theLabel
      var theId
      let len = labelArray.length
      let self = this
      function next () {
        if (labelArray.length === 0) {
          console.info('TA0')
          return self.$router.push({name: 'questview', params: { 'id':self.parentId }})
        } else {
          theLabel = labelArray.pop()
          if (theLabel && theLabel !== '') {
            console.info('TA', theLabel)
            self.findOrCreateTag(theLabel, function (theTag) {
              console.info('TB', theTag)
              self.processTag(theTag)
              next()
            })
          } else {
            next()
          }
        }
      }
      // kickstart
      next()
    },
    processTag (tag) {
      console.info('TagProcess', tag)
      // mate this tag with its parent
      let nodes = tag.nodes
      if (!nodes) {
        nodes = []
      }
      let where = nodes.indexOf(this.parentId)
      if (where < 0) {
        nodes.push(this.parentId)
        tag.nodes = nodes
        console.info('TagProcess-1', tag)
        tags.update(tag.id, tag)
          .then((response) => {
          })
      }
      // mate parent with its tag
      conversation.find({ query: { 'id':this.parentId, skippop:true } })
        .then((response) => {
          let x = response.data[0]
          console.info('TagProcess-2', x)
          let tags = x.tags
          if (!tags) {
            tags = []
          }
          let where2 = tags.indexOf(tag.id)
          if (where2 < 0) {
            tags.push(tag.id)
            x.tags = tags
            conversation.update(x.id, x)
              .then((response) => {
                console.info('TagProcess-3', response)
              })
          }
          console.info('TagProcess-4')
        })
    }
  },
  mounted () {
    this.$store.commit('questView', false)
    this.$data.parentId = this.$route.params.id
  }
}
</script>

<style>
#newtagview {
    column-count:2;
    margin-left:10px;
}
#tagform {
    column-width:70%;
    height:650px;
}
#taglist {
    border: 1px solid black;
    column-width:29%;
    white-space:nowrap;
    overflow-x: hidden; 
    overflow-y: scroll;
    height:500px;   
}
</style>