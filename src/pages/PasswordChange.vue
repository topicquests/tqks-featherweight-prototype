<template>
  <q-page :padding="true" class="flex flex-center">
    <q-dialog v-model="showDialog" :title="title" @ok="onOk">
      <div slot="body">
        <div class="row q-mb-md">
          <q-input
            v-model="password"
            type="password"
            name="email"
            stack-label="New Password"
            class="full-width"
            autofocus
          />
        </div>
        <div class="row">
          <q-input
            v-model="password"
            type="password"
            name="email"
            stack-label="Confirm Password"
            class="full-width"
          />
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import auth from "src/auth";

export default {
  data() {
    return {
      showDialog: true,
      email: null,
      password: null,
      title: "Change Password"
    };
  },
  computed: {},
  methods: {
    goHome() {
      this.$router.push({ name: "home" });
    },

    onOk(data) {
      this.login(this.email, this.password)
        .then(_ => {
          this.$q.notify({
            type: "positive",
            message: "You are now logged in"
          });
        })
        .catch(_ => {
          this.$q.notify({
            type: "positive",
            message: "Cannot sign in, please check your e-mail or password"
          });
          this.goHome();
        });
    },
    login(email, password) {
      return auth.login(email, password);
    },

    forgotPassword(data) {
      return auth.forgotPassword(this.email);
    }
  },
  mounted() {},
  beforeDestroy() {}
};
</script>

<style lang="styl">
</style>
