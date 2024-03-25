import { createApp } from 'vue';
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import App from './App.vue';
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)

app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)

app.mount('#app')
