<script setup>
import { defineEmits, ref } from 'vue'
const emit = defineEmits(['search'])
const searchTerm = ref('')
const search = (e) => {
  emit('search', e.target.value)
  searchTerm.value = e.target.value
}
const clearSearch = () => {
  emit('search', '')
}
</script>

<template>
  <form class="search-form">
    <div>
      <img src="@/assets/icons/ic_search@3x.png" alt="search icon" class="search-icon" />
      <input
        type="text"
        @input="search"
        id="search"
        name="search"
        placeholder="Search for a house"
      />
      <button @click="clearSearch" v-if="searchTerm !== ''" class="close-button">
        <img src="@/assets/icons/ic_clear_white@3x.png" alt="clear search" />
      </button>
    </div>
  </form>
</template>
