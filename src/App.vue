<script setup>
import { ref, inject } from 'vue';
import Menu from './components/Menu.vue';
import NewBagStepper from './components/NewBagStepper.vue';
import HelpDialog from './components/HelpDialog.vue';

const appVersion = inject('appVersion');

const showHelp = ref(false);
const showSettings = ref(false);

</script>

<template>
  <main class="flex flex-col h-full">

    <section>
      <Menu @help-button-clicked="showHelp = true" @settings-button-clicked="showSettings = true" />
    </section>

    <section class="grow">
        <NewBagStepper></NewBagStepper>
        <HelpDialog v-if="showHelp" :show-help="showHelp" />
        <SettingsDialog v-if="showSettings" :show-settings="showSettings" />
    </section>

    <section class="flex-none">
        <div class="text-end p-3 text-xs">v{{ appVersion }}</div>
    </section>

  </main>
</template>

<style scoped>

</style>
