<script setup>
import HouseCard from '@/components/HouseCard.vue'
import { computed, ref } from 'vue'
import SearchForm from '@/components/SearchForm.vue'
import SortButtons from '@/components/SortButtons.vue'
import { useHouseStore } from '@/stores/houses.js'
import NoResultsFound from '@/components/NoResultsFound.vue'

const housesList = useHouseStore()

defineProps({
  houses: {
    type: Array,
    required: false
  }
})

const searchFilter = ref('')

const filteredHouses = computed(() => {
  if (searchFilter.value !== '') {
    return housesList.houses.filter(
      (house) =>
        house.price.toString() === searchFilter.value ||
        house.size.toString().includes(searchFilter.value) ||
        house.location.street.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
        house.location.city.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
        house.location.zip.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
        house.constructionYear.toString().includes(searchFilter.value)
    )
  }
  return housesList.houses
})

const handleSearch = (searchTerm) => {
  searchFilter.value = searchTerm
}
</script>

<template>
  <h1>Houses</h1>
  <SearchForm @search="handleSearch" />
  <SortButtons />
  <p v-if="housesList.houses.length > filteredHouses.length">
    {{ filteredHouses.length }} results found
  </p>
  <ul class="houses-list" v-if="filteredHouses.length > 0">
    <HouseCard
      :key="house.id"
      v-for="house in filteredHouses"
      :pictureURL="house.image"
      :location="house.location"
      :price="house.price"
      :rooms="house.rooms"
      :size="house.size"
    />
  </ul>
  <NoResultsFound v-else />
</template>
