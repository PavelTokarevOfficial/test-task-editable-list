<template>
  <div class="layout bg-dark text-white">
    <div class="container">
      <Header/>
      <slot/>
    </div>
  </div>
</template>

<script setup>
import Header from "./Header.vue";
</script>

<style scoped>
.layout{
  min-height: 100vh;
  padding-bottom: 20px;
}
</style>