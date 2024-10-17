<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import Button from '../components/ui/button.vue'
import Input from '../components/ui/input.vue'

const emit = defineEmits(['addItem'])

const name = ref('')
const description = ref('')
const nameError = ref('')

const submitForm = () => {
  nameError.value = ''

  if (name.value.trim().length < 1) {
    nameError.value = 'Name is required.'
    return
  }

  emit('addItem', { name: name.value, description: description.value })
  name.value = ''
  description.value = ''
}
</script>

<template>
  <div class="flex flex-col gap-2 mt-4">
    <h2 class="mb-2 text-xl font-semibold">Add New Item</h2>
    <form @submit.prevent="submitForm">
      <span v-if="nameError" class="text-red-500">{{ nameError }}</span>
      <Input v-model="name" placeholder="Name" />

      <textarea
        v-model="description"
        placeholder="Description"
        class="w-full p-2 mb-2 text-black border rounded-lg"
      ></textarea>
      <Button
        type="submit"
        class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400 active:scale-110"
      >
        Add Item
      </Button>
    </form>
  </div>
</template>
