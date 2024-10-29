import {defineStore} from 'pinia'
import {ref} from 'vue'
import {initData} from '../helpers/initData.js'

export const useDevicesStore = defineStore('devicesStore', () => {
    const devices = ref([...initData])

    const addDevice = (name) => {
        const newDevice = {
            id: Date.now().toString(),
            name,
            nodes: []
        }
        devices.value.push(newDevice)
    }

    const removeDevice = (id) => {
        devices.value = devices.value.filter(device => device.id !== id)
    }

    const updateDevice = (id, newName) => {
        const device = devices.value.find(device => device.id === id)
        if (device) device.name = newName
    }

    const updateCharacteristic = (deviceId, nodeId, name, value) => {
        const device = devices.value.find(device => device.id === deviceId);
        if (device) {
            const node = device.nodes.find(node => node.id === nodeId);
            if (node) {
                node.name = name;
                node.value = value;
            }
        }
    };

    const addCharacteristic = (deviceId, name, value) => {
        const device = devices.value.find(device => device.id === deviceId);
        if (device) {
            const newCharacteristic = {
                id: Date.now().toString(),
                name,
                value,
            };
            device.nodes.push(newCharacteristic);
        }
    };

    const removeCharacteristic = (deviceId, nodeId) => {
        const device = devices.value.find(device => device.id === deviceId);
        if (device) {
            device.nodes = device.nodes.filter(node => node.id !== nodeId);
        }
    };

    return { devices, addDevice, removeDevice, updateDevice, addCharacteristic, updateCharacteristic, removeCharacteristic }
})
