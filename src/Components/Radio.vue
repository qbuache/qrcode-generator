<template>
  <div class="form-input form-check form-check-inline" :class="{ required }">
    <input
      v-model="model"
      class="form-check-input"
      type="radio"
      :disabled="disabled"
      :id="`${id}Radio`"
      :name="`${name}Radio`"
      :required="required"
      :value="value"
    />
    <label v-if="text" :for="`${id}Radio`" class="form-check-label">{{ text }}</label>
  </div>
</template>

<script setup>
const model = defineModel();

defineProps({
  disabled: Boolean,
  id: String,
  name: String,
  required: Boolean,
  text: String,
  value: String,
});
</script>
