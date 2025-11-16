<script setup>
import { ref, onMounted } from 'vue';
import APIS from '../apis';

const user = ref({});
const photos = ref([]);

onMounted(() => {
  // Mock API call to get user data
  APIS.getUserProfile().then((response) => {
    user.value = response.user;
    photos.value = response.photos;
  });
});

</script>

<template>
  <div class="profile-container">
    <Card class="profile-card">
      <template #header>
        <div class="header-wrapper">
          <img class="header-pic" :src="user.avatar" />
        </div>
      </template>
      <template #title>{{ user.name }}</template>
      <template #subtitle>{{ user.email }}</template>
      <template #content>
        <p>{{ user.bio }}</p>
      </template>
    </Card>

    <div class="photo-gallery">
      <h2>My Photos</h2>
      <Galleria :value="photos" :numVisible="5" containerStyle="width: 100%" :showThumbnails="false" :showIndicators="true" :circular="true" :autoPlay="true" :transitionInterval="3000">
        <template #item="slotProps">
          <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
        </template>
      </Galleria>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
}

.profile-card {
  max-width: 40rem;
  width: 100%;
}

.header-wrapper {
  text-align: center;
}

.header-pic {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 1rem;
  border: 4px solid #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}

.photo-gallery {
  width: 100%;
  max-width: 60rem;
}

.photo-gallery h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}
</style>
