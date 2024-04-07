<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
const isHomeActive = ref(true)
const isInfoActive = ref(false)
const toggleMenu = () => {
  isHomeActive.value = !isHomeActive.value
  isInfoActive.value = !isInfoActive.value
}
</script>

<template>
  <header>
    <nav class="container">
      <div class="branding">
        <img src="@/assets/images/img_logo_dtt@3x.png" alt="logo" />
      </div>
      <ul class="nav-routes">
        <RouterLink to="/">Houses</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </ul>
      <ul class="nav-mobile">
        <RouterLink to="/" @click="toggleMenu">
          <img
            v-if="isHomeActive"
            src="@/assets/icons/ic_mobile_navigarion_home_active@3x.png"
            alt="menu"
          />
          <img v-else src="@/assets/icons/ic_mobile_navigarion_home@3x.png" alt="menu" />
        </RouterLink>
        <RouterLink to="/about" @click="toggleMenu"
          ><img
            v-if="isInfoActive"
            src="@/assets/icons/ic_mobile_navigarion_info_active@3x.png"
            alt="menu" />
          <img v-else src="@/assets/icons/ic_mobile_navigarion_info@3x.png" alt="menu"
        /></RouterLink>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped></style>
