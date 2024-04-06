<script setup>
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-dialog';
import { selectedFilesStore, handleNewFiles } from './store';
import Dropzone from './components/Dropzone.vue';

async function runBagr() {
  let _selectedPaths = await selectedFilesStore.get("selectedFiles")
    .then( files => files.map(file => file.path));
  invoke("run_bagr", { selectedPaths: _selectedPaths, algorithmStrings: ['md5'] });
}

async function addFiles() {
  let fileDialogSelection = await open({
    multiple: true,
    title: 'Add files to Bag'
  }).then(files => files ? files.map(file => file.path) : null);

  if (fileDialogSelection) {
      handleNewFiles(fileDialogSelection)
      .catch(error => errorMessage.value = error);
  }
}

const errorMessage = ref('');
const showMenu = ref(false);

</script>

<template>
  <div class="flex flex-col h-full parent">
    <div class="flex flex-row justify-end items-center p-4 h-16 cursor-pointer">
      <i class="pi pi-cog" style="font-size: 1.5rem; color: var(--secondary)"></i>
    </div>
    <div class="grow">
      <Dropzone />
    </div>
    <div class="h-16">03</div>
  </div>
</template>

<style scoped>
.parent > * {
  border: 1px dotted red;
}
</style>
