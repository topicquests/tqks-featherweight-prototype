<template>
  <div>
    <H2>Change Password</H2>
    <div slot="body">
      <div class="row q-mb-md">
        <q-input
          v-model="email"
          type="email"
          name="email"
          stack-label="Email"
          class="full-width"
          autofocus
        />
      </div>
      <div class="row">
        <q-input
          v-model="password_old"
          type="password"
          name="email"
          stack-label="Old Password"
          class="full-width"
          autofocus
        />
      </div>
      <div class="row">
        <q-input
          v-model="password"
          type="password"
          name="email"
          stack-label="New Password"
          class="full-width"
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
        <q-btn label="Change Password" @click="doReset"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ChangePassword",
  mounted() {
    const value = this.hash;
    const email = this.email;
  },
  data() {
    return {
      password: "",
      password_confirm: "",
      password_old: "",
      email: null
    };
  },
  methods: {
    ...mapActions("authManagement", {
      createPasswordChange: "create"
    }),
    async doChangePassword() {
      const payload = {
        action: "passwordChange",
        value: {
          user: {
            email: this.email
          },
          oldPassword: this.password_old,
          password: this.password
        }
      };

      try {
        console.info("ChangePassword", "doChangePassword");
        const result = await this.createPasswordChange(payload);
        console.info("ChangePassword", "doChangePassword", { result });
      } catch (e) {
        console.error("ChangePassword", "doChangePassword", { e });
      }
    },
    showMessage(message, type) {
      this.$q.notify({ type, message });
    },
    validatePasswords() {
      if (this.password !== this.password_confirm) {
        console.warn(
          "ResetPassword",
          "validatePasswords",
          "passwords don't match"
        );
        return false;
      }
      console.info("ResetPassword", "validatePasswords", "passwords match");
      return true;
    },
    async doReset() {
      if (this.validatePasswords()) {
        try {
          await this.doChangePassword();
          this.showMessage(
            "Password reset successful!, redirecting to login",
            "positive"
          );
          setTimeout(() => this.$router.push("/home"), 3000);
        } catch (e) {
          this.showMessage("Passwords reset error. " + e.message, "negative");
        }
      } else {
        this.showMessage("Passwords do not match", "negative");
      }
    }
  }
};
</script>