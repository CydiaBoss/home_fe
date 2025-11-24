import { createApp, watch } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './style.css';

// Localization
import i18n from './i18n/index.js';

// Apis
import apis from './apis';
apis.setTestMode(true);

// Personal Views
import App from './App.vue';
import Home from './components/Home.vue';
import Gallery from './components/Gallery.vue';
import Login from './components/Login.vue';
import UserProfile from './components/UserProfile.vue';
import EditUserProfile from './components/EditUserProfile.vue';
import MyMedia from './components/MyMedia.vue';
import SinglePhoto from './components/SinglePhoto.vue';
import SingleVideo from './components/SingleVideo.vue';

// PrimeVue & PrimeIcon
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';

// PrimeVue Components
import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import TieredMenu from 'primevue/tieredmenu';
import DatePicker from 'primevue/datepicker';
import Galleria from 'primevue/galleria';
import Card from 'primevue/card';
import ToggleButton from 'primevue/togglebutton';
import InputChips from 'primevue/inputchips';
import Slider from 'primevue/slider';
import Tag from 'primevue/tag';

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

// Dialog
import Dialog from 'primevue/dialog';

// Video Player
import { VideoPlayer } from '@videojs-player/vue';
import 'video.js/dist/video-js.css';

const app = createApp(App);

app.use(i18n);

// Update title when locale changes
watch(
  () => i18n.global.locale.value,
  () => {
    document.title = i18n.global.t('app.title');
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
            component: Gallery
        },
        {
            path: '/photos/:id',
            name: 'singlephoto',
            component: SinglePhoto
        },
        {
            path: '/videos/:id',
            name: 'singlevideo',
            component: SingleVideo
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
          path: '/my-media',
          name: 'mymedia',
          component: MyMedia
        }
    ],
});

app.use(router);
app.use(PrimeVue, { 
    ripple: true,
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.dark-mode'
        }
    }
});
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);

app.component("Menubar", Menubar);
app.component("Avatar", Avatar);
app.component("TieredMenu", TieredMenu);
app.component("DatePicker", DatePicker);
app.component("Galleria", Galleria);
app.component("ToggleButton", ToggleButton);
app.component("InputChips", InputChips);
app.component("Slider", Slider);
app.component("Tag", Tag);

app.component("InputText", InputText);
app.component("Password", Password);
app.component("Button", Button);
app.component("Message", Message);
app.component("Card", Card);
app.component('Textarea', Textarea);
app.component('FileUpload', FileUpload);

app.component('Dialog', Dialog);

app.component('VideoPlayer', VideoPlayer);

app.mount('#app');
