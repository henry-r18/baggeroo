<script setup>
import { open } from '@tauri-apps/plugin-dialog';
import { listen } from '@tauri-apps/api/event';
import { stat } from '@tauri-apps/plugin-fs';
import selectedFilesStore from '../store';

listen('tauri://file-drop', async (event) => {
  try {
    if (!event.payload) { throw Error('Something went wrong.'); }
    let _selectedFilesMetadata = await getMetadata(event.payload.paths); 
    selectedFilesStore.set("selectedFiles", _selectedFilesMetadata);
  } catch (error) {
    errorMessage.value = error;
  }
})

// TODO: handle directories
async function getMetadata(paths) {
  return await Promise.all(
    paths.map( async path => {
      let fileInfo = await stat(path); // stat() returns FileInfo object
      return {path, ...fileInfo}; // construct metadata object
    }) 
  )}
</script>

<template>
    <p>
        <a href="#" @click="open({multiple: true, directory: true})">Select files</a><br />
        or drag and drop here
    </p>

    {{ selectedFiles }}

    <p class="error" v-if="errorMessage"> {{ errorMessage }}</p>
</template>

<style scoped>
.error {
  color: #e31313
}
</style>