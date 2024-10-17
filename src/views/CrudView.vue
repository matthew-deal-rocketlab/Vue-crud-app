<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import ItemList from '../components/ItemList.vue'
import ItemForm from '../components/ItemForm.vue'
import ItemDetails from '../components/ItemDetails.vue'
import Button from '../components/ui/button.vue'
import type { Item, Pokemon } from '@/types'
import { useFetch } from '../composables/useFetch'

const items = ref<Item[]>([])
const selectedItem = ref<Item | null>(null)
const isEditing = ref(false)

const { data: pokemon, loading, error, fetchData } = useFetch<Pokemon>()

// onMounted is called when the component is first mounted
// This works similarly to a UseEffect hook in React which has no dependencies
onMounted(() => {
  const storedItems = localStorage.getItem('items')
  if (storedItems) items.value = JSON.parse(storedItems)

  const storedPokemon = localStorage.getItem('pokemon')
  if (storedPokemon) pokemon.value = JSON.parse(storedPokemon)
})

// watch is used to watch for changes in the items array
// This will trigger whenever the items array changes
watch(
  items,
  newItems => {
    localStorage.setItem('items', JSON.stringify(newItems))
  },
  { deep: true },
)

watch(pokemon, newPokemon => {
  if (newPokemon) {
    localStorage.setItem('pokemon', JSON.stringify(newPokemon))
  }
})

const fetchRandomPokemon = async () => {
  const randomId = Math.floor(Math.random() * 800) + 1
  try {
    await fetchData(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
  } catch (err) {
    console.error(err)
  }
}

const addItem = (item: Omit<Item, 'id'>) => {
  const newItem = { ...item, id: Date.now() }
  items.value.push(newItem)
}

const updateItem = (updatedItem: Item) => {
  const index = items.value.findIndex(item => item.id === updatedItem.id)
  if (index !== -1) items.value[index] = updatedItem
  selectedItem.value = null
  isEditing.value = false
}

const deleteItem = (id: number) => {
  items.value = items.value.filter(item => item.id !== id)
  if (selectedItem.value?.id === id) selectedItem.value = null
}

const selectItem = (item: Item) => {
  selectedItem.value = item
  isEditing.value = false
}

const editItem = () => (isEditing.value = true)
</script>

<template>
  <div class="flex flex-col gap-4 p-4 mx-auto">
    <h1 class="mb-4 text-2xl font-bold">CRUD Application</h1>
    <div class="flex justify-between">
      <div class="flex flex-col gap-4 pr-4">
        <ItemForm @add-item="addItem" />
        <ItemList
          :items="items"
          @select-item="selectItem"
          @delete-item="deleteItem"
        />
      </div>
      <div class="flex flex-col gap-4 pl-4">
        <div>
          <!-- You probably didn't notice, but this is a resuable component, not a HTML button -->
          <Button @click="fetchRandomPokemon">Fetch A Random Pokémon</Button>
          <div class="mt-4">
            <!-- No Ternaries here, instead Vue uses what is bassically just if else -->
            <div v-if="loading">Loading...</div>
            <div v-else-if="error">Error: {{ error.message }}</div>
            <div
              v-else-if="pokemon"
              class="flex flex-col gap-2 p-4 border rounded"
            >
              <h2 class="text-xl font-semibold">{{ pokemon.name }}</h2>
              <img :src="pokemon.sprites.front_default" alt="Pokemon Image" />
              <p><strong>Height:</strong> {{ pokemon.height }}</p>
              <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- The v-if directive is used to conditionally render the ItemDetails component -->
    <!-- In React we would use the ternary operator to achieve the same result -->
    <!-- selectedItem && ItemDetails -->
    <ItemDetails
      v-if="selectedItem"
      :item="selectedItem"
      :is-editing="isEditing"
      @update-item="updateItem"
      @edit-item="editItem"
    />
  </div>
</template>
