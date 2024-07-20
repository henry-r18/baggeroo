<script setup>
import { computed } from "vue";
import { removeFile } from "../store";
import prettyBytes from "pretty-bytes";

const props = defineProps(["selectedFiles"]);

const nodes = computed(() => {
  let bag = {
    key: "0",
    label: "data",
    data: "Bag root",
    icon: "pi pi-shopping-bag",
    children: [],
  };

  props.selectedFiles.map((selectedFile, index) => {
    selectedFile.prettySize = prettyBytes(selectedFile.size);
    let child = {
      key: `0-${index}`,
      label: selectedFile.basename,
      data: "Test",
      icon: selectedFile.isDirectory ? "pi pi-folder" : "pi pi-file",
    };
    bag.children.push(child);
  });

  return [bag];
});

const expandedKeys = {
  '0': true
}

const totalBytes = computed(() => {
  return props.selectedFiles.reduce((acc, cur) => acc + cur.size, 0);
});
</script>

<template>
  <div class="h-full grid grid-rows-2 grid-cols-2 gap-4 p-8">
    <Card>
      <template #title>Bag Info</template>
      <template #content>
        <ul class="list-none">
          <li>Payload-Oxum: {{ totalBytes }}.{{ selectedFiles.length }}</li>
          <li>Bagging-Date: {{ new Date().toISOString().split('T')[0] }}</li>
          <li>Bag-Size: {{ prettyBytes(totalBytes) }}</li>
        </ul>
      </template>
    </Card>

    <Card :pt="{body: 'grow', content: 'grow', footer: 'flex justify-end p-8'}" class="row-span-2">
      <template #title>Bag Payload</template>

      <template #content>
        <Tree class="h-full" :value="nodes" :expandedKeys="expandedKeys"></Tree>
      </template>

      <template #footer>
        <Button label="Create Bag" icon="pi pi-shopping-bag" raised @click="$emit('createBag')"/>
      </template>
    </Card>

    <Card>
      <template #title>Tag Manifests</template>
    </Card>
  </div>
</template>