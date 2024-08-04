<script setup>
import { ref } from 'vue';
import { useToast } from "primevue/usetoast";
import { invoke } from '@tauri-apps/api/core';

const props = defineProps(['newBag']);

const loading = ref(false);
const toast = useToast();

const runBagr = () => {
  loading.value = true;
  invoke("run_bagr", { 
    selectedPaths: props.newBag.bagEntries.map( entry => entry.path ),
    tagsList: { "tags": props.newBag.bagInfo },
    algorithmStrings: props.newBag.digestAlgorithms,
    targetDirectory: props.newBag.targetDirectory
  }).then(result => {
    result ? 
      toast.add({ severity: 'success', summary: 'Success!', detail: 'The bag was created successfully', life: 3000 })
      : toast.add({ severity: 'error', summary: 'Error', detail: 'A problem occurred while attempting to create the bag', life: 3000 });
    loading.value = false;
  });
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
            severity="secondary"
            icon="pi pi-arrow-left"
            iconPos="left"
            :disabled="loading"
            raised
            @click="$emit('stepButtonClicked', '2')"
          />
        </template>

        <template #end>
          <Toast />
          <Button
            label="Create Bag!"
            :loading="loading"
            raised
            @click="runBagr"
          />
        </template>
      </Toolbar>
    </template>
  </Card>
</template>
