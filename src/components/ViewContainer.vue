<script setup>
import { ref } from 'vue';
import { listen } from '@tauri-apps/api/event';
import { stat } from '@tauri-apps/plugin-fs';
import selectedFilesStore from '../store';
import Dropzone from './Dropzone.vue';
import FileList from './FileList.vue';

const selectedFiles = ref();
selectedFiles.value = await selectedFilesStore.get('selectedFiles');
const errorMessage = ref('');

async function getMetadata(paths) {
  let metadata = paths.map( async path => {
    let fileInfo = await stat(path); // stat() returns FileInfo object
    return {path, ...fileInfo}; // construct metadata object
  })
  return await Promise.all(metadata);
}

async function appendSelectedFiles(newSelectedFiles) {
  let currentSelectedFiles = await selectedFilesStore.get('selectedFiles');
  if (currentSelectedFiles) {
    newSelectedFiles = [...currentSelectedFiles, ...newSelectedFiles];
  }
  selectedFilesStore.set("selectedFiles", newSelectedFiles);
}

function filterAlreadySelected(paths) {
  return paths.filter( path => {
    let isAlreadySelected = selectedFiles.value
      .some( file => file.path == path);
    return !isAlreadySelected;
  })
}

listen('tauri://file-drop', async (event) => {
  try {
    if (!event.payload) { throw Error('Problem with dropped files.'); }
    let paths = filterAlreadySelected(event.payload.paths);
    let droppedFilesMetadata = await getMetadata(paths);
    appendSelectedFiles(droppedFilesMetadata);
  } catch (error) {
    errorMessage.value = error;
  }
})

selectedFilesStore.onKeyChange("selectedFiles", (_selectedFiles) => selectedFiles.value = _selectedFiles);
</script>

<template>
    <Dropzone v-if="!selectedFiles" />
    <FileList v-if="selectedFiles" :selected-files="selectedFiles"/>
    {{ errorMessage }}
</template>