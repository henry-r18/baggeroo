<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { selectedFilesStore } from '../store';
import Bag from '../Bag';
import NewBagStepOne from './NewBagStep1.vue';
import NewBagStepTwo from './NewBagStep2.vue';
import NewBagStepThree from './NewBagStep3.vue';

const bagEntries = ref([]);
const newBag = reactive( new Bag() );
watch(bagEntries, (newBagEntries) => newBag.bagEntries = newBagEntries);

onMounted(async () => {
  bagEntries.value = await selectedFilesStore.get('selectedFiles'); // load from store on component setup
  selectedFilesStore.onKeyChange("selectedFiles", (_selectedFiles) => bagEntries.value = _selectedFiles); // reload when value changes for key in store
});

</script>

<template>
    <Stepper class="flex flex-col h-full px-4" value="1" linear>

        <StepList>
            <Step value="1">Select Files</Step>
            <Step value="2">Configure Bag</Step>
            <Step value="3">Review Bag</Step>
        </StepList>

        <StepPanels class="grow">
            <StepPanel class="h-full" v-slot="{ activateCallback }" value="1">
              <NewBagStepOne :new-bag="newBag" @step-button-clicked="(index) => activateCallback(index)" />
            </StepPanel>

            <StepPanel class="h-full" v-slot="{ activateCallback }" value="2">
              <NewBagStepTwo :new-bag="newBag" @step-button-clicked="(index) => activateCallback(index)" />
            </StepPanel>

            <StepPanel class="h-full" v-slot="{ activateCallback }" value="3">
              <NewBagStepThree :new-bag="newBag" @step-button-clicked="(index) => activateCallback(index)" />
            </StepPanel>
        </StepPanels>

    </Stepper>
</template>