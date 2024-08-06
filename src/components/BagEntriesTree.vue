<script setup>
import { ref, computed } from "vue";
import { removeFiles } from "../store";

const props = defineProps(["newBag","readOnly"]);

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
      selectable: false,
      children: selectedFilesTreeNodes,
    },
  ];
});

const selectedFilesTreeExpandedKeys = {
  0: true,
};

const selectedKeys = ref({});

const selectedNodeDesignTokens = ref({
  node: {
    selectedBackground: "var(--p-tree-node-hover-background)",
    selectedColor: "var(--p-tree-node-hover-color)",
    iconSelectedColor: "var(--p-tree-node-icon-hover-color)",
  },
});
</script>

<template>

    <Button
    v-if="!readOnly"
    label="Remove Selected"
    :severity="Object.keys(selectedKeys).length ? 'danger': 'secondary'"
    :disabled="!Object.keys(selectedKeys).length"
    size="small"
    outlined
    @click="removeFiles(Object.keys(selectedKeys)); selectedKeys = {}"
  />

  <Tree
    class=""
    :value="selectedFilesTree"
    :expandedKeys="selectedFilesTreeExpandedKeys"
    v-model:selectionKeys="selectedKeys"
    :selectionMode="!readOnly ? 'multiple' : null"
    :metaKeySelection="true"
    :dt="selectedNodeDesignTokens"
  />
</template>
