<script setup>
defineProps(['showHelp'])
</script>

<template>
    <Dialog :visible="showHelp">
        <p class="text-lg">Baggerroo</p>
    </Dialog>
</template>