import { createApp, watch } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './style.css';

// Localization
import i18n from './i18n'

// Apis
import apis from './apis';
apis.setTestMode(true);

// Personal Views
import App from './App.vue';
import Home from './components/Home.vue';
import Photo from './components/Photo.vue';
import Login from './components/Login.vue';
import UserProfile from './components/UserProfile.vue';
import EditUserProfile from './components/EditUserProfile.vue';
import MyPhotos from './components/MyPhotos.vue';
import SinglePhoto from './components/SinglePhoto.vue';

// PrimeVue & PrimeIcon
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';

// PrimeVue Components
import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import TieredMenu from 'primevue/tieredmenu';

import Galleria from 'primevue/galleria';
import Card from 'primevue/card';

// PrimeVue Form
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Message from 'primevue/message';
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';

// PrimeVue Services
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import DialogService from "primevue/dialogservice";

const app = createApp(App);

app.use(i18n);

// Update title when locale changes
watch(
  () => i18n.global.locale.value,
  () => {
    document.title = i18n.global.t('appTitle');
  },
  { immediate: true } // Set title on initial load
);


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
        {
            path: '/photos/:id',
            name: 'singlephoto',
            component: SinglePhoto
        },
        {
          path: '/profile',
          name: 'userprofile',
          component: UserProfile
        },
        {
          path: '/profile/edit',
          name: 'edituserprofile',
          component: EditUserProfile
        },
        {
          path: '/my-photos',
          name: 'myphotos',
          component: MyPhotos
        }
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
app.component("TieredMenu", TieredMenu);

app.component("Galleria", Galleria);

app.component("InputText", InputText);
app.component("Password", Password);
app.component("Button", Button);
app.component("Message", Message);
app.component("Card", Card);
app.component('Textarea', Textarea);
app.component('FileUpload', FileUpload);

app.mount('#app');
