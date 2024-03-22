<script setup>
import { ref } from 'vue';
import { open } from '@tauri-apps/plugin-dialog';
import { listen } from '@tauri-apps/api/event';
import { stat } from '@tauri-apps/plugin-fs';

const dropped = ref([]);
const errorMessage = ref('');

listen('tauri://file-drop', event => {
  try {
    if (!event.payload) { throw Error('Something went wrong.') }

    event.payload.paths.forEach( async path => {
      const metadata = await stat(path);
      // TODO: handle listing directories
      dropped.value.push({path, ...metadata});
    })
  } catch (error) {
    errorMessage.value = error;
  }
})
</script>

<template>
    <p>
        <a href="#" @click="open({multiple: true, directory: true})">Select files</a><br />
        or drag and drop here
    </p>

    {{ dropped }}

    <p class="error" v-if="errorMessage"> {{ errorMessage }}</p>
</template>

<style scoped>
.error {
  color: #e31313
}
</style>