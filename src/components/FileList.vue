<script setup>
defineProps(['selectedFiles']);
import prettyBytes from 'pretty-bytes';

const headers = ['Path', 'Size', 'Last Modification Time'];

</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in headers">{{ header }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="file in selectedFiles">
        <td>{{ file.path }}</td>
        <td>{{ prettyBytes(file.size) }}</td>
        <td>{{ new Date(file.mtime).toLocaleString() }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  padding: 1.5rem;
  align-self: start;
}
</style>