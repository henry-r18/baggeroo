<script setup>
import { onMounted, ref } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { open } from '@tauri-apps/plugin-dialog';
import { selectedFilesStore, handleNewFiles } from './store';
import Dropzone from './components/Dropzone.vue';
import FileList from './components/FileList.vue';
import Button from 'primevue/button';

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

listen('tauri://file-drop', event => handleNewFiles(event.payload.paths)
  .catch(error => errorMessage.value = error));

const selectedFiles = ref([]);

const errorMessage = ref('');
const showSettings = ref(false);

onMounted(async () => {
  selectedFiles.value = await selectedFilesStore.get('selectedFiles'); // load from store on component setup
  selectedFilesStore.onKeyChange("selectedFiles", (_selectedFiles) => selectedFiles.value = _selectedFiles); // reload when value changes for key in store
});

</script>

<template>
  <div class="flex flex-col h-full parent dark:bg-gradient-to-br from-lime-700 to-lime-900">
    <div class="flex flex-row justify-end items-center p-4 h-16 cursor-pointer">
      <i class="pi pi-cog" style="font-size: 1.5rem; color: var(--secondary)"></i>
    </div>
    <div class="grow">
      <Dropzone v-if="!selectedFiles.length" />
      <FileList v-if="selectedFiles.length" :selected-files="selectedFiles" />
    </div>
    <div class="h-20">
      <div class="flex flex-wrap px-4 gap-2 justify-end">
        <Button type="button" label="Add files" raised style="background-color: var(--secondary); border-color: var(--secondary);" aria-label="Add files" />
        <Button type="button" label="Create Bag" raised style="background-color: var(--accent-1); border-color: var(--accent-1);" aria-label="Create Bag" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
