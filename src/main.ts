import { createApp } from 'vue'
import './style.css'
import "./assets/index.css"; 
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'vue3-toastify/dist/index.css';

createApp(App).use(createPinia()).use(VueQueryPlugin).use(router).mount('#app')
