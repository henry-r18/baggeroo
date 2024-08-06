<script setup>
defineProps(['showSettings'])
</script>

<template>
    <Dialog :visible="showSettings">
        <p class="text-lg">Settings</p>
    </Dialog>
</template>