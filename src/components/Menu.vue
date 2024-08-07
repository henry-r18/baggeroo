<script setup>
defineEmits(["helpButtonClicked", "settingsButtonClicked"]);
</script>

<template>
  <MenuBar style="border-style: none">
    <template #start>
      <Button
        icon="pi pi-question-circle"
        severity="secondary"
        text
        aria-label="Help"
        size="large"
        :dt="{ lgFontSize: '1.5rem' }"
        @click="$emit('helpButtonClicked')"
      />
    </template>

    <template #end>
      <Button
        icon="pi pi-cog"
        severity="secondary"
        text
        aria-label="Settings"
        size="large"
        :dt="{ lgFontSize: '1.5rem' }"
        @click="$emit('settingsButtonClicked')"
      />
    </template>
  </MenuBar>
</template>
