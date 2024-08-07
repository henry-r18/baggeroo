<script setup>
import { ref, watch } from "vue";

defineProps(["showSettings"]);
defineEmits(["update:showSettings"]);

const darkModeOn = ref(false);
watch(darkModeOn, (setting) => setting 
    ? document.querySelector("html").classList.add("dark-mode-switch")
    : document.querySelector("html").classList.remove("dark-mode-switch") 
);

</script>

<template>
  <Dialog
    class="prose dark:prose-invert"
    :visible="showSettings"
    @update:visible="$emit('update:showSettings', value)"
  >
    <p class="text-2xl">Settings</p>

    <ToggleButton
      v-model="darkModeOn"
      onLabel="Dark Mode"
      offLabel="Light Mode"
      onIcon="pi pi-moon"
      offIcon="pi pi-sun"
      class="w-36"
      aria-label="Dark mode toggle"
    />
  </Dialog>
</template>
