<template>
    <q-page :padding="true" class="flex flex-left">
        <div>
            <h6>Connections Form</h6>
            Id: {{id}}<br/>
            Label: {{label}}<br/><br/>
            <hr>
            <q-select v-model="selection" :options="options" @input="onValueChange"/> {{sourceLabel}}
            <q-btn label="Create Relation" @click="doSubmit" /><q-btn label="Cancel" @click="$router.replace('/home')" />
        </div>

    </q-page>
</template>

<script>
//////////////////////
// We are here because:
//  a) two nodes were chosen, one for source one for target
//  b) a relationType was chosen
//
// We then fabricate a shell connection
// The next step is to -- one of
//  a) present a TopicEdit form with all the chosen data to allow
//    the user to add notes to Details, in which case the user
//    clicks Submit and the new topic (as connection) is made, and the
//    source and target topic are each updated with a new relation 
//   b) we go straight to Submit to submit the new connection and
//    update the source and target nodes
///////////////////////
// Think:
//  This form will be called twice
//  build a Map (JSONObject) key = label, value = id
//  For each Node
//      salt the call into that map
//      display each label into a tempA if it is null
//          or tempB if tempA is not null;
//  TempA and TempB are viewed in a table
//  TempA gets a pulldown choicd
//      SourceNode or TargetNode
//  When that choice is made, the other label becomes the opposite
//  We now have selected which node is source and which is target
//  Then click Create Button      
//////////////////////////////////
export default {
    props: ["id", "label"],
  data () {
    return {
        sourceId: null,
        targetId: null,
        sourceLabel: null,
        targetLabel: null,
        selection: null,
        options: [
        {label: 'Source',  value: "source"},
        {label: 'Target', value: "target"}
        ]
        
    }
  },
  methods: {
      doSubmit () {
          //TODO
      },
      onValueChange () {
          alert(this.$data.selection)
      }
  },
  mounted () {
      //capture the first one in 
      // we can deal with the next one in later
      this.$data.sourceId = id
      this.$data.sourceLabel = label
  }
}
</script>
<style lang="styl">
</style>
