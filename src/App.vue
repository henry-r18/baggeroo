<script setup>
import { inject } from 'vue';
import Menu from './components/Menu.vue';
import NewBagStepper from './components/NewBagStepper.vue';

const appVersion = inject('appVersion');

</script>

<template>
  <main class="flex flex-col h-full">

    <section>
      <Menu />
    </section>

    <section class="grow">
        <NewBagStepper></NewBagStepper>
    </section>

    <section class="flex-none">
        <div class="text-end p-3 text-xs">v{{ appVersion }}</div>
    </section>

  </main>
</template>

<style scoped>

</style>
