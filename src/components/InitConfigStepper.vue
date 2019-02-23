<template>
  <div class="stepper-container">
    <q-stepper ref="stepper" class="stepper">
      <!-- Step: -->
      <q-step default title="First Step" subtitle="Here we go">
        .<q-input />
      </q-step>
      <!-- Step: -->
      <q-step title="Step 2">
        <q-input />
      </q-step>

      <!-- Step: -->
      <q-step title="Step 3" subtitle="Review and submit">...</q-step>
      <!--
        Optional.
        "Globally" available Stepper navigation which means
        that it will be visible regardless of the current step.
        If we'd put QStepperNavigation under a QStep then we'd
        be using it for that step only.
      -->
      <q-stepper-navigation>
        <q-btn
          flat
          @click="$refs.stepper.previous()"
          label="Back"
        />
        <q-btn
          @click="$refs.stepper.next()"
          label="Next"
        />
      </q-stepper-navigation>
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
