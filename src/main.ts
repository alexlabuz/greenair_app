import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import PrimeVue from "primevue/config";
import 'primevue/resources/themes/saga-green/theme.css'


const app = createApp(App)
app.use(PrimeVue)
app.mount('#app')
