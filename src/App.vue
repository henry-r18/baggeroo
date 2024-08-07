<script setup>
import { ref, inject } from "vue";
import Menu from "./components/Menu.vue";
import NewBagStepper from "./components/NewBagStepper.vue";
import HelpDialog from "./components/HelpDialog.vue";

const appVersion = inject("appVersion");

const showHelp = ref(false);
const showSettings = ref(false);
</script>

<template>
  <main class="flex flex-col h-full">
    <section>
      <Menu
        @help-button-clicked="showHelp = !showHelp"
        @settings-button-clicked="showSettings = !showSettings"
      />
    </section>

    <section class="grow">
      <NewBagStepper></NewBagStepper>
      <HelpDialog class="w-3/5 h-3/5" v-model:show-help="showHelp" :app-version="appVersion" />
      <SettingsDialog class="w-3/5 h-3/5" v-model:show-settings="showSettings" />
    </section>

    <section class="flex-none">
      <div class="text-end p-3 text-xs">v{{ appVersion }}</div>
    </section>
  </main>
</template>

<style scoped></style>
