<script setup>
import { ref } from 'vue';
import { listen } from '@tauri-apps/api/event';
import { selectedFilesStore, handleNewFiles } from '../store';
import Dropzone from './Dropzone.vue';
import FileList from './FileList.vue';

const props = defineProps(['containerErrorMessage']);

const selectedFiles = ref();
selectedFiles.value = await selectedFilesStore.get('selectedFiles'); // load from store on component setup
selectedFilesStore.onKeyChange("selectedFiles", (_selectedFiles) => selectedFiles.value = _selectedFiles); // reload when value changes for key in store

listen('tauri://file-drop', event => handleNewFiles(event.payload.paths)
  .catch(error => errorMessage.value = error));

const errorMessage = ref('');

</script>

<template>
    <Dropzone v-if="!selectedFiles" />
    <FileList v-if="selectedFiles" :selected-files="selectedFiles"/>
    {{ errorMessage }} {{ containerErrorMessage }}
</template>