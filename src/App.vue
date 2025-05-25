<script setup>
import { ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Toast from 'primevue/toast';

import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';

const router = useRouter();

const i18n = useI18n();

const menus = ref([
  {
    label: i18n.t('home'),
    icon: 'pi pi-home',
    command: () => navigateTo("/"),
  },
  {
    label: i18n.t('photos'),
    icon: 'pi pi-images',
    command: () => navigateTo("/photos/"),
  }
]);

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
  <Menubar class="menubar" :model="menus">
    <template #start>
      <img class="logo" src="/home.svg" @click="navigateTo('/')"/>
    </template>
    <template #end>
      <Avatar class="user" icon="pi pi-user" shape="circle" @click="navigateTo('/login/')" />
    </template>
  </Menubar>
  <div class="routerview">
    <RouterView/>
  </div>
  <Toast />
</template>

<style scoped>
.logo {
  height: 4em;
  padding: 1em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 1em #646cffaa);
}
.menubar {
  border-radius: 2em;
  vertical-align: top;
}
.user {
  margin-right: 1em;
}
.user:hover {
  filter: drop-shadow(0 0 1em #646cffaa);
}
.routerview {
  height: stretch;
  display: flex;
  flex-direction: column;
  justify-items: center;
  margin: auto;
}
</style>
