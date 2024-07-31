<script setup>
import { ref } from 'vue';
import { PrimeIcons } from '@primevue/core/api';

const menuItems = ref([
    { label: 'Create New Bag', icon: PrimeIcons.SHOPPING_BAG },
    { label: 'Open Existing Bag', icon: PrimeIcons.FOLDER_OPEN },
    { label: 'Create Bag in Place', icon: PrimeIcons.ARROW_DOWN },
    { label: 'Save Bag', icon: PrimeIcons.SAVE },
]);
</script>

<template>
    <MenuBar :model="menuItems" style="border-style: none;">
        <template #start>
            
        </template>

        <template #item="{ item }">
            <a class="flex flex-col items-center">
                <span :class="item.icon" />
                <span>{{ item.label }}</span>
            </a>
        </template>

        <template #end>
            <i class="pi pi-cog" style="font-size: 1.5rem; color: var(--secondary)"></i>
        </template>
    </MenuBar>
        
    
</template>

