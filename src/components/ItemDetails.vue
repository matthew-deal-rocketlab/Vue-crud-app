<script setup lang="ts">
import type { Item } from '@/types'
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  item: Item
  isEditing: boolean
}>()

const emit = defineEmits(['updateItem', 'editItem'])

const editedName = ref(props.item.name)
const editedDescription = ref(props.item.description)

// Watch for changes to the item prop and update the editedName and editedDescription refs
watch(
  () => props.item,
  () => {
    editedName.value = props.item.name
    editedDescription.value = props.item.description
  },
)

const saveChanges = () => {
  emit('updateItem', {
    ...props.item,
    name: editedName.value,
    description: editedDescription.value,
  })
}
</script>

<template>
  <div>
    <h2 class="mb-2 text-xl font-semibold">Edit Items</h2>
    <div v-if="!isEditing">
      <p><strong>Name:</strong> {{ item.name }}</p>
      <p><strong>Description:</strong> {{ item.description }}</p>
      <button
        @click="emit('editItem')"
        class="p-2 mt-2 text-white bg-yellow-500"
      >
        Edit
      </button>
    </div>
    <div v-else>
      <input v-model="editedName" class="w-full p-2 mb-2 text-black border" />
      <textarea
        v-model="editedDescription"
        class="w-full p-2 mb-2 text-black border"
      ></textarea>
      <button @click="saveChanges" class="p-2 text-white bg-green-500">
        Save
      </button>
    </div>
  </div>
</template>
