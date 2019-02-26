<template>
  <div class="stepper-container">
    <q-stepper ref="stepper" class="stepper">
      <q-step default title="Step 1" subtitle="Admin Email">
        <div class="row q-pa-sm justify-center">
          Current Admin Email: {{currentConfig.adminEmail}}
        </div>
        <q-input v-model="stepperConfig.adminEmail" placeholder="New Admin Email" />
        <q-stepper-navigation>
          <q-btn color="indigo" @click="$refs.stepper.next()" label="Continue" />
        </q-stepper-navigation>
      </q-step>
      <q-step title="Step 2" subtitle="Private Portal">
        <div class="row q-pa-sm justify-center">
          Portal Private Mode
        </div>
        <div class="row q-pa-sm justify-center">
          <q-toggle v-model="stepperConfig.isPrivatePortal" label="Portal Private" />
        </div>
        <q-stepper-navigation>
          <q-btn
            flat
            color="deep-orange"
            @click="$refs.stepper.previous()"
            label="back"
          />
          <q-btn
            color="indigo"
            @click="$refs.stepper.next()"
            label="Continue"
          />
        </q-stepper-navigation>
      </q-step><q-step title="Step 3" subtitle="Require Invitation">
        <div class="row q-pa-sm justify-center">
          Invitation Required
        </div>
        <div class="row q-pa-sm justify-center">
          <q-toggle v-model="stepperConfig.requiresInvite" label="Invite Required" />
        </div>
        <q-stepper-navigation>
          <q-btn
            flat
            color="deep-orange"
            @click="$refs.stepper.previous()"
            label="back"
          />
          <q-btn
            color="indigo"
            @click="$refs.stepper.next()"
            label="Continue"
          />
        </q-stepper-navigation>
      </q-step>
      <q-step title="Final Step" subtitle="Review and submit">
        <div class="row q-pa-sm justify-center">
          Admin Email: {{ stepperConfig.adminEmail || currentConfig.adminEmail }}
        </div>
        <div class="row q-pa-sm justify-center">
          Portal is Private: {{ stepperConfig.isPrivatePortal ? 'Yes' : 'No' }}
        </div>
        <div class="row q-pa-sm justify-center">
            Requires Invitation: {{ stepperConfig.requiresInvite ? 'Yes' : 'No' }}
        </div>
        <q-stepper-navigation >
          <q-btn
            flat
            color="deep-orange"
            @click="$refs.stepper.previous()"
            label="back"
          />
          <q-btn
            color="green"
            @click.prevent="handleSubmit"
            label="Submit"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<style>
.stepper-container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
.stepper {
  width: 50%;
  min-width: 500px;
  background: white;
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex';

const getters = mapGetters({
  currentConfig: 'configuration/getCopy'
});

export default {
  data() {
    return {
      stepperConfig: {
        adminEmail: null,
        requiresInvite: true,
        isPrivatePortal: false,
      },
    }
  },
  computed: {
    ...getters,
  },
  methods: {
    ...mapActions('configuration', {
      updateConfiguration: 'update'
    }),
    handleSubmit() {
      const data = {
        adminEmail: this.stepperConfig.adminEmail || this.currentConfig.adminEmail,
        requiresInvite: this.stepperConfig.requiresInvite,
        isPrivatePortal: this.stepperConfig.isPrivatePortal,
      };
      this.updateConfiguration([1, data])
        .then(console.log, console.error);
    },
  },
}
</script>
