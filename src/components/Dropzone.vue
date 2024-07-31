<script setup>
import { ref } from "vue";
import { listen } from "@tauri-apps/api/event";

const animateFileDropIcon = ref(false);
listen("tauri://file-drop-hover", () => (animateFileDropIcon.value = true));
listen(
  "tauri://file-drop-cancelled",
  () => (animateFileDropIcon.value = false)
);
</script>

<template>
  <div>
    <i
      class="pi pi-file-import border rounded-full p-8 !text-7xl"
      :class="{ 'animate-pulse': animateFileDropIcon }"
    ></i>
    <p class="mt-4 mb-0">Drag and drop files here to add to Bag.</p>
  </div>
</template>

<style scoped></style>
