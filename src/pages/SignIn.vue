<template>
  <q-page :padding="true" class="flex-center" style="width:50vw;min-width:350px;">
<div class="panel-body">
      <h6>Sign In</h6>
      <form>
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
        <div class="row q-mb-md">
          <q-input
            v-model="password"
            type="password"
            name="passowrd"
            stack-label="Password"
            class="full-width"
            @keyup.enter="doLogin"
          />
        </div>
      </div>
      <div>
        <q-btn class="q-ma-sm" color="primary" label="Login" @click="doLogin"/>
        <q-btn class="q-ma-sm" outline color="primary"  :disable="!isForgotPasswordVisible" label="Forgot Password" @click="forgotPassword"/>
        <q-btn class="q-ma-sm" outline color="negative"  label="Cancel" @click="$router.replace('/home')"/>
      </div>
      </form>
    </div>
  </q-page>
</template>

<script>
import auth from "src/auth";

export default {
  data() {
    return {
      email: '',
      password: '',
      title: "Sign In",
      valid: false
    };
  },
  computed: {
    isForgotPasswordVisible() {
      // Any valid email has a minimum of 5 characters (eg. a@b.c )
      // Lazy validation
      // TODO: Check for actual email validation
      return this.email.length > 5;
    }
  },
  methods: {
    async doLogin() {
      try {
        console.info('SignIn', 'doLogin');
        await this.login(this.username, this.password);
        this.$q.notify({
            type: "positive",
            message: "You are now logged in"
          });
      } catch (e) {
        this.$q.notify({
            type: "negative",
            message: "Cannot sign in, please check your e-mail or password"
          });
        console.error('SignIn', 'doLogin', {e});
      }
    },
    goHome() {
      this.$router.push({ name: "home" });
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
          this.$router.push("/home");
        })
        .catch(e => {
          this.$q.notify({
            type: "negative",
            message: "There was an error resetting your password."
          });
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
