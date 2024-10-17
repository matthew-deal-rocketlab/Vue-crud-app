<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  modelValue: string
  type?: string
}>()

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) {
    emit('update:modelValue', target.value)
  }
}
</script>

<template>
  <input
    :type="type"
    :value="modelValue"
    v-bind="$attrs"
    class="w-full p-2 mb-2 text-black border rounded"
    @input="handleInput"
  />
</template>
