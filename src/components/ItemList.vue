<!-- Script setup is used to define the component's data and methods -->
<!-- There can only be one script setup block per component -->
<script setup lang="ts">
import type { Item } from '@/types'
import { defineProps, defineEmits } from 'vue'

// defineProps is used to define props for the component
// This works the same way as passing Props in React
defineProps<{
  items: Item[]
}>()

// defineEmits is used to define event listeners for the component
// This exposes the following events:
// - selectItem: emitted when an item is selected
// - deleteItem: emitted when an item is deleted
const emit = defineEmits<{
  (e: 'selectItem', item: Item): void
  (e: 'deleteItem', id: number): void
}>()
</script>

<template>
  <div>
    <h2 class="mb-2 text-xl font-semibold">Items</h2>
    <ul>
      <!-- v-for is used to iterate over the items array -->
      <li v-for="item in items" :key="item.id" class="flex flex-row gap-2">
        <span class="cursor-pointer first-letter:uppercase">
          {{ item.name }}</span
        >
        <span
          @click="emit('selectItem', item)"
          class="text-yellow-500 cursor-pointer"
          >Edit</span
        >
        <button @click="emit('deleteItem', item.id)" class="ml-2 text-red-500">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>
