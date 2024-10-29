<template>
  <div>
    <div class="input-group mb-4">
      <input v-model="newItemName" type="text" class="form-control" placeholder="Введите название устройства">
      <button @click="addDeviceToStore" class="btn btn-outline-danger">Add</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDevicesStore } from '../store/DevicesStore.js'

const store = useDevicesStore()
const newItemName = ref('')

const addDeviceToStore = () => {
  if (newItemName.value.trim()) {
    store.addDevice(newItemName.value)
    newItemName.value = ''
  }
}
</script>

<style scoped>
.input-group {
  margin-bottom: 20px;
}
</style>