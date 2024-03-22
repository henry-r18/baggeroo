<script setup>
import Dropzone from './components/Dropzone.vue';
import FileList from './components/FileList.vue';

const bagFiles = true;
</script>

<template>
  <main>
    <div class="sidebar menu">
    
    </div>

    <div class="header">

    </div>

    <div class="file-list box">
      <Dropzone v-if="!bagFiles" />
      <FileList v-if="bagFiles" />
    </div>

    <div class="footer">
      <button>Generate bag</button>
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

@media (prefers-color-scheme: dark) {
  .box, .menu {
    background-color: #f6f6f6;
  }
}

.box {
  border-radius: 24px;
  color: #0f0f0f;
}

button {
  height: 3rem;
}

</style>
