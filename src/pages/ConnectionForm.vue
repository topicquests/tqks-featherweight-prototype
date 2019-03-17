<template>
  <q-page :padding="true">
    <h3><img src="statics/images/link.png" > New Connection Form     <q-btn label="Clear Selections" @click="clearSelections" /></h3>
    <div v-if="isFirst">
      <q-btn label="Got that Node. Select another Node to Connect" @click="$router.replace('/home')" />
    </div>
    <div v-if="!isFirst">
     <div><b>Source   </b><q-input v-model="sourceLabel"/></div>
      <div><b>Relation </b><q-input v-model="selection" /></div>
      <div><b>Target   </b><q-input v-model="targetLabel" /></div>
      <div>
        <q-btn label="Reverse Source and Target" @click="doReverse" />
      </div>
    </div>
    <div v-if="isReady">
      <h5>Choose a Relation</h5>
     <!-- <span style="margin-left:20px"><b>Chosen Value</b> <q-input v-model="selection"/></span>-->
      <div class="relationscroller">
        <div class="columncontainer">
          <div class="relationcolumn" style="text-align: center;">
            <b>Cause</b>
            <q-select v-model="selection" :options="causeoptions"/>
          </div>
          <div class="relationcolumn" style="text-align: center;">
            <b>Agreement</b>
            <q-select v-model="selection" :options="agreeoptions"/>
          </div>
          <div class="relationcolumn" style="text-align: center;">
            <b>Solution</b>
            <q-select v-model="selection" :options="solutionoptions"/>
          </div>
          <div class="relationcolumn" style="text-align: center;">
            <b>Analogy-Metaphor</b>
            <q-select v-model="selection" :options="analogyoptions"/>
          </div>
          <div class="relationcolumn" style="text-align: center;">
            <b>Sameness</b>
            <q-select v-model="selection" :options="samenessoptions"/>
          </div>
          <div class="relationcolumn" style="text-align: center;">
            <b>Part-Whole Containment</b>
            <q-select v-model="selection" :options="partoptions"/>
          </div>
          <div class="relationcolumn" style="text-align: center;">
            <b>Argument</b>
            <q-select v-model="selection" :options="argueoptions"/>
          </div>
          <div class="relationcolumn" style="text-align: center;">
            <b>Explanation</b>
            <q-select v-model="selection" :options="explainoptions"/>
          </div>
          <div class="relationcolumn" style="text-align: center;">
            <b>Biomedical</b>
            <q-select v-model="selection" :options="biooptions"/>
          </div>
        </div>
      </div>
      <div>
        <q-btn label="Submit" @click="doSubmit" /><q-btn label="Cancel" @click="$router.replace('/home')" />
      </div>
    </div>
  </q-page>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import api from 'src/api'
const uuidv4 = require('uuid/v4')
const conversation = api.service('conversation')
var router

