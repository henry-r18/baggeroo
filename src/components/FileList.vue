<script setup>
import { computed } from "vue";
import { removeFile } from "../store";
import prettyBytes from "pretty-bytes";

import TreeTable from "primevue/treetable";
import Column from "primevue/column";
import Button from "primevue/button";

const props = defineProps(["selectedFiles"]);

const nodes = computed(() => {
  return props.selectedFiles.map((selectedFile) => {
    selectedFile.prettySize = prettyBytes(selectedFile.size);
    return {
      key: selectedFile.path,
      data: selectedFile,
      icon: selectedFile.isDirectory ? "pi pi-folder" : "pi pi-file",
    };
  });
});

const totalBytes = computed(() => {
  return props.selectedFiles.reduce((acc, cur) => acc + cur.size, 0);
});
</script>

<template>
  <div class="px-8">
    <TreeTable
      :value="nodes"
      :autolayout="true"
      size="narrow"
      removableSort
      :pt="{ table: { class: ['table-auto border-collapse w-full'] } }"
    >
      <!-- Row icon -->
      <Column headerStyle="width: 1.5rem">
        <template #body="{ node }">
          <div class="flex flex-wrap gap-2">
            <i :class="node.icon" aria-hidden="true"></i>
          </div>
        </template>
      </Column>
      <!-- Main rows -->
      <Column field="path" header="Path" sortable></Column>
      <Column field="prettySize" header="Size" sortable></Column>
      <Column field="mtime" header="Last Modified Time" sortable></Column>
      <!-- Delete button -->
      <Column headerStyle="width: 5rem">
        <template #body="{ node }">
          <div class="flex flex-wrap gap-2 text-sm">
            <Button
              type="button"
              icon="pi pi-times"
              size="extra-small"
              severity="danger"
              rounded
              outlined
              aria-label="Remove item"
              @click="removeFile(node.key)"
            />
          </div>
        </template>
      </Column>
    </TreeTable>
  </div>
</template>

<style scoped></style>
