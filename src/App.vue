<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { RouterView, useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Toast from 'primevue/toast';
import APIS from './apis';
import i18n from './i18n';

const router = useRouter();
const route = useRoute();
const { t, locale } = useI18n();
const menu = ref();
const userMenu = ref();
const isDark = ref(false);
const isLoggedIn = ref(false);
const user = ref({});

const menus = ref([]);

const checkLoginStatus = () => {
  const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
  isLoggedIn.value = !!token;
  if (isLoggedIn.value) {
    APIS.getUserProfile().then(data => {
      user.value = data.user;
    });
  }
};

const generateMenus = () => {
  const newMenus = [
    {
      label: t('pages.home.title'),
      icon: 'pi pi-home',
      command: () => navigateTo("/")
    }
  ];
  if (isLoggedIn.value) {
    newMenus.push(
      {
        label: t('pages.gallery.title'),
        icon: 'pi pi-images',
        command: () => navigateTo("/photos")
      },{
        label: t('pages.myMedia.title') ,
        icon: 'pi pi-user',
        command: () => navigateTo("/my-media")
      }
    );
  }
  menus.value = newMenus;
};

watch(locale, () => {
    generateMenus();
    generateUserMenuItems();
});
watch(isLoggedIn, () => {
    generateMenus();
    generateUserMenuItems();
});
watch(route, checkLoginStatus);

const languageMenu = computed(() => {
  return i18n.global.availableLocales.map(loc => ({
    label: i18n.global.messages.value[loc].app.languageName,
    command: () => {
      locale.value = loc;
    }
  }));
});

const userMenuItems = ref([]);

const generateUserMenuItems = () => {
    userMenuItems.value = [
        {
            label: t('pages.userProfile.title'),
            icon: 'pi pi-user',
            command: () => navigateTo('/profile')
        },
        {
            label: t('actions.logout'),
            icon: 'pi pi-sign-out',
            command: () => {
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                checkLoginStatus();
                router.push('/login');
            }
        }
    ];
}

const toggle = (event) => {
    menu.value.toggle(event);
};

const toggleUserMenu = (event) => {
    userMenu.value.toggle(event);
};

const handleAvatarClick = (event) => {
  if (isLoggedIn.value) {
    toggleUserMenu(event);
  } else {
    navigateTo('/login');
  }
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
  }
}

onMounted(() => {
    checkLoginStatus();
    generateMenus();
    generateUserMenuItems();
    // Set initial theme based on browser preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDark.value = prefersDark;
    if (isDark.value) {
        document.documentElement.classList.add('dark-mode');
    }

    // Set initial language based on browser preference
    const browserLang = navigator.language;
    if (i18n.global.availableLocales.includes(browserLang)) {
        locale.value = browserLang;
    } else if (browserLang.startsWith('zh-CN')) {
        locale.value = 'zh_cn';
    } else if (browserLang.startsWith('zh-TW') || browserLang.startsWith('zh-HK')) {
        locale.value = 'zh_tw';
    } else if (browserLang.startsWith('zh')) {
        locale.value = 'zh_cn';
    } else {
        locale.value = 'en';
    }
});

/**
 * Controls Router
 * 
 * @param path Nagivate to the given path
 */
function navigateTo(path) {
  router.push(path);
}
</script>

<template>
  <Menubar class="menubar" :model="menus" breakpoint="600px">
    <template #start>
      <img class="logo" src="/home.svg" @click="navigateTo('/')"/>
    </template>
    <template #end>
      <div class="end-components-container">
        <div class="theme-switcher">
          <Button :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'" @click="toggleTheme" />
        </div>
        <div class="lang-switcher">
          <Button type="button" icon="pi pi-globe" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
          <TieredMenu ref="menu" id="overlay_menu" :model="languageMenu" popup />
        </div>
        <Avatar v-if="isLoggedIn" class="user" :image="user.avatar" shape="circle" @click="handleAvatarClick" />
        <Avatar v-else class="user" icon="pi pi-user" shape="circle" @click="handleAvatarClick" />
        <TieredMenu ref="userMenu" id="user_menu" :model="userMenuItems" popup />
      </div>
    </template>
  </Menubar>
  <div class="routerview">
    <RouterView/>
  </div>
  <Toast />
</template>

<style>
.p-menubar-root-list {
  border-radius: 1rem;
  overflow: hidden;
  margin-top: 0.5rem;
}
</style>

<style scoped>
.logo {
  height: 4rem;
  padding: 1rem;
  will-change: filter;
  transition: filter 0.2s;
}
.logo:hover {
  filter: drop-shadow(0 0 1rem #646cffaa);
}
.menubar {
  border-radius: 2rem;
  vertical-align: top;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 0;
  position: sticky;
  top: 1rem;
  z-index: 1000;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1rem;
  width: calc(100% - 2rem);
}
.end-components-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 1rem;
}
.end-components-container > * {
  transition: transform 0.2s ease-in-out;
}
.end-components-container > *:hover {
  filter: drop-shadow(0 0 0.25rem #646cffaa);
  transform: scale(1.1);
}
.routerview {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  margin: -1rem auto auto;
  padding: 1rem;
}
</style>
