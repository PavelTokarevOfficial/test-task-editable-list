<template>
  <div class="item">
    <div class="item__header">
      <span class="item__id bg-danger">{{ count + 1 }}</span>

      <div v-if="!isEdit" class="item__name">{{ editedName }}</div>
      <input v-else type="text" v-model="editedName" class="item__name"/>

      <div class="item__buttons">
        <button @click="toggleEditMode(id)" class="common__btn bi" :class="isEdit ? 'bi-floppy-fill' : 'bi-pencil-fill' "/>
        <button @click="removeDeviceFromStore(id)" class="common__btn bi bi-trash3-fill"/>
      </div>
    </div>

    <NodeList :item="item" :deviceId="id"/>
  </div>
</template>

<script setup>
import NodeList from "./NodeList.vue";
import { useDevicesStore } from '../store/DevicesStore.js'
import { ref } from "vue";

const store = useDevicesStore()
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
});
const { id, name } = props.item;

const editedName = ref(name);
const isEdit = ref(false);

const toggleEditMode = (id) => {
  if (!isEdit.value) {
    isEdit.value = true;
  } else {
    store.updateDevice(id, editedName.value);
    isEdit.value = false;
  }
};

const removeDeviceFromStore = (id) => {
  store.removeDevice(id);
}
</script>

<style scoped lang="scss">
.item {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: rgba(220, 53, 69, 0.27);
  padding: 10px;
  border-radius: 10px;

  &__header {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__id {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: 40px;
    height: 40px;
    border-radius: 7px;
  }

  &__buttons{
    display: flex;
    gap: 7px;
  }

  &__name{
    flex: 1;
    cursor: grab;
  }
}
</style>