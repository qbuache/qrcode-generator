<template>
  <Textarea v-model="textData" name="text" required />
</template>

<script setup>
import Textarea from "@/Components/Textarea.vue";

const textData = defineModel();
</script>
