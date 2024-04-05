<script setup>
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-dialog';
import { selectedFilesStore, handleNewFiles } from './store';
import SideMenu from './components/SideMenu.vue';

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
  <div class="grid h-100">
    <i class="g-col-2 side-menu bi bi-list text-center" @click="showMenu = !showMenu"></i>
    <SideMenu class="g-col-2" />
    <div class="g-col-10 header"></div>
    <div class="g-col-10 dropzone"></div>
    <div class="g-col-10 footer"></div>
  </div>
</template>

<style scoped>
.grid {
  --bs-columns: 12;
  --bs-rows: 12;
  --bs-gap: 1rem 3rem;
}

.grid > * {
  border: 1px dotted red;
}

.side-menu {
  grid-row: span 12;
}

.header, .dropzone, .footer {
  grid-column-start: 3;
}

.dropzone {
  grid-row: span 10;
}
</style>
