<template>
  <div class="form-input" :class="{ required }">
    <label v-if="text" :for="`${id}Textarea`" class="form-label">{{ text }}</label>
    <textarea
      v-model="model"
      class="form-control"
      :disabled="disabled"
      :id="`${id}Textarea`"
      :name="`${name}Textarea`"
      :required="required"
    ></textarea>
  </div>
</template>

<script setup>
const model = defineModel();

defineProps({
  disabled: Boolean,
  id: {
    type: String,
    default: (props) => props.name,
  },
  name: String,
  required: Boolean,
  text: String,
});
</script>
