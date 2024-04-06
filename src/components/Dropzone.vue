<script setup>
import Card from 'primevue/card';
</script>

<template>
  <Card :pt="{root: 'h-full', body: 'h-full flex flex-col', content: 'm-auto'}">
    <template #content>
      <div class="flex items-center justify-center flex-col">
        <i
          class="pi pi-cloud-download border-2 p-5 text-8xl text-surface-400 dark:text-surface-600 border-surface-400 dark:border-surface-600"
        ></i>
        <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
      </div>
    </template>
  </Card>
</template>

<style scoped></style>
