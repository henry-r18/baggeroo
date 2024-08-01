<script setup>
import { invoke } from '@tauri-apps/api/core';

const props = defineProps(['newBag']);

const runBagr = () => {
  invoke("run_bagr", { 
    selectedPaths: props.newBag.bagEntries.map( entry => entry.path ),
    tagsList: { "tags": props.newBag.bagInfo },
    algorithmStrings: props.newBag.digestAlgorithms,
    targetDirectory: props.newBag.targetDirectory
  }).then(result => console.log(result));
}

</script>

<template>
  <Card :pt="{ root: 'h-full', body: 'h-full', content: 'h-full' }">
    <template #title>
      <p>Review Bag</p>
    </template>

    <template #content>
      <ul class="list-none">
        <li>Bag Paths: {{ newBag.bagEntries.map( entry => entry.path ) }}</li>
        <li>Target Directory: {{ newBag.targetDirectory }}</li>
        <li>Bag Info: {{ newBag.bagInfo }}</li>
        <li>Hash Algorithms: {{ newBag.digestAlgorithms }}</li>
      </ul>
      
    </template>

    <template #footer>
      <Toolbar style="border-style: none">
        <template #start>
          <Button
            label="Back"
            icon="pi pi-arrow-left"
            iconPos="left"
            severity="secondary"
            raised
            @click="$emit('stepButtonClicked', '2')"
          />
        </template>

        <template #end>
          <Button
            label="Create Bag!"
            raised
            @click="runBagr"
          />
        </template>
      </Toolbar>
    </template>
  </Card>
</template>
