<template>
  <div>
    <h1>Reset Password</h1>
    Token: {{hash}}
    Email: {{email}}
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
          v-model="password_confirm"
          type="password"
          name="email"
          stack-label="Confirm Password"
          class="full-width"
        />
      </div>
      <div class="row">
        <q-btn label="Reset Password" @click="doReset"/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "ResetPassword",
  props: ["hash", "email"],
  mounted() {
    const value = this.hash;
    const email = this.email;
    console.info("Verifying token", {value, email});
    // this.verifyToken({
    //   action: "verifySignupLong",
    //   value
    // })
    //   .then(res => {
    //     console.info("Verified user", res);
    //     this.showMessage("User verified...redirecting in 3s", "positive");

    //     setTimeout(() => this.$router.push("/signin"), 3000);
    //   })
    //   .catch(err => {
    //     console.error("Error verifying token", err);
    //     this.showMessage(
    //       "Error verifying user...redirecting in 3s",
    //       "negative"
    //     );

    //     setTimeout(() => this.$router.push("/home"), 3000);
    //   });
  },
  data() {
    return {
      password: "",
      password_confirm: ""
    }
  },
  methods: {
    ...mapActions({ verifyToken: "verifyToken" }),
    ...mapActions('authManagement', {
      createPasswordReset: 'create'
    }),
    async doResetPassword() {
      const payload = {
        "action": "resetPwdLong",
        "value": {
          "user": {
            "email": this.email
          },
          "password": this.password,
          "token": this.hash
        }
      };

      try {
        console.info('ResetPassword', 'doResetPassword');
        const result = await this.createPasswordReset(payload);
        console.info('ResetPassword', 'doResetPassword', { result });
      } catch (e) {
        console.error('ResetPassword', 'doResetPassword', {e});
      }

    },
    showMessage(message, type) {
      this.$q.notify({ type, message });
    },
    validatePasswords() {
      if (this.password !== this.password_confirm) {
        console.warn('ResetPassword', 'validatePasswords', 'passwords don\'t match')
        return false;
      }
      console.info('ResetPassword', 'validatePasswords', 'passwords match');
      return true;
    },
    async doReset() {
      if (this.validatePasswords()) {
        try {
          await this.doResetPassword();
          this.showMessage('Password reset successful!, redirecting to login', 'positive');
          setTimeout(() => this.$router.push("/login"), 3000);
        } catch (e) {
          this.showMessage('Passwords reset error. ' + e.message, 'negative');
        }
      } else {
        this.showMessage('Passwords do not match', 'negative');
      }
    }
  }
};
</script>