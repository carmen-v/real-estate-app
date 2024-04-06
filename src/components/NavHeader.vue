<script setup>
import { RouterLink } from 'vue-router'
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
    </nav>
  </header>
</template>

<style lang="scss" scoped></style>
