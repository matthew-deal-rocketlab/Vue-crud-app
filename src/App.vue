<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col w-full min-h-screen text-white bg-black">
    <header class="bg-gray-800">
      <nav class="container px-4 py-3 mx-auto">
        <div class="flex items-center justify-between">
          <div class="text-xl font-bold">Vue CRUD App</div>
          <ul class="flex space-x-4">
            <li>
              <RouterLink
                to="/"
                class="transition-colors duration-200 hover:text-gray-300"
                >CRUD</RouterLink
              >
            </li>
            <!-- Add more navigation items here if needed -->
          </ul>
        </div>
      </nav>
    </header>

    <main class="container flex-grow px-4 py-8 mx-auto">
      <RouterView />
    </main>
  </div>
</template>
