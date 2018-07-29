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
      let labelArray = []
      if (len > 0) {
        for (var i = 0; i < len; i++) {
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
    findOrCreateTags (labelArray) {
      // Each label in labelArray will become a tag
      // which may or may not exist
      // In any case, the tag must know about parentId
      // and the node associated with parentId must know about tag
      var theLabel
      var theId
      var theTag
      let len = labelArray.length
      for (var i = 0; i < len; i++) {
        theLabel = labelArray[i]
        console.info('TagFinding', len, theLabel)
        theId = this.labelToId(theLabel)
        tags.find({ query: { 'id':theId, skippop:true } })
          .then((response) => {
            console.info('TagGrabX', response)
            theTag = response.data[0]
            console.info('TagFindOrCreate', theTag)
            if (theTag) {
              this.processTag(theTag)
            } else {
              this.createTag(theId, theLabel)
            }
          })
          .catch((err) => {
          //Do nothing
          })
      }
      this.$router.push({name: 'questview', params: { 'id':this.parentId }})

    },
    grabTag (tagId) {
      // can return null
      // get it without populating it
      tags.find({ query: { 'id':tagId, skippop:true } })
        .then((response) => {
          console.info('TagGrab', tagId, response)
          return response.data[0]
        })
        .catch((err) => {
          //Do nothing
        })
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
    },
    createTag (tagId, label) {
      console.info('TagCreate', tagId)
      // create a new tag
      var json = {}
      json.id = tagId
      json.label = label
      json.creator = this.user._id
      json.handle = this.user.handle
      json.date = new Date()
      json.type = 'tag'
      tags.create(json)
        .then((response) => {
          console.info('TagCreate', response)
          return this.processTag(response)
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