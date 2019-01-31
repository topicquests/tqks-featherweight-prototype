<template>
  <div>
    <h1>Reset Password</h1>
    Token: {{hash}}
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
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "VerifyUser",
  props: ["hash"],
  mounted() {
    const value = this.hash;
    console.info("Verifying token", value);
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
  methods: {
    ...mapActions({ verifyToken: "verifyToken" }),
    showMessage(message, type) {
      this.$q.notify({ type, message });
    }
  }
};
</script>