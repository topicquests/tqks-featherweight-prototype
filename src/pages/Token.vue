<template>
  <q-page :padding="true" class="flex flex-left">
    <verify-user v-if="type === 'verify'" :hash="hash"/>
    <reset-password v-if="type === 'reset'" :hash="hash"/>
  </q-page>
</template>
<script>
import { mapActions } from "vuex";
import VerifyUser from "../components/VerifyUser";
import ResetPassword from "../components/ResetPassword";

export default {
  name: "Token",
  props: ["type", "hash"],
  components: {
    "verify-user": VerifyUser,
    "reset-password": ResetPassword
  }
};
</script>