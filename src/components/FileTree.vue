<script setup>
import { ref, computed, onMounted } from "vue";
import { open } from '@tauri-apps/plugin-dialog';
import { homeDir } from "@tauri-apps/api/path";
import { removeFile } from "../store";
import prettyBytes from "pretty-bytes";

const props = defineProps(["selectedFiles"]);

const bagTree = computed(() => {

  const sortDirectoriesFirst = (a, b) => {
    const aIsDirectory = a.fileInfo && a.fileInfo.isDirectory;
    const bIsDirectory = b.fileInfo && b.fileInfo.isDirectory;
    if (a === b) {
      return 0;
    }
    if (aIsDirectory) {
      return -1;
    }
    return 1;
  };

  const createNodeFromBagEntry = (bagEntry) => {
    return {
      key: bagEntry.path,
      label: bagEntry.basename,
      data: bagEntry.fileInfo,
      icon: bagEntry.fileInfo && bagEntry.fileInfo.isDirectory ? "pi pi-folder" : "pi pi-file",
      children: bagEntry.children ? bagEntry.children
      .filter( child => !child.isDotfile )
      .map( child => createNodeFromBagEntry(child) )
      .sort(sortDirectoriesFirst)
      : null
    };
  }

  let bagTreeNodes = props.selectedFiles
  .filter( bagEntry => !bagEntry.isDotfile )
  .map( bagEntry => createNodeFromBagEntry(bagEntry) )
  .sort(sortDirectoriesFirst);
  
  // Return initial Bag Data node with bagTreeNodes as children
  return [{
    key: "0",
    label: "data",
    data: "Bag Data",
    icon: "pi pi-shopping-bag",
    children: bagTreeNodes,
  }];
});

const expandedKeys = {
  '0': true
};

const totalBytes = computed(() => {
  let bagEntries = props.selectedFiles;
  let sizeSum = 0;

  function traverseBagEntries(bagEntries) {
    bagEntries.forEach( bagEntry => {
      if ( bagEntry.fileInfo ) {
        sizeSum += bagEntry.fileInfo.size;
      }

      if ( bagEntry.children ) {
        traverseBagEntries( bagEntry.children );
      }
    })
  };

  traverseBagEntries(bagEntries);
  return sizeSum;
});

const targetDirectory = ref()

const setTargetDirectory = async () => {
  targetDirectory.value = await open({
    multiple: false,
    directory: true,
    title: "Select Target Directory for Bag",
    defaultPath: await homeDir()
  })
}

onMounted( async () => targetDirectory.value = await homeDir() );
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

    <Card :pt="{body: 'grow', content: 'grow'}" class="row-span-2">
      <template #title>
        <Toolbar style="border-style: none;">
          <template #start>
            <p>Bag Payload</p>
          </template>

          <template #end>
            <div class="flex flex-col">
              <Button label="Set Target Directory" severity="secondary" icon="pi pi-file-export" iconPos="right" text @click="setTargetDirectory"/>
              <p class="font-mono">{{ targetDirectory }}</p>
            </div>
          </template>
        </Toolbar>
      </template>

      <template #content>
        <Tree class="h-full" :value="bagTree" :expandedKeys="expandedKeys"></Tree>
      </template>

      <template #footer>
        <Toolbar style="border-style: none;">
          <template #start>
            
          </template>

          <template #end>
            <Button label="Create Bag" icon="pi pi-shopping-bag" raised @click="$emit('createBag', targetDirectory)"/>
          </template>

        </Toolbar>
      </template>
    </Card>

    <Card>
      <template #title>Tag Manifests</template>
    </Card>
  </div>
</template>