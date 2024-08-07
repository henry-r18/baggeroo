<script setup>
defineProps(["showHelp", "appVersion"]);
defineEmits(["update:showHelp"]);
</script>

<template>
  <Dialog
    class="prose dark:prose-invert"
    :visible="showHelp"
    :closeOnEscape="true"
    modal
    @update:visible="$emit('update:showHelp', value)"
  >
    <p class="text-2xl">Baggeroo v{{ appVersion }}</p>

    <p>
      Baggeroo makes it easy to generate directory structures that conform to
      the
      <a href="https://datatracker.ietf.org/doc/html/rfc8493" target="_blank"
        >BagIt v1.0</a> specification.
    </p>

    <p>Steps for using Baggeroo:</p>

    <ol>
      <li>Select the files you want to Bag</li>
      <li>Choose an output location</li>
      <li>Select the hash algorithms you want to use</li>
      <li>Set tags (i.e. metadata values) for the Bag</li>
      <li>Run Baggeroo!</li>
    </ol>
  </Dialog>
</template>