//*** */https://quasar-framework.org/components/select.html
export default {
  props: [ 'user', 'id' ],
  validations: {
    selection: { required }
  },
  data () {
    return {
      source: '',
      target: '',
      sourceLabel: '',
      targetLabel: '',
      callerId: '',
      callerType: '',
      selection: null,
      isReverse: false,
      isFirst: false,
      isReady: false,
      causeoptions:[ 
        {label: 'Causes', value: 'CausesRelationType'},
        {label: 'Enables', value: 'EnablesRelationType'},
        {label: 'Implies', value: 'ImpliesRelationType'},
        {label: 'Impairs', value: 'ImpairsRelationType'},
        {label: 'Prevents', value: 'PreventsRelationType'},
        {label: 'Prerequisite For', value: 'IsPrerequisiteForRelationType'},
        {label: 'Unlikely To Affect', value: 'UnlikelyToAffectRelationType'},
        {label: 'Responds To', value: 'RespondsToRelationType'}
      ],
      agreeoptions: [
        {label: 'Agrees With',  value: "AgreesWithRelationType"},
        {label: 'Disagrees With', value: "DisagreesWithRelationType"}
      ],
      solutionoptions: [
        {label: 'Improves On',  value: "ImprovesOnRelationType"},
        {label: 'Addresses', value: "AddressesRelationType"},
        {label: 'Solves', value: "SolvesRelationType"}
      ],
      analogyoptions: [
        {label: 'Analogous To', value: "IsAnalogousRelationType"},
        {label: 'Not Analogous To', value: "IsNotAnalogousRelationType"},
        {label: 'Metaphor Of', value: "IsMetaphorRelationType"}
      ],
      samenessoptions: [
        {label: 'Similar To', value: "IsSimilarToRelationType"},
        {label: 'Different To', value: "IsDifferentToRelationType"},
        {label: 'Opposite Of', value: "IsOppositeOfRelationType"},
        {label: 'Same As', value: "IsSameAsRelationType"},
        {label: 'Example Of', value: "IsExampleRelationType"},
        {label: 'Related To', value: "IsRelatedToRelationType"}
      ],
      partoptions: [
        {label: 'Part Of', value: "IsPartOfRelationType"},
        {label: 'Uses', value: "UsesRelationType"}
      ],
      argueoptions: [
        {label: 'Proves', value: "ProvesRelationType"},
        {label: 'Refutes', value: "RefutesRelationType"},
        {label: 'Evidence For', value: "IsEvidenceForRelationType"},
        {label: 'Evidence Against', value: "IsEvidenceAgainstRelationType"},
        {label: 'Has Nothing To Do With', value: "HasNothingToDoWithRelationType"},
        {label: 'Consistent With', value: "IsConsistentWithRelationType"},
        {label: 'Inconsistent With', value: "IsInconsistentWithRelationType"},
        {label: 'Predicts', value: "PredictsRelationType"},
        {label: 'Envisages', value: "EnvisagesRelationType"},
        {label: 'Shares Issues', value: "SharesIssuesWithRelationType"}
      ],
      explainoptions: [
        {label: 'Explains What', value: "ExplainsWhatRelationType"},
        {label: 'Explains Why', value: "ExplainsWhyRelationType"},
        {label: 'Explains How', value: "ExplainsHowRelationType"}
      ],
      biooptions: [

      ]
    }
  },
  methods: {
    clearSelections () {
      localStorage.removeItem('connectionAId')
      localStorage.removeItem('connectionALabel')
      localStorage.removeItem('connectionBId')
      localStorage.removeItem('connectionBLabel')
    },
    doReverse () {
      this.$data.isReverse = true
      let x = this.$data.sourceLabel
      this.$data.sourceLabel = this.$data.targetLabel
      this.$data.targetLabel = x
    },
    doSubmit () {
      console.log("Submitted")
      // use sourceNode and targetNode as fields
      var s, t, sl, tl 

      if (this.$data.isReverse) {
        s = localStorage.getItem('connectionBId')
        t = localStorage.getItem('connectionAId')
        sl = localStorage.getItem('connectionBLabel')
        tl = localStorage.getItem('connectionALabel')
      } else {
        t = localStorage.getItem('connectionBId')
        s = localStorage.getItem('connectionAId')
        tl = localStorage.getItem('connectionBLabel')
        sl = localStorage.getItem('connectionALabel')
      }
      let lab = sl+' '+this.$data.selection+' '+tl
      var json = {};
      json.nodeId = uuidv4();
      json.label = lab;
      json.details = lab;
      json.instanceOf = this.$data.selection;
      json.url = this.url;
      json.creator = this.user._id;
      json.handle = this.user.handle;
      json.date = new Date();
      json.sourceNode = s;
      json.sourceLabel = sl;
      json.targetNode = t;
      json.targetLabel = tl;
      json.img = "statics/images/link.png";
      json.imgsm = "statics/images/link_sm.png";
      json.type = "relation";
      //we are done here, clear localStorage
      localStorage.removeItem('connectionAId')
      localStorage.removeItem('connectionALabel')
      localStorage.removeItem('connectionBId')
      localStorage.removeItem('connectionBLabel')
      conversation.create(json).then(async response => {
        const id = json.nodeId;
        router.push({ name: "questview", params: { id: id } });
        // source and target nodes updated at server
      });
      //TODO must update conversation hook to handle those
    }
  },
  mounted () {
    router = this.$router;

    //alert(this.label)
    /////////////////////////
    // Complex behaviors:
    // First mount when a node is chosen for connection
    //  plug that into store:connectionAId and connectionALabel
    //  Alert user to select another node
    //     Actually, present user with a Button to go select another node
    // Second mount when a node is chosen for connection
    //  plug that into store:connectionBId and connectionBLabel
    //    choice is handled by store itself
    //  Now, present the two lables in a Source and Target box
    //   with an empty relation box in between
    //  Present a Reverse Actors button
    //    this is a state machine: if as is, connectionA is source and connectionB is target
    //    but if user wants to swap them, click the button
    //    then set a boolean isReverse and repaint the boxes
    // Now prompt user to select a relation type
    // Removed label from input due to html issues
    // so much fetch the node
    //////////////////////////////////
    conversation
          .find({ query: { nodeId: this.id, skippop: true } })
          .then(response => {
        const resp = response.data[0]
        const label = resp.label //*
        let _if = localStorage.getItem('connectionALabel')
        if (_if === null) {
          localStorage.setItem('connectionAId', this.id)
          localStorage.setItem('connectionALabel', label)
          this.$data.isFirst = true
          this.$data.isReady = false
        } else {
          localStorage.setItem('connectionBId', this.id)
          localStorage.setItem('connectionBLabel', label)
          this.$data.isFirst = false
          this.$data.isReady = true;
          this.$data.sourceLabel = localStorage.getItem('connectionALabel')
          this.$data.targetLabel = localStorage.getItem('connectionBLabel')
        }

    });

//    alert(localStorage.getItem('connectionALabel'))
//    alert(localStorage.getItem('connectionBLabel'))

  }
}
</script>

<style>

.relationscroller {
    border: 1px solid black;
    width: 960;
    white-space:nowrap;
    overflow-x: scroll; 
    overflow-y: hidden;
    margin: 12px;
    border-radius: 3px;
}
.relationcolumn {
    float:left;
    white-space:normal;
    border: 1px solid black;
    width: 200px;
    height: 200px;
    background: rgb(240, 234, 234);
    border-radius: 3px;
    margin-left: 4px;
    margin-right: 4px;
    font-family:pragmatica-web,sans-serif;    
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
</style>