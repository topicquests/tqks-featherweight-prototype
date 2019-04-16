<template>
  <q-page :padding="true">
    <h6>Profile Edit Form</h6>

    <div>
      <b>Email</b><br/>
      <q-input v-model="form.email" type="email"/><br/>
    </div>
    <div>
      <b>Full Name</b><br/>
      <q-input v-model="form.name" /><br/>
    </div>

    <div>
      <b>Homepage URL</b> (Optional)<br/>
      <q-input  v-model="form.url" /><br/>
    </div>

    <div>
      <b>Password</b><br/>
      <q-input  v-model="form.password" type="password"/>
    </div>

    <div>
      <q-btn label="Submit" @click="doSubmit" /><q-btn label="Cancel" @click="$router.replace('/home')" />
    </div>

  </q-page>
</template>
<script>
import api from 'src/api'
const users = api.service('users')
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        id: '',
        email: '',
        name: '',
        url: '',
        password: ''
      },
      user: '',
    }
  },
  methods: {
    ...mapActions({
      getUsers: 'users/get',
      patchUsers: 'users/patch',
    }),
    async doSubmit () {
      const { homepage, email, fullname, myPassword } = this.user;

      const data = {
        homepage: this.form.url !== homepage ? this.form.url : homepage,
        email: this.form.email !== email ? this.form.email : email,
        fullname: this.form.name !== fullname ? this.form.name : fullname,
        password: this.form.password !== password ? this.form.password : password,
      }
      try {
        await this.patchUsers(usr._id, data);
        this.$router.push('/home');
      } catch (e) {
        console.error('profileForm', 'doSubmit', 'error', e);
      }
    }
  },
  async mounted () {
    this.$store.commit('questView', false);
    const user_id = this.$route.params.id;
    const user = await this.getUsers(user_id);
    this.user = user;
    this.form.user = user_id;
    this.form.password = user.email;
    this.form.name = user.fullname;
    this.form.url = user.homepage || ''; // likely doesn't exist
  }
}
</script>
<style>
</style>
