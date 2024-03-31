<script setup>
import { open } from '@tauri-apps/plugin-dialog';
</script>

<template>
    <p>
        Drag and drop here<br />
        or add files below...
    </p>

    <p class="error" v-if="errorMessage"> {{ errorMessage }}</p>
</template>

<style scoped>
.error {
  color: #e31313
}
</style>