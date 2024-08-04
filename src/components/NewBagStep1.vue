<script setup>
import BagEntriesTree from "./BagEntriesTree.vue";
import prettyBytes from "pretty-bytes";

const props = defineProps(['newBag']);
defineEmits(['stepButtonClicked']);

</script>

<template>
  <Dropzone v-if="!newBag.bagEntries.length" class="h-full flex flex-col items-center justify-center" />

  <Card v-if="newBag.bagEntries.length" :pt="{ root: 'flex flex-col h-full', body: 'grow', content: 'grow' }">
    <template #title>
      <p>Bag Payload</p>
      <p class="text-sm text-slate-400">Total size: {{ prettyBytes(newBag.totalBytes) }}</p>
    </template>

    <template #content>
      <BagEntriesTree :new-bag="newBag"></BagEntriesTree>
    </template>

    <template #footer>
      <Toolbar style="border-style: none">
        <template #start>
          
        </template>

        <template #end>
          <Button
            label="Next"
            icon="pi pi-arrow-right"
            iconPos="right"
            raised
            @click="$emit('stepButtonClicked', '2')"
          />
        </template>
      </Toolbar>
    </template>
  </Card>
</template>
