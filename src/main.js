import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './style.css';

// Localization
import i18n from './i18n'

// Personal Views
import App from './App.vue';
import Home from './components/Home.vue';
import Photo from './components/Photo.vue';
import Login from './components/Login.vue';

// PrimeVue & PrimeIcon
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primevue/resources/themes/aura-dark-green/theme.css';
import 'primeicons/primeicons.css';

// PrimeVue Components
import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';

import Galleria from 'primevue/galleria';

// PrimeVue Form
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Message from 'primevue/message';

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
        },
        {
            path: "/login/",
            name: "login",
            component: Login,
        },
        {
            path: "/photos/",
            name: "photos",
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

app.component("Galleria", Galleria);

app.component("InputText", InputText);
app.component("Password", Password);
app.component("Button", Button);
app.component("Message", Message);

app.mount('#app');
