<template>
  <q-page :padding="true">
    <h6>New Connection Form</h6>
    <h2>Choose a Relation</h2>
    <span style="margin-left:20px"><b>Chosen Value</b> <q-input v-model="selection"/></span>
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
  </q-page>
</template>
<script>
import { required } from 'vuelidate/lib/validators'


//*** */https://quasar-framework.org/components/select.html
export default {
  props: [ 'user' ],
  validations: {
    selection: { required }
  },
  data () {
    return {
      source: '',
      target: '',
      callerId: '',
      callerType: '',
      selection: null,
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
    doSubmit () {
      console.log("Submitted")
    }
  },
  mounted () {

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