<script setup>
import { ref } from 'vue';
import { open } from '@tauri-apps/plugin-dialog';
import { listen } from '@tauri-apps/api/event';

const dropped = ref([]);

listen('tauri://file-drop', event => {
  dropped.value = event;
})
</script>

<template>
    <p>
        <a href="#" @click="open({multiple: true, directory: true})">Select files</a><br />
        or drag and drop here
    </p>

    {{ dropped }}
</template>