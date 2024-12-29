<script setup>
import { ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import Toast from 'primevue/toast';

import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';

const router = useRouter();

const menus = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => navigateTo("/"),
  },
  {
    label: 'Contact',
    icon: 'pi pi-envelope',
    command: () => navigateTo("/contacts"),
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
      <img class="logo" src="/home.svg" >
    </template>
    <template #end>
      <Avatar class="user" icon="pi pi-user" shape="circle" />
    </template>
  </Menubar>
  <RouterView/>
  <Toast />
</template>

<style scoped>
.logo {
  height: 5em;
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
</style>
