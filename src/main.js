import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import {createPinia} from "pinia";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App);
app.use(createPinia());
app.mount('#app')
