<script setup>
import { onMounted, ref, inject } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { open } from '@tauri-apps/plugin-dialog';
import { selectedFilesStore, handleNewFiles } from './store';
import Menu from './components/Menu.vue';
import NewBagStepper from './components/NewBagStepper.vue';

const appVersion = inject('appVersion');

async function runBagr(targetDirectory) {
  let _selectedPaths = await selectedFilesStore.get("selectedFiles")
    .then( files => files.map(file => file.path));
  invoke("run_bagr", { selectedPaths: _selectedPaths, algorithmStrings: ['md5'], targetDirectory: targetDirectory });
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

    <section>
      <Menu />
    </section>

    <section class="grow">
        <!-- <Dropzone v-if="!selectedFiles.length" class="h-full flex flex-col items-center justify-center" />

        <Suspense>
          <FileTree v-if="selectedFiles.length" :selected-files="selectedFiles" @create-bag="(targetDirectory) => runBagr(targetDirectory)" />
          
          <template #fallback>
            <ProgressSpinner />
          </template>
        </Suspense> -->

        <NewBagStepper></NewBagStepper>
        
    </section>

    <section class="flex-none">
        <div class="text-end p-3 text-xs">v{{ appVersion }}</div>
    </section>

  </main>
</template>

<style scoped>

</style>
