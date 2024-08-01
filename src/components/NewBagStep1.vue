<script setup>
import { computed } from "vue";
import prettyBytes from "pretty-bytes";

const props = defineProps(['newBag']);
defineEmits(['stepButtonClicked']);

const selectedFilesTree = computed(() => {
  const sortTreeNodes = (a, b) => {
    const aIsDirectory = a.data && a.data.isDirectory;
    const bIsDirectory = b.data && b.data.isDirectory;

    if (aIsDirectory && !bIsDirectory) {
      return -1;
    }
    if (!aIsDirectory && bIsDirectory) {
      return 1;
    }
    return a.label.localeCompare(b.label);
  };

  const createNodeFromBagEntry = (bagEntry) => {
    return {
      key: bagEntry.path,
      label: bagEntry.basename,
      data: bagEntry.fileInfo,
      icon:
        bagEntry.fileInfo && bagEntry.fileInfo.isDirectory
          ? "pi pi-folder"
          : "pi pi-file",
      children: bagEntry.children
        ? bagEntry.children
            .filter((child) => !child.isDotfile)
            .map((child) => createNodeFromBagEntry(child))
            .sort(sortTreeNodes)
        : null,
    };
  };

  let selectedFilesTreeNodes = props.newBag.bagEntries
    .filter((bagEntry) => !bagEntry.isDotfile)
    .map((bagEntry) => createNodeFromBagEntry(bagEntry))
    .sort(sortTreeNodes);

  // Return initial Bag Data node with selectedFilesTreeNodes as children
  return [
    {
      key: "0",
      label: "data",
      data: "Bag Data",
      icon: "pi pi-shopping-bag",
      children: selectedFilesTreeNodes,
    },
  ];
});
const selectedFilesTreeExpandedKeys = {
  0: true,
};

</script>

<template>
  <Dropzone v-if="!newBag.bagEntries.length" class="h-full flex flex-col items-center justify-center" />

  <Card v-if="newBag.bagEntries.length" :pt="{ root: 'flex flex-col h-full', body: 'grow', content: 'grow' }">
    <template #title>
      <p>Bag Payload</p>
      <p class="text-sm text-slate-400">Total size: {{ prettyBytes(newBag.totalBytes) }}</p>
    </template>

    <template #content>
      <Tree class="h-full" :value="selectedFilesTree" :expandedKeys="selectedFilesTreeExpandedKeys"></Tree>
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
