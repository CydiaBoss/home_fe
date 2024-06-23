import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './style.css';

// Personal Views
import App from './App.vue';
import HelloWorld from './components/HelloWorld.vue';

// PrimeVue & PrimeIcon
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-dark-green/theme.css';
import Aura from '@primevue/themes/aura';
import "primeicons/primeicons.css";

// PrimeVue Components
import Menubar from 'primevue/menubar';
import Paginator from 'primevue/paginator';
import Button from 'primevue/button';

// PrimeVue Services
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import DialogService from "primevue/dialogservice";

const app = createApp(App);

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HelloWorld,
            props: { msg: "Wang HQ Database" }
        },
    ],
});

app.use(router);
app.use(PrimeVue, { 
    ripple: true,
    theme: {
        preset: Aura
    }
});
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);

app.component("Menubar", Menubar);
app.component("Paginator", Paginator);
app.component("Button", Button);

app.mount('#app');
