<template>
    <q-page>
      <div id="topbox">
        <h3> Quest</h3>
        <span><h4>{{ label }}</h4></span>
        <q-scroll-area style="width: 800px; height: 400px;">
          <span v-html="details"></span>
        </q-scroll-area>
      </div>
    </q-page>
</template>
<script>
import api from 'src/api'
export default {
  data () {
    return {
      label: '',
      details: ''
    }
  },
  mounted () {
    const id = this.$route.params.id
    const quests = api.service('quests')
    quests.find({ query: { 'id': id } })
      .then((response) => {
        console.log(response)
        var x = response.data[0]
        this.$data.label = x.label
        this.$data.details = x.details
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
.datacontainer {
  width: 1200px;
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
