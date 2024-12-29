import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './style.css';

// Localization
import i18n from './i18n'

// Personal Views
import App from './App.vue';
import Home from './components/Home.vue';
import Photo from './components/Photo.vue';

// PrimeVue & PrimeIcon
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-dark-green/theme.css';
import Aura from '@primevue/themes/aura';
import "primeicons/primeicons.css";

// PrimeVue Components
import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';
import Paginator from 'primevue/paginator';
import Button from 'primevue/button';

// PrimeVue Services
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import DialogService from "primevue/dialogservice";

const app = createApp(App);

app.use(i18n);

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            props: { msg: "Wang HQ Database" }
        },
        {
            path: "/contacts/",
            name: "contacts",
            component: Photo,
            props: { msg: "Wang HQ Database Photos" }
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
app.component("Avatar", Avatar);
app.component("Paginator", Paginator);
app.component("Button", Button);

app.mount('#app');
