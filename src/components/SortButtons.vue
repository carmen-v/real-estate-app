<script setup>
import { useHouseStore } from '@/stores/houses.js'
import { ref } from 'vue'

const isActive = ref(true)

const sortByPrice = () => {
  useHouseStore().sortByPrice()
  isActive.value = !isActive.value
}

const sortBySize = () => {
  useHouseStore().sortBySize()
  isActive.value = !isActive.value
}
</script>

<template>
  <div class="sort-buttons">
    <button @click="sortByPrice" :class="{ active: isActive }">Price</button>
    <button @click="sortBySize" :class="{ active: !isActive }">Size</button>
  </div>
</template>
