<script setup>
import { computed } from 'vue';
import { removeFile } from '../store'
import prettyBytes from 'pretty-bytes';

const props = defineProps(['selectedFiles']);

const headers = ['Path', 'Size', 'Last Modification Time'];

const totalBytes = computed(() => {
  return props.selectedFiles.reduce((acc,cur) => acc + cur.size, 0);
});
</script>

<template>
  <div class="file-list">
    <table>
      <thead>
        <tr>
          <th v-for="header in headers">{{ header }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="file in selectedFiles">
          <td>
            <span class="material-icons-outlined" v-show="file.isFile">insert_drive_file</span>
            <span class="material-icons-outlined" v-show="file.isDirectory">folder</span>
          </td>
          <td>{{ file.path }}</td>
          <td>{{ prettyBytes(file.size) }}</td>
          <td>{{ new Date(file.mtime).toLocaleString() }}</td>
          <td><span class="material-icons-outlined remove-icon" @click="removeFile(file.path)">remove_circle_outline</span></td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td colspan="3" align="right">Total Size: {{ prettyBytes(totalBytes) }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<style scoped>
.file-list {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.file-list table {
  flex-grow: 1;
  width: 100%;
  padding: 1.5rem;
  overflow-y: scroll;
}

tbody {
  vertical-align: top;
}

a {
  margin-left: auto;
}

.remove-icon {
  color: red;
  font-size: 1rem;
  cursor: pointer;
}
</style>