git <template>
  <q-page :padding="true">
      <h6>Quest Edit Form</h6>
      <div>
        <b>Subject</b><br/>
        <q-input v-model="label" />
      </div>
      <div>
        <b>URL</b> (Optional)<br/>
        <q-input  v-model="url" />
      </div>
      <div>
        <b>Details</b><br/>
        <ckeditor type="classic" v-model="details"></ckeditor>
      </div>
      <div>
        <q-btn label="Submit" @click="doSubmit" /><q-btn label="Cancel" @click="$router.replace('/home')" />
      </div>
  </q-page>
</template>

<script>
import api from 'src/api'
import Vue from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VueCkeditor from 'vue-ckeditor5'
const options = {
  editors: {
    classic: ClassicEditor,
  },
  name: 'ckeditor'
}
 
Vue.use(VueCkeditor.plugin, options);
const uuidv4 = require('uuid/v4')
const conversation = api.service('conversation')
var router

export default {
  data() {
    return { 
      label: "",
      details: "",
      url: "",
      user: this.$store.getters.user
    };
  },
  methods: {
    doSubmit: function() {
      // alert(this.label);
      // alert(this.details);
      var json = {};
      json.nodeId = uuidv4();
      json.type = "quest";
      json.label = this.label;
      json.url = this.url;
      json.details = this.details;
      json.img = "statics/images/map.png";
      json.imgsm = "statics/images/map_sm.png";
      json.creator = this.user._id;
      json.handle = this.user.handle;
      json.date = new Date();
      json.type = "map";
      console.info("QF-1", this.user);
      console.info("QF-2", json);
      // TODO add creatorId, date
      // alert(JSON.stringify(json))
      conversation.create(json).then(response => {
        // alert(JSON.stringify(response))
        router.push("/quests");
      });
    }
  },
  mounted() {
    router = this.$router;
    this.$store.commit("questView", false);
  }
};
</script>

<style>
.details {
  max-width: 960px;
  min-height: 800px;
  overflow: auto;
  overflow-wrap: normal;
}
</style>
