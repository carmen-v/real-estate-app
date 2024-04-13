<script setup>
import { useHouseStore } from '@/stores/houses.js'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import HouseCard from '@/components/HouseCard.vue'
import HouseDetailsIcon from '@/components/HouseDetailsIcon.vue'

const route = useRoute()

const housesList = ref(useHouseStore())

const houseId = computed(() => {
  return route.params.id
})

const currentHouse = computed(() => {
  return housesList.value.houses.filter((house) => house.id.toString() === houseId.value)
})

const filterCriterion = currentHouse.value[0].location.city.toLowerCase()

const recommendedHouses = computed(() => {
  //recommend houses based on city
  return housesList.value.houses.filter(
    (house) => house.location.city.toLowerCase() === filterCriterion
  )
})

const deleteHouse = (id) => {
  if (currentHouse.value[0].madeByMe) {
    housesList.value.deleteHouse(id)
  } else console.log('you are not allowed to delete this house')
}
const editHouse = (id) => {
  housesList.value.editHouse(id)
}

const formatedPrice = new Intl.NumberFormat('nl-NL').format(currentHouse.value[0].price)
</script>

<template>
  <button class="back-button" @click="$router.go(-1)">
    <img src="@/assets/icons/ic_back_grey@3x.png" alt="back icon" />
    <span>Back to overview </span>
  </button>
  <div class="details-container">
    <div class="details-page" v-if="currentHouse.length > 0">
      <div class="actions-container-mobile">
        <button @click="editHouse(currentHouse[0].id)">
          <img
            src="@/assets/icons/ic_edit_white@3x.png"
            alt="edit icon"
            @click="editHouse(currentHouse[0].id)"
          />
        </button>
        <button @click="deleteHouse(currentHouse[0].id)">
          <img
            src="@/assets/icons/ic_delete_white@3x.png"
            alt="delete icon"
            @click="deleteHouse(currentHouse[0].id)"
          />
        </button>
      </div>
      <img class="detail-picture" :src="currentHouse[0].image" alt="House" />
      <div class="house-details">
        <div>
          <h2>{{ currentHouse[0].location.street }} {{ currentHouse[0].location.houseNumber }}</h2>
          <div class="actions-container-desktop">
            <button @click="editHouse(currentHouse[0].id)">
              <img
                src="@/assets/icons/ic_edit@3x.png"
                alt="edit icon"
                @click="editHouse(currentHouse[0].id)"
              />
            </button>
            <button @click="deleteHouse(currentHouse[0].id)">
              <img
                src="@/assets/icons/ic_delete@3x.png"
                alt="delete icon"
                @click="deleteHouse(currentHouse[0].id)"
              />
            </button>
          </div>
        </div>
        <span>
          <HouseDetailsIcon url="src/assets/icons/ic_location@3x.png" alt="location icon" />
          {{ currentHouse[0].location.zip }} {{ currentHouse[0].location.city }}</span
        >
        <span>
          <HouseDetailsIcon url="src/assets/icons/ic_price@3x.png" alt="currency icon" />
          {{ formatedPrice }}
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
      <ul class="houses-list" v-if="recommendedHouses.length > 0">
        <RouterLink
          :to="'/' + house.id"
          v-for="house in recommendedHouses.slice(0, 3)"
          :key="house.id"
        >
          <HouseCard
            :pictureURL="house.image"
            :location="house.location"
            :price="formatedPrice"
            :rooms="house.rooms"
            :size="house.size"
          />
        </RouterLink>
      </ul>
    </div>
  </div>
</template>
