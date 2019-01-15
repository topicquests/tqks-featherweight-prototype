<template>
  <q-page :padding="true" class="flex flex-left">
    <h1>Verifying User</h1>
    Token
    Type: {{type}}
    Token: {{hash}}
  </q-page>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "Token",
  props: ["type", "hash"],
  mounted() {
    const value = this.hash;
    console.info("Verifying token", value);
    this.verifyToken({
      action: "verifySignupLong",
      value
    })
      .then(res => {
        console.info("Verified user", res);
        this.showMessage("User verified...redirecting in 3s", "positive");

        setTimeout(() => this.$router.push("/signin"), 3000);
      })
      .catch(err => {
        console.error("Error verifying token", err);
        this.showMessage(
          "Error verifying user...redirecting in 3s",
          "negative"
        );

        setTimeout(() => this.$router.push("/home"), 3000);
      });
  },
  methods: {
    ...mapActions({ verifyToken: "verifyToken" }),
    showMessage(message, type) {
      this.$q.notify({ type, message });
    }
  }
};
</script>