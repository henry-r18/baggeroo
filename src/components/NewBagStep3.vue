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
      <div class="flex h-full">
        <BagEntriesTree :new-bag="newBag" :read-only="true"/>

        <Fieldset class="grow" legend="Configuration">
        <ul class="list-none">
          <li>
            <label class="font-bold">Output location:</label> 
            {{ newBag.targetDirectory }}
          </li>
          <li>
            <label class="font-bold">Hash Algorithm(s):</label>
            {{ newBag.digestAlgorithms.join(', ') }}
          </li>
          <li>
            <label class="font-bold">Bag Info:</label>
            <p class="indent-8" v-for="tag in newBag.bagInfo">{{ tag.label }}: {{ tag.value }}</p>
          </li>
        </ul>
      </Fieldset>
      </div>
      
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
