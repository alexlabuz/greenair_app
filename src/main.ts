import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import PrimeVue from "primevue/config";
import 'primevue/resources/themes/saga-green/theme.css'
import 'primeicons/primeicons.css'


export var baseUrl = 'https://greenairapi.onrender.com'

const app = createApp(App)
app.use(PrimeVue)
app.mount('#app')
