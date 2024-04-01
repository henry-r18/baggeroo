<script setup>
import ViewContainer from './components/ViewContainer.vue';
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-dialog';
import { selectedFilesStore, handleNewFiles } from './store';

async function runBagr() {
  let _selectedPaths = await selectedFilesStore.get("selectedFiles")
    .then( files => files.map(file => file.path));
  invoke("run_bagr", { selectedPaths: _selectedPaths, algorithmStrings: ['md5'] });
}

async function addFiles() {
  let fileDialogSelection = await open({
    multiple: true,
    title: 'Add files to Bag'
  }).then(files => files ? files.map(file => file.path) : null);

  if (fileDialogSelection) {
      handleNewFiles(fileDialogSelection)
      .catch(error => errorMessage.value = error);
  }
}

const errorMessage = ref('');
</script>

<template>
  <main>
    <div class="sidebar menu">
    
    </div>

    <div class="header">

    </div>

    <div class="file-list box">
      <Suspense>
        <ViewContainer :containerErrorMessage="errorMessage" />
      </Suspense>
    </div>

    <div class="footer">
      <button class="secondary" @click="addFiles">Add files</button>
      <button @click="runBagr">Generate bag</button>
    </div>
  </main>
</template>

<style scoped>
main {
  display: grid;
  height: 100dvh;
  grid-template-areas: 
    "sidebar header"
    "sidebar file-list"
    "sidebar footer";
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 25px auto 100px;
  gap: 1rem;
}

.sidebar { grid-area: sidebar; }
.header { grid-area: header; }
.file-list {
  grid-area: file-list;
  display: grid;
  place-items: center;
}
.footer { 
  grid-area: footer; 
  display: flex;
  align-items: center;
  justify-content: end;
}

.box, .menu {
  background-color: #f1f1f1;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

.box {
  border-radius: 24px;
  color: var(--primary);
}

button {
  height: 3rem;
  margin: 0.33rem;
}

.secondary {
  background-color: var(--secondary);
};

@media (prefers-color-scheme: dark) {
  .box, .menu {
    background-color: #f6f6f6;
  }
}

</style>
