<script setup>
import { onMounted, ref, inject } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { open } from '@tauri-apps/plugin-dialog';
import { selectedFilesStore, handleNewFiles } from './store';
import Dropzone from './components/Dropzone.vue';
import FileTree from './components/FileTree.vue';

const appVersion = inject('appVersion');

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
  <main class="flex flex-col h-full">

    <section class="flex flex-row justify-end pe-8 pt-8">
      <i class="pi pi-cog" style="font-size: 1.5rem; color: var(--secondary)"></i>
    </section>

    <section class="grow">
        <Dropzone v-if="!selectedFiles.length" class="h-full flex flex-col items-center justify-center" />
        <FileTree v-if="selectedFiles.length" :selected-files="selectedFiles" @create-bag="runBagr"/>
    </section>

    <section class="flex-none">
        <div class="text-end p-3 text-xs">v{{ appVersion }}</div>
    </section>

  </main>
</template>

<style scoped>

</style>
