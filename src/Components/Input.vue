<template>
  <div class="form-input" :class="{ required }">
    <label v-if="text" :for="`${id}Input`" class="form-label">{{ text }}</label>
    <input
      v-model="model"
      :class="formClass"
      :disabled="disabled"
      :id="`${id}Input`"
      :name="`${name}Input`"
      :required="required"
      :type="type"
      :min="min"
      :max="max"
    />
  </div>
</template>

<script setup>
const model = defineModel();

const props = defineProps({
  disabled: Boolean,
  id: {
    type: String,
    default: (props) => props.name,
  },
  min: String,
  max: String,
  name: String,
  required: Boolean,
  text: String,
  type: {
    type: String,
    default: "text",
  },
});

const formClass = props.type == "range" ? "form-range" : "form-control";
</script>
