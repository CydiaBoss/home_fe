<script setup>
import { ref, watch, onMounted } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Toast from 'primevue/toast';

import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import TieredMenu from 'primevue/tieredmenu';

const router = useRouter();
const { t, locale } = useI18n();
const menu = ref();
const isDark = ref(false);

const menus = ref([
  {
    label: t('home'),
    icon: 'pi pi-home',
    command: () => navigateTo("/")
  },
  {
    label: t('photos'),
    icon: 'pi pi-images',
    command: () => navigateTo("/photos/")
  }
]);

watch(locale, () => {
  menus.value = [
    {
      label: t('home'),
      icon: 'pi pi-home',
      command: () => navigateTo("/")
    },
    {
      label: t('photos'),
      icon: 'pi pi-images',
      command: () => navigateTo("/photos/")
    }
  ];
});

const languageMenu = ref([
    {
        label: 'English',
        command: () => {
            locale.value = 'en';
        }
    },
    {
        label: 'Français',
        command: () => {
            locale.value = 'fr';
        }
    },
    {
        label: '简体中文',
        command: () => {
            locale.value = 'zh_cn';
        }
    },
    {
        label: '繁體中文',
        command: () => {
            locale.value = 'zh_tw';
        }
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  const theme = isDark.value ? 'aura-dark-green' : 'aura-light-green';
  const element = document.getElementById('theme-link');
  element.setAttribute('href', `/themes/${theme}/theme.css`);
}

onMounted(() => {
    const element = document.createElement('link');
    element.setAttribute('id', 'theme-link');
    element.setAttribute('rel', 'stylesheet');
    element.setAttribute('href', '/themes/aura-light-green/theme.css');
    document.head.appendChild(element);
})

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
  <Menubar class="menubar" :model="menus" breakpoint="400px">
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
        <Avatar class="user" icon="pi pi-user" shape="circle" @click="navigateTo('/profile')" />
      </div>
    </template>
  </Menubar>
  <div class="routerview">
    <RouterView/>
  </div>
  <Toast />
</template>

<style>
body {
  background-color: var(--surface-ground);
  color: var(--text-color);
}
</style>

<style scoped>
.logo {
  height: 4rem;
  padding: 1rem;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 1rem #646cffaa);
}
.menubar {
  border-radius: 2rem;
  vertical-align: top;
  margin-bottom: 1rem;
}
.user:hover {
  filter: drop-shadow(0 0 1rem #646cffaa);
}
.end-components-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: 1rem;
}
.routerview {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 1rem;
}
</style>
