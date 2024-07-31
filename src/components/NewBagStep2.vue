<script setup>
import { onMounted, ref } from "vue";
import { open } from "@tauri-apps/plugin-dialog";
import { homeDir } from "@tauri-apps/api/path";
import prettyBytes from "pretty-bytes";
import { testProfile } from "../../.testing/test-profile";

const props = defineProps(['newBag']);
defineEmits(['stepButtonClicked']);

testProfile.sort((a, b) => a.label.localeCompare(b.label));
testProfile.find( item => item.label == 'Bagging-Date' ).value = new Date().toISOString().split('T')[0]
testProfile.find( item => item.label == 'Bag-Size' ).value = prettyBytes(props.newBag.totalBytes)
testProfile.find( item => item.label == 'Bag-Size' ).disabled = true
testProfile.find( item => item.label == 'Payload-Oxum' ).value = `${props.newBag.totalBytes}.${props.newBag.fileCount}`
testProfile.find( item => item.label == 'Payload-Oxum' ).disabled = true

const selectedDigestAlgorithms = ref(['sha512']);
const digestAlgorithmOptions = ref([
  {
    label: "MD5",
    value: "md5",
  },
  {
    label: "SHA-1",
    value: "sha1",
  },
  {
    label: "SHA-256",
    value: "sha256",
  },
  {
    label: "SHA-512",
    value: "sha512"
  },
  {
    label: "BLAKE2b-256",
    value: "blake2b256",
  },
  {
    label: "BLAKE2b-512",
    value: "blake2b512",
  },
]);

const targetDirectory = ref("");
let setTargetDirectory = () =>
  open({
    title: "Set target directory for Bag",
    directory: true,
  })
    .then((directory) => (targetDirectory.value = directory))
    .catch((error) => console.log(error));

onMounted(async () => {
  targetDirectory.value = await homeDir();
});
</script>

<template>
  <Card :pt="{ root: 'h-full', body: 'h-full', content: 'h-full' }">
    <template #title>
      <p>Bag Info</p>
    </template>

    <template #content>
      <ScrollPanel >
        <Fieldset
          legend="Export Settings"
          :pt="{ contentContainer: 'p-4', content: 'flex items-center justify-between gap-4' }"
        >
          <div class="flex items-center gap-2">
            <Button
              label="Set output location"
              icon="pi pi-file-export"
              iconPos="right"
              severity="secondary"
              text
              @click="setTargetDirectory"
            />
            <p class="text-sm font-mono">{{ targetDirectory }}</p>
          </div>

          <FloatLabel>
            <MultiSelect
              id="hashAlgorithmSelect"
              class="md:w-60"
              v-model="selectedDigestAlgorithms"
              :options="digestAlgorithmOptions"
              optionLabel="label"
              optionValue="value"
              :showToggleAll="false"
            />
            <label for="hashAlgorithmSelect">Select hash algorithm(s)</label>
          </FloatLabel>
        </Fieldset>

        <Fieldset
          legend="Profile"
          :pt="{ content: 'grid grid-cols-2 gap-2 max-h-96' }"
        >
          <div
            class="flex items-center justify-end gap-2"
            v-for="field in testProfile"
          >
            <label :for="field.label">{{ field.label }}:</label>
            <InputText
              :id="field.label"
              v-model="field.value"
              v-tooltip.bottom="field.tooltip"
              :disabled="field.disabled"
              :pt="{ root: 'h-6' }"
            />
          </div>
        </Fieldset>
      </ScrollPanel>
    </template>

    <template #footer>
      <Toolbar style="border-style: none">
        <template #start>
          <Button
            label="Back"
            icon="pi pi-arrow-left"
            iconPos="left"
            severity="secondary"
            raised
            @click="$emit('stepButtonClicked', '1')"
          />
        </template>

        <template #end>
          <Button
            label="Next"
            icon="pi pi-arrow-right"
            iconPos="right"
            raised
            @click="$emit('stepButtonClicked', '3')"
          />
        </template>
      </Toolbar>
    </template>
  </Card>
</template>
