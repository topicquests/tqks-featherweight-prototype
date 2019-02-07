<template>
    <q-page :padding="true" class="flex flex-left">
        <h6>Connections Form</h6>
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
export default {
  data () {
    return {
        sourceId: null,
        targetId: null
    }
  },
  mounted () {
  }
}
</script>
<style lang="styl">
</style>
