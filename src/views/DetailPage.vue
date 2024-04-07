<script setup>
import { useHouseStore } from '@/stores/houses.js'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HouseCard from '@/components/HouseCard.vue'
import HouseDetailsIcon from '@/components/HouseDetailsIcon.vue'

const route = useRoute()

const housesList = useHouseStore()
const id = route.params.id
const currentHouse = computed(() => {
  return housesList.houses.filter((house) => house.id.toString() === id)
})

const recommendedHouses = computed(() => {
  //recommend houses based on city
  return housesList.houses.filter(
    (house) =>
      house.location.city.toLowerCase() === currentHouse.value[0].location.city.toLowerCase()
  )
})

const deleteHouse = (id) => {
  housesList.deleteHouse(id)
}
const editHouse = (id) => {
  housesList.editHouse(id)
}
</script>

<template>
  <div class="details-page" v-if="currentHouse.length > 0">
    <img
      src="@/assets/icons/ic_edit@3x.png"
      v-if="currentHouse[0].madeByMe"
      alt="edit icon"
      @click="editHouse(currentHouse[0].id)"
    />
    <img
      src="@/assets/icons/ic_delete@3x.png"
      v-if="currentHouse[0].madeByMe"
      alt="delete icon"
      @click="deleteHouse(currentHouse[0].id)"
    />
    <img class="detail-picture" :src="currentHouse[0].image" alt="House" />
    <div class="house-details">
      <h2>{{ currentHouse[0].location.street }} {{ currentHouse[0].location.houseNumber }}</h2>
      <span>
        <HouseDetailsIcon url="src/assets/icons/ic_location@3x.png" alt="location icon" />
        {{ currentHouse[0].location.zip }} {{ currentHouse[0].location.city }}</span
      >
      <span>
        <HouseDetailsIcon url="src/assets/icons/ic_price@3x.png" alt="currency icon" />
        {{ currentHouse[0].price }}
        <HouseDetailsIcon url="src/assets/icons/ic_size@3x.png" alt="size icon" />
        {{ currentHouse[0].size }}
        <HouseDetailsIcon
          url="src/assets/icons/ic_construction_date@3x.png"
          alt="construction icon"
        />
        Built in {{ currentHouse[0].constructionYear }}
      </span>
      <span>
        <HouseDetailsIcon url="src/assets/icons/ic_bed@3x.png" alt="bedroom icon" />
        {{ currentHouse[0].rooms.bedrooms }}
        <HouseDetailsIcon url="src/assets/icons/ic_bath@3x.png" alt="bathroom icon" />
        {{ currentHouse[0].rooms.bathrooms }}
        <HouseDetailsIcon url="src/assets/icons/ic_garage@3x.png" alt="garage icon" />
        {{ currentHouse[0].hasGarage ? 'Yes' : 'No' }}
      </span>
      <p class="description">{{ currentHouse[0].description }}</p>
    </div>
  </div>

  <div class="recommended-houses">
    <h2>Recommended for you</h2>
    <ul class="houses-list">
      <RouterLink
        to="{name:details, params: {id: house.id}}"
        v-for="house in recommendedHouses"
        :key="house.id"
      >
        <HouseCard
          :pictureURL="house.image"
          :location="house.location"
          :price="house.price"
          :rooms="house.rooms"
          :size="house.size"
        />
      </RouterLink>
    </ul>
  </div>
</template>
