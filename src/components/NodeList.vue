<template>
  <div class="list">
    <div class="list__item" v-for="(node, index) in item.nodes" :key="node.id">
      <div class="list__wrapper">
        <div v-if="!isEditing[node.id]" class="list__text">{{ node.name }}: {{ node.value }}</div>
        <div v-else class="input-group input-group-sm">
          <input v-model="node.name" type="text" aria-label="First name" class="form-control">
          <input v-model="node.value" type="text" aria-label="Last name" class="form-control">
        </div>
      </div>

      <div class="list__buttons">
        <button @click="toggleEditNode(node.id)" class="common__btn bi" :class="isEditing[node.id] ? 'bi-floppy-fill' : 'bi-pencil-fill'" />
        <button @click="removeNode(node.id)" class="common__btn bi bi-trash3-fill" />
      </div>
    </div>

    <!-- Поля добавления новой характеристики -->
    <div v-if="isAdding" class="input-group input-group-sm">
      <input v-model="newNodeName" placeholder="Категория" type="text" aria-label="First name" class="form-control">
      <input v-model="newNodeValue" placeholder="Значение" type="text" aria-label="Last name" class="form-control">
      <button @click="saveNewNode" class="list__btn-save common__btn bi bi-check-circle-fill"></button>
    </div>

    <!-- Кнопка добавления -->
    <button @click="toggleAddNode" class="list__btn common__btn bi bi-plus-circle-fill" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDevicesStore } from '../store/DevicesStore.js';

const store = useDevicesStore();
const props = defineProps({
  item: Object,
  deviceId: String
});

const isEditing = ref({});
const isAdding = ref(false);
const newNodeName = ref('');
const newNodeValue = ref('');

// Переключение режима редактирования
const toggleEditNode = (nodeId) => {
  if (isEditing.value[nodeId]) {
    const node = props.item.nodes.find((n) => n.id === nodeId);
    store.updateCharacteristic(props.deviceId, nodeId, node.name, node.value);
  }
  isEditing.value[nodeId] = !isEditing.value[nodeId];
};

// Переключение режима добавления
const toggleAddNode = () => {
  isAdding.value = !isAdding.value;
  if (!isAdding.value) {
    newNodeName.value = '';
    newNodeValue.value = '';
  }
};

// Сохранение новой характеристики
const saveNewNode = () => {
  if (newNodeName.value && newNodeValue.value) {
    store.addCharacteristic(props.deviceId, newNodeName.value, newNodeValue.value);
    toggleAddNode();
  }
};

// Удаление характеристики
const removeNode = (nodeId) => {
  store.removeCharacteristic(props.deviceId, nodeId);
};
</script>

<style lang="scss" scoped>
.list{
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border-radius: 5px;
    background-color: rgba(255, 206, 207, 0.36);
  }

  &__buttons{
    display: flex;
    gap: 5px;
  }

  &__btn{
    margin-top: 10px;
    width: 100%;

    &-save{
      width: 60px;
    }
  }
}
</style>