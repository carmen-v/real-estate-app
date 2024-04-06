<script setup>
import HouseCard from '@/components/HouseCard.vue'
import { computed, ref } from 'vue'
import SearchForm from '@/components/SearchForm.vue'

const housesList = ref([])

defineProps({
  houses: {
    type: Array,
    required: true
  }
})

const fetchHouses = () => {
  const myHeaders = new Headers()
  myHeaders.append('X-Api-Key', '5Vkh7UIXBcZ9x8RmaMl4TSqdEzW3FJOg')

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  }

  fetch('https://api.intern.d-tt.nl/api/houses', requestOptions)
    .then((response) => response.json())
    .then((data) => (housesList.value = data))
    .catch((error) => console.log('error', error))
}

fetchHouses()

const searchFilter = ref('')

const filteredHouses = computed(() => {
  if (searchFilter.value !== '') {
    return housesList.value.filter(
      (house) =>
        house.price.toString() === searchFilter.value ||
        house.size.toString().includes(searchFilter.value) ||
        house.location.street.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
        house.location.city.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
        house.location.zip.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
        house.constructionYear.toString().includes(searchFilter.value)
    )
  }
  return housesList.value
})

const handleSearch = (searchTerm) => {
  searchFilter.value = searchTerm
}
</script>

<template>
  <h1>Houses</h1>
  <SearchForm @search="handleSearch" />
  <p v-if="housesList.length > filteredHouses.length">
    Your search result: {{ filteredHouses.length }} house(s).
  </p>
  <ul class="houses-list" v-if="filteredHouses.length > 0">
    <HouseCard
      :key="house.id"
      v-for="house in filteredHouses"
      :house="house"
      :pictureURL="house.image"
      :location="house.location"
      :price="house.price"
      :rooms="house.rooms"
      :size="house.size"
    />
  </ul>
  <p v-else>
    You search input did not match any house. Try other search term or see our full list.
  </p>
  <div>{{ housesList }}</div>
</template>
