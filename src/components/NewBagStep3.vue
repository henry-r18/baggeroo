<script setup>

</script>

<template>
  <Card :pt="{ root: 'h-full', body: 'h-full', content: 'h-full' }">
    <template #title>
      <p>Review Bag</p>
    </template>

    <template #content>

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
            @click="$emit('stepButtonClicked', '2')"
          />
        </template>

        <template #end>
          <Button
            label="Create Bag!"
            raised
            @click="$emit('stepButtonClicked', '3')"
          />
        </template>
      </Toolbar>
    </template>
  </Card>
</template>
