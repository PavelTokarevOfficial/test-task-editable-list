<template>
  <div class="list" ref="container">
    <div v-for="(item, index) in useDevices.devices" :key="item.id" :data-swapy-slot="index + 1">
      <ListItem :item="item" :count="index" :data-swapy-item="item.id" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ListItem from "./ListItem.vue";
import { useDevicesStore } from '../store/DevicesStore.js';
import { createSwapy } from 'swapy';

const useDevices = useDevicesStore();
const container = ref(null);

onMounted(() => {
  if (container.value) {
    const swapy = createSwapy(container.value);
    swapy.onSwap(({ data }) => {
      localStorage.setItem('slotItem', JSON.stringify(data.object));
    });
  }
});
</script>

<style scoped>
.list{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
</style>