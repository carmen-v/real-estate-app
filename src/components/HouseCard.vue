<script setup>
// eslint-disable-next-line no-unused-vars
import HouseDetailsIcon from '@/components/HouseDetailsIcon.vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  house: Object,
  pictureURL: String,
  location: {
    street: String,
    houseNumber: Number,
    houseNumberAddition: Number,
    city: String,
    zip: String
  },
  price: Number,
  size: Number,
  rooms: {
    bedrooms: Number,
    bathrooms: Number
  },
  constructionYear: Number,
  hasGarage: Boolean
})

const formatedPrice = new Intl.NumberFormat('nl-NL').format(props.price)
</script>

<template>
  <div class="house-card">
    <img :src="pictureURL" alt="House" class="house-picture" />
    <div class="house-details">
      <h2>{{ location.street }} {{ location.houseNumber }}</h2>
      <span> € {{ formatedPrice }}</span>
      <span> {{ location.zip }} {{ location.city }}</span>
      <span>
        <HouseDetailsIcon url="src/assets/icons/ic_bed@3x.png" alt="bedroom icon" />
        {{ rooms.bedrooms }}
        <HouseDetailsIcon url="src/assets/icons/ic_bath@3x.png" alt="bathroom icon" />
        {{ rooms.bathrooms }}
        <HouseDetailsIcon url="src/assets/icons/ic_size@3x.png" alt="bathroom icon" />
        {{ size }} m2</span
      >
    </div>
  </div>
</template>
