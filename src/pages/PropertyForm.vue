<template>
  <q-page :padding="true">
    <h6>Property Edit Form</h6>
    <b>Record a <i>Key</i>:<i>Value</i> pair.</b><br/><br/>
    A <b>Key</b> is the name of a property. Typical properties include:
    <ul>
      <li>Birthdate</li>
      <li>Molecular Weight</li>
      <li>Price</li>
    </ul>
    A <b>Value</b> can be either of two kinds:
    <ul>
      <li>A single value, such as a birthdate</li>
      <li>A comma-separated list of values</li>
    </ul>
    <div>
      <b>Key</b><br/>
      <q-input v-model="key" />
    </div>
    <br/>
    <p>Choose a Value Type</p>
    <div>
      <b>Single Value</b><br/>
      <q-input v-model="value" />
    </div>
    <p>Or</p>
    <i>Note:</i> Values cannot have commas in them</br/>
    <div>
      <b>Multiple, Comma-separated Values</b><br/>
      <q-input v-model="multival" />
    </div>
    <br/>
    <div>
      <q-btn label="Submit" @click="doSubmit" />
      <q-btn label="Cancel" @click="$router.replace('/home')" />
    </div>
  </q-page>
</template>
<script>
import api from "src/api";
const conversation = api.service("conversation");
export default {
  props: [ "id" ],
data() {
    return {
      //simple key:
      key: null,
      //singleton
      value: null,
      //comma-separated list of values
      multival: null

    };
  },
  methods: {
    /////////////////////////////
    // the "properties" Array is an Array of maps
    //   { 
    //      key: 'Some Key',
    //      value: 'Some Value'
    //    }
    // or
    //   { 
    //      key: 'Some Key',
    //      value: ['Some Value', 'Another Value',....]
    //    }
    ////////////////////////////
    doSubmit () {
      // is value a comma-separated list?
      let theValue = this.$data.value;
      if (!theValue) {
        theValue = this.$data.multival;
        if (!theValue) {
          //TODO Error
          console.error('Missing Value');
        } else {
          theValue = theValue.split(',');
        }
      }
      let json = {}
      json.key = this.$data.key;
      json.value = theValue;
      console.log("PROPX", json);
      conversation
          .find({ query: { nodeId: this.id, skippop: true } })
          .then(response => {
        const resp = response.data[0]
        var props = resp.properties;
        console.log('PrOPY', props);
        if (!props) {
          props = [];
        }
        props.push(json);
        //Now, do a patch
        let payload = {};
        payload.properties = props;
        console.info('PROPZ', resp._id);
        conversation.patch(resp._id, payload)
        .then ((response) => {
          //TODO select route from 'type' attribute
          this.$router.push({ name: "topicview", params: { id: this.id } });
        });
      });

    }
  },
  mounted() {
    console.info("Props", this.id);
  }
};
</script>
<style>
</style>