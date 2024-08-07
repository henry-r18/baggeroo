<script setup>
import { listen } from "@tauri-apps/api/event";
import { open } from "@tauri-apps/plugin-dialog";
import { useToast } from "primevue/usetoast";
import { handleNewFiles } from "../store";
import BagEntriesTree from "./BagEntriesTree.vue";
import prettyBytes from "pretty-bytes";

const props = defineProps(["newBag"]);
defineEmits(["stepButtonClicked"]);

const toast = useToast();

// Tauri listen returns an unlistener to use when unmounting component
const unlisten = listen("tauri://file-drop", (event) =>
  handleNewFiles(event.payload.paths).catch((error) =>
    toast.add({
      severity: "warn",
      summary: "Message",
      detail: error,
      life: 3000,
    })
  )
);

const fileSelectionDialog = () =>
  open({
    multiple: true,
    title: "Select files for Bag",
  })
  .then((selected) =>
    selected ? handleNewFiles(selected.map((file) => file.path)) : null
  )
  .catch((error) =>
    toast.add({
      severity: "warn",
      summary: "Message",
      detail: error,
      life: 3000,
    })
  );
</script>

<template>
  <Toast />

  <Dropzone
    v-if="!newBag.bagEntries.length"
    class="h-full flex flex-col items-center justify-center"
    @select-files="fileSelectionDialog"
  />

  <Card
    v-if="newBag.bagEntries.length"
    :pt="{ root: 'flex flex-col h-full', body: 'grow', content: 'grow' }"
  >
    <template #title>
      <p>Bag Payload</p>
      <p class="text-sm text-slate-400">
        Total size: {{ prettyBytes(newBag.totalBytes) }}
      </p>
    </template>

    <template #content>
      <BagEntriesTree :new-bag="newBag" />
    </template>

    <template #footer>
      <Toolbar style="border-style: none" :pt="{ end: 'gap-4' }">
        <template #start> </template>

        <template #end>
          <Button
            label="Add files"
            icon="pi pi-file-import"
            iconPos="left"
            severity="secondary"
            raised
            @click="fileSelectionDialog"
          />

          <Button
            label="Next"
            icon="pi pi-arrow-right"
            iconPos="right"
            raised
            @click="
              unlisten.then((unlistener) => unlistener());
              $emit('stepButtonClicked', '2');
            "
          />
        </template>
      </Toolbar>
    </template>
  </Card>
</template>
