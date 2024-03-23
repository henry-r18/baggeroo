<script setup>
import { ref } from 'vue';
import Dropzone from './Dropzone.vue';
import FileList from './FileList.vue';
import selectedFilesStore from '../store';

const selectedFiles = ref();

selectedFilesStore.onKeyChange("selectedFiles", (_selectedFiles) => selectedFiles.value = _selectedFiles);
</script>

<template>
    <Dropzone v-if="!selectedFiles" />
    <FileList v-if="selectedFiles" :selected-files="selectedFiles"/>
</template>