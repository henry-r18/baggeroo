<script setup>


defineEmits(['closeOffcanvas']);

</script>

<template>
  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvas"
    aria-labelledby="offcanvasLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasLabel">Menu</h5>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      Content for the offcanvas goes here. You can place just about any
      Bootstrap component or custom elements here.
    </div>
  </div>
</template>
