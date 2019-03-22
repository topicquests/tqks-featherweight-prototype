<template>
  <q-page :padding="true" class="flex flex-left">
    <verify-user v-if="type === 'verify'" :hash="hash" :email="email"/>
    <reset-password v-if="type === 'reset'" :hash="hash" :email="email"/>
  </q-page>
</template>
<script>
import { mapActions } from "vuex";
import VerifyUser from "../components/VerifyUser";
import ResetPassword from "../components/ResetPassword";

export default {
  name: "Token",
  props: ["type", "hash", "emailb64"],
  components: {
    "verify-user": VerifyUser,
    "reset-password": ResetPassword
  },
  data() {
    let email = "";
        try {
          email = atob(this.emailb64)
          console.info('Token', 'parsing email', email);
        } catch (e) {
          console.error('Token', 'error parsing email', e);
        }
    return {
      email
    };
  }
};
</script>