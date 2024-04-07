<script setup>
import { ref } from "vue";
import Card from "primevue/card";
import { listen } from "@tauri-apps/api/event";

const animateFileDropIcon = ref(false);
listen('tauri://file-drop-hover', () => animateFileDropIcon.value = true);
listen('tauri://file-drop-cancelled', () => animateFileDropIcon.value = false);

</script>

<template>
  <Card
    :pt="{ root: 'h-full', body: 'h-full flex flex-col', content: 'm-auto' }"
  >
    <template #content>
      <div class="flex items-center justify-center flex-col">
        <i
          class="pi pi-file-import border border-2 rounded-full p-8 text-8xl text-gray-400 dark:text-surface-600 border-gray-400 dark:border-surface-600"
          :class="{'animate-pulse': animateFileDropIcon}"
        ></i>
        <p class="mt-4 mb-0">Drag and drop files to here to add to Bag.</p>
      </div>
    </template>
  </Card>
</template>

<style scoped></style>
