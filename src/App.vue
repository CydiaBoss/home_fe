<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import Toast from 'primevue/toast';

import Menubar from 'primevue/menubar';

const menus = ref([
  {
    label: 'Home',
    icon: 'pi pi-home'
  },
  {
    label: 'Contact',
    icon: 'pi pi-envelope'
  }
]);
</script>

<template>
  <Menubar class="menubar" :model="menus">
    <template #start>
      <img class="logo" src="/home.svg" >
    </template>
  </Menubar>
  <RouterView />
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
</style>
