<template>
  <button :class="computedClass" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
  type?: string
  color?: string
}>()

const computedClass = computed(() => {
  return [
    'px-4 py-2 rounded-lg',
    props.color ? `bg-${props.color}-500 text-white` : 'bg-blue-500 text-white',
    'hover:bg-blue-400',
  ]
})
</script>
