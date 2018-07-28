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
  data () {
    return {
      labels: '',
      parentId: ''
    }
  },
  methods: {
    async doSubmit () {
      alert(this.$data.labels)
      alert(this.$data.parentId)
      //
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