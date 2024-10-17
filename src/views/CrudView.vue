<script setup lang="ts">
import { ref } from 'vue'
import ItemList from '../components/ItemList.vue'
import ItemForm from '../components/ItemForm.vue'
import ItemDetails from '../components/ItemDetails.vue'
import type { Item } from '@/types'

const items = ref<Item[]>([])
const selectedItem = ref<Item | null>(null)
const isEditing = ref(false)

const addItem = (item: Omit<Item, 'id'>) => {
  const newItem = { ...item, id: Date.now() }
  items.value.push(newItem)
}

const updateItem = (updatedItem: Item) => {
  const index = items.value.findIndex(item => item.id === updatedItem.id)
  if (index !== -1) {
    items.value[index] = updatedItem
  }
  selectedItem.value = null
  isEditing.value = false
}

const deleteItem = (id: number) => {
  items.value = items.value.filter(item => item.id !== id)
  if (selectedItem.value?.id === id) {
    selectedItem.value = null
  }
}

const selectItem = (item: Item) => {
  selectedItem.value = item
  isEditing.value = false
}

const editItem = () => {
  isEditing.value = true
}
</script>

<template>
  <div class="container p-4 mx-auto">
    <h1 class="mb-4 text-2xl font-bold">CRUD Application</h1>
    <div class="flex">
      <div class="pr-4">
        <ItemList
          :items="items"
          @select-item="selectItem"
          @delete-item="deleteItem"
        />
        <ItemForm @add-item="addItem" />
      </div>
      <div class="pl-4">
        <ItemDetails
          v-if="selectedItem"
          :item="selectedItem"
          :is-editing="isEditing"
          @update-item="updateItem"
          @edit-item="editItem"
        />
      </div>
    </div>
  </div>
</template>
