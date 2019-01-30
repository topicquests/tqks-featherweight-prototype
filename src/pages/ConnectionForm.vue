<template>
  <q-page :padding="true">
    <h6>New Connection Form</h6>
    <h2>Choose a Relation</h2>
    <span style="margin-left:20px">Chosen Value <input id="selected" type="text" name="selected"></span>
    <div class="relationscroller">
        <!-- column headers -->
        <div class="columncontainer">
                <div class="relationcolumn" style="text-align: center;">
                    <b>Cause</b>
                    <v-select v-model="label">
                      <option value="top" selected>Please select a Relation</option>
                      <option value="CausesRelationType">Causes</option>
                      <option value="EnablesRelationType">Enables</option>
                      <option value="ImpliesRelationType">Implies</option>
                      <option value="ImpairsRelationType">Impairs</option>
                      <option value="PreventsRelationType">Prevents</option>
                      <option value="IsPrerequisiteForRelationType">Prerequisite For</option>
                      <option value="UnlikelyToAffectRelationType">Unlikely To Affect</option>
                      <option value="RespondsToRelationType">Responds To</option>
                    </v-select>
                </div>
                <div class="relationcolumn" style="text-align: center;">
                    <b>Agreement</b>
                    <v-select v-model="label">
                      <option value="top" selected>Please select a Relation</option>
                      <option value="AgreesWithRelationType">Agrees With</option>
                      <option value="DisagreesWithRelationType">Disagrees With</option>
                    </v-select>
                </div>
                <div class="relationcolumn" style="text-align: center;">
                    <b>Solution</b>
                    <v-select v-model="label">
                      <option value="top" selected>Please select a Relation</option>
                      <option value="ImprovesOnRelationType">Improves On</option>
                      <option value="AddressesRelationType">Addresses</option>
                      <option value="SolvesRelationType">Solves</option>
                    </v-select>
                </div>
                <div class="relationcolumn" style="text-align: center;">
                    <b>Analogy-Metaphor</b>
                    <v-select v-model="label">
                      <option value="top" selected>Please select a Relation</option>
                      <option value="IsAnalogousRelationType">Analogous To</option>
                      <option value="IsNotAnalogousRelationType">Not Analogous To</option>
                      <option value="IsMetaphorRelationType">Metaphor Of</option>
                    </v-select>
                </div>
                <div class="relationcolumn" style="text-align: center;">
                    <b>Sameness</b>
                    <v-select v-model="label">
                      <option value="top" selected>Please select a Relation</option>
                      <option value="IsSimilarToRelationType">Similar To</option>
                      <option value="IsDifferentToRelationType">Different To</option>
                      <option value="IsOppositeOfRelationType">Opposite Of</option>
                      <option value="IsSameAsRelationType">Same As</option>
                      <option value="IsExampleRelationType">Example Of</option>
                        <option value="IsRelatedToRelationType">Related To</option>
                    </v-select>
                </div>
                <div class="relationcolumn" style="text-align: center;">
                    <b>Part-Whole Containment</b>
                    <v-select v-model="label">
                      <option value="top" selected>Please select a Relation</option>
                      <option value="IsPartOfRelationType">Part Of</option>
                      <option value="UsesRelationType">Uses</option>
                    </v-select>
                </div>
                <div class="relationcolumn" style="text-align: center;">
                    <b>Argument</b>
                    <v-select v-model="label">
                      <option value="top" selected>Please select a Relation</option>
                      <option value="ProvesRelationType">Proves</option>
                      <option value="RefutesRelationType">Refutes</option>
                      <option value="IsEvidenceForRelationType">Evidence For</option>
                      <option value="IsEvidenceAgainstRelationType">Evidence Against</option>
                      <option value="HasNothingToDoWithRelationType">Has Nothing To Do With</option>
                      <option value="IsConsistentWithRelationType">Consistent With</option>
                      <option value="IsInconsistentWithRelationType">Inconsistent With</option>
                      <option value="PredictsRelationType">Predicts</option>
                      <option value="EnvisagesRelationType">Envisages</option>
                      <option value="SharesIssuesWithRelationType">Shares Issues</option>
                    </v-select>
                </div>
                <div class="relationcolumn" style="text-align: center;">
                    <b>Explanation</b>
                    <v-select v-model="label">
                      <option value="top" selected>Please select a Relation</option>
                      <option value="ExplainsWhatRelationType">Explains What</option>
                      <option value="ExplainsWhyRelationType">Explains Why</option>
                      <option value="ExplainsHowRelationType">Explains How</option>
                    </v-select>
                </div>
                <div class="relationcolumn" style="text-align: center;">
                    <b>Biomedical</b>
                    <v-select v-model="label" required="required" onchange="dov-select(this)">
                      <option value="top" selected>Please select a Relation</option>
                    </v-select>
                </div>
        </div>
    </div> 
  </q-page>
</template>
<script>
//https://sagalbot.github.io/vue-select/docs/Basics/Options.html
//Note the style:
//<v-select :options="[{label: 'foo', value: 'Foo'}]"></v-select>
export default {
  props: [ 'user' ],
  validations: {
    label: { required }
  },
  data () {
    return {
      source: '',
      target: '',
      callerId: '',
      callerType: '',
      label: ''
    }
  },
  methods: {

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
    height: 40px;
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