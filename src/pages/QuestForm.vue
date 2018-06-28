<template>
    <q-page>
        <h3>Quest Edit Form</h3>
        <!-- todo -->
        <div>
            <h5>Subject</h5>
            <q-input  v-model="label" />
        </div>
        <div>
            <h5>Details</h5>
            <q-editor v-model="details" />
        </div>
        <div>
            <q-btn label="Submit" @click="doSubmit" /><q-btn label="Cancel" @click="$router.replace('/home')" />
        </div>
    </q-page>
</template>

<script>
  import api from 'src/api';
  const uuidv4 = require('uuid/v4');
  const quests = api.service('quests');

  export default {
    data () {
      return {
        label: "",
        details: ""
      }
    },
    methods: {
      doSubmit: function() {
          //alert(this.label);
          //alert(this.details);
          var json = {};
          json.id = uuidv4();
          json.label = this.label;
          json.details = this.details;
          
          

          alert(JSON.stringify(json));
          quests.create(json).then((response) => {
              alert(response);
          });
      }

    },
    mounted () {
      

      
    }
  }
</script>

<style>
</style>