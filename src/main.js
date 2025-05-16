import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// PrimeVue
app.use(PrimeVue, {
    theme: 'none'
});

app.mount('#app')
