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
    command: () => navigateTo("/")
  },
  {
    label: i18n.t('photos'),
    icon: 'pi pi-images',
    command: () => navigateTo("/photos/")
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
  <Menubar class="menubar" :model="menus" breakpoint="400px">
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
.user {
  margin-right: 1rem;
}
.user:hover {
  filter: drop-shadow(0 0 1rem #646cffaa);
}
.routerview {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 1rem;
}
</style>
