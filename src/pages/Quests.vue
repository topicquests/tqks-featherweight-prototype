<template>
    <q-page>
        <h3> Quests</h3>
        <!-- "to="/questedit"-->
        <q-btn v-if="isAuthenticated" label="New Quest" @click="$router.replace('/questedit')" />
        
        <div v-for="quest in myQuests" v-bind:key="quest">
          <a> href="/questview/{{ quest.id }}">{{ quest.label }}</a> <br/>
        </div>
    </q-page>
</template>

<script>
  import api from 'src/api';

  export default {
    data () {
      return {
        isAuthenticated: true,
        myQuests: []
      }
    },
    methods: {
      listQuests: function() {
        console.log("ListQuests");
        return ['foo', 'bar'];
      },

      newQuest: function() {
        alert("Clicked");
      }

    },
    mounted () {
      const quests = api.service('quests');
      quests.find({
        query: {
          $limit: 25
        }
      })
        .then((response) => {
          // We want the latest messages but in the reversed order
          this.$data.myQuests = response.data
        })
      }
  }
</script>

<style>
</style>

