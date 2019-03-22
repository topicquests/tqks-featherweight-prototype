<template>
  <q-page :padding="true" class="flex flex-center">
    <q-dialog ref="theModal" v-model="showDialog" :title="title" @ok="onOk" @hide="onHide">
      <div slot="body">
        <div class="row q-mb-md">
          <q-input
            v-model="email"
            type="email"
            name="email"
            stack-label="E-mail"
            class="full-width"
            autofocus
          />
        </div>
        <div class="row">
          <q-input
            v-model="password"
            type="password"
            name="email"
            stack-label="Password"
            class="full-width"
          />
          <q-btn
            class="q-pa-sm"
            label="Forgot your password?"
            text-color="green"
            @click.prevent="forgotPassword"
            :disabled="!email"
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
      title: "SignIn"
    };
  },
  computed: {},
  methods: {
    goHome() {
      this.$router.push({ name: "home" });
    },
    onHide() {
      // Workaround needed because of timing issues (sequencing of 'hide' and 'ok' events) ...
      setTimeout(() => {
        this.goHome();
      }, 50);
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
            type: "negative",
            message: "Cannot sign in, please check your e-mail or password"
          });
          this.goHome();
        });
    },
    login(email, password) {
      email = email && email.toString().toLowerCase();
      return auth.login(email, password);
    },

    forgotPassword(data) {
      console.info("SignIn", "forgotPassword");
      return auth
        .sendResetPassword(this.email.toLowerCase())
        .then(result => {
          console.info("SignIn", "forgotPassword", "success", { result });
          this.$q.notify({
            type: "positive",
            message: "Please check your email for a password reset link"
          });
          this.$refs.theModal.hide();
          this.$router.push("/home");
        })
        .catch(e => {
          this.$q.notify({
            type: "negative",
            message: "There was an error resetting your password."
          });
          console.error(e);
          console.error("SignIn", "forgotPassword", "error", { e });
        });
    }
  },
  mounted() {},
  beforeDestroy() {}
};
</script>

<style lang="styl">
</style>
