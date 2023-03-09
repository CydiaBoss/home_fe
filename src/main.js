import { createApp } from 'vue'
import './style.css'

// PrimeVue 
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import App from './App.vue'

const app = createApp(App);

app.use(PrimeVue, { ripple: true });

app.mount('#app');
