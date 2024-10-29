<template>
  <div class="list">
    <ListItem v-for="(item, index) in useDevices.devices" :key="item.id" :item="item" :count="index"/>
  </div>
</template>

<script setup>
import ListItem from "./ListItem.vue";
import { useDevicesStore } from '../store/DevicesStore.js';
const useDevices = useDevicesStore();
</script>

<style scoped>
.list{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>