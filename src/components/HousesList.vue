<script setup>
import HouseCard from '@/components/HouseCard.vue'
import { ref } from 'vue'

const housesList = ref([])

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
</script>

<template>
  <h1>Houses</h1>
  <ul class="houses-list" v-if="housesList.length > 0">
    <HouseCard
      :key="house.id"
      v-for="house in housesList"
      :house="house"
      :pictureURL="house.image"
      :location="house.location"
      :price="house.price"
      :rooms="house.rooms"
      :size="house.size"
    />
  </ul>
  <div>{{ housesList }}</div>
</template>
