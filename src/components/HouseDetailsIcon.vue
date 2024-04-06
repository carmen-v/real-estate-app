<script setup>
defineProps({
  url: String,
  alt: String
})
</script>

<template>
  <img :alt="alt" class="houseDetailsIcon" :src="url" />
</template>
