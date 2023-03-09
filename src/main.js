import { createApp } from 'vue'
import './style.css'

// PrimeVue & PrimeIcon
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-dark-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import App from './App.vue'

// PrimeVue Components
import Button from 'primevue/button';

const app = createApp(App);

app.use(PrimeVue, { ripple: true });
app.component("Button", Button);

app.mount('#app');
