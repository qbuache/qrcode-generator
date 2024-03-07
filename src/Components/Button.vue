<template>
  <button class="btn btn-sm" :class="color" :disabled="disabled">
    <i v-if="fa" class="fa fa-fw me-1" :class="fa"></i>
    <span><slot></slot></span>
  </button>
</template>

<script setup>
defineProps({
  disabled: Boolean,
  fa: String,
  color: {
    type: String,
    default: "btn-light border",
  },
});
</script>
