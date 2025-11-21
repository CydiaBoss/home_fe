<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import APIS from '../apis';

const router = useRouter();
const user = ref({});
const photos = ref([]);

onMounted(() => {
  // Mock API call to get user data
  APIS.getUserProfile().then((response) => {
    user.value = response.user;
    photos.value = response.photos;
  });
});

const navigateTo = (path) => {
  router.push(path);
};

const goToPhoto = (photo) => {
  if (photo && photo.id) {
    router.push({ name: 'singlephoto', params: { id: photo.id } });
  }
};

</script>

<template>
  <div class="profile-container">
    <Card class="profile-card">
      <template #header>
        <div class="header-wrapper">
          <img class="header-pic" :src="user.avatar" />
           <Button icon="pi pi-cog" class="edit-button p-button-rounded p-button-secondary" @click="navigateTo('/profile/edit')" />
        </div>
      </template>
      <template #title>{{ user.name }}</template>
      <template #subtitle>{{ user.email }}</template>
      <template #content>
        <p>{{ user.bio }}</p>
      </template>
    </Card>

    <div class="photo-gallery">
      <h2>{{ $t('myPhotos') }}</h2>
      <Galleria :value="photos" :numVisible="5" containerStyle="width: 100%" :showThumbnails="false" :showIndicators="true" :circular="true" :autoPlay="true" :transitionInterval="3000">
        <template #item="slotProps">
          <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block; cursor: pointer;" @click="goToPhoto(slotProps.item)" />
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
  position: relative;
}

.header-wrapper {
  text-align: center;
  position: relative;
}

.edit-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
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
