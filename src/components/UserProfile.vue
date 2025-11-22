<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import APIS from '../apis';
import Card from 'primevue/card';
import Button from 'primevue/button';

const router = useRouter();
const user = ref({});
const photos = ref([]);
const videos = ref([]);

onMounted(() => {
  APIS.getUserProfile().then((response) => {
    user.value = response.user;
    photos.value = response.photos;
    videos.value = response.videos.map(v => ({...v, thumbnailTime: v.thumbnailTime || 0.1}));
  });
});

const photoAnimationDuration = computed(() => {
    return photos.value.length * 5;
});

const videoAnimationDuration = computed(() => {
    return videos.value.length * 5;
});

const navigateTo = (path) => {
  router.push(path);
};

const goToPhoto = (photo) => {
  if (photo && photo.id) {
    router.push({ name: 'singlephoto', params: { id: photo.id } });
  }
};

const goToVideo = (video) => {
  if (video && video.id) {
    router.push({ name: 'singlevideo', params: { id: video.id } });
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

    <div class="media-gallery" v-if="photos && photos.length > 0">
      <h2>{{ $t('pages.userProfile.photosTitle') }}</h2>
      <div class="slideshow-container">
        <div class="slideshow-track" :style="{ animationDuration: photoAnimationDuration + 's' }">
          <div v-for="(photo, index) in photos.concat(photos)" :key="index" class="slide" @click="goToPhoto(photo)">
            <img :src="photo.itemImageSrc" :alt="photo.alt" />
          </div>
        </div>
      </div>
    </div>

    <div class="media-gallery" v-if="videos && videos.length > 0">
      <h2>{{ $t('pages.userProfile.videosTitle') }}</h2>
      <div class="slideshow-container">
        <div class="slideshow-track" :style="{ animationDuration: videoAnimationDuration + 's' }">
          <div v-for="(video, index) in videos.concat(videos)" :key="index" class="slide" @click="goToVideo(video)">
            <video :src="video.itemImageSrc + '#t=' + video.thumbnailTime"></video>
          </div>
        </div>
      </div>
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
  border: 4px solid var(--surface-card);
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}

.media-gallery {
  width: 100%;
  max-width: 60rem;
  overflow: hidden;
}

.media-gallery h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.slideshow-container {
    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    position: relative;
}

.slideshow-container:hover .slideshow-track {
    animation-play-state: paused;
}

.slideshow-track {
    display: flex;
    animation-name: scroll;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    width: fit-content;
}

@keyframes scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
}

.slide {
    width: 250px;
    height: 180px;
    flex-shrink: 0;
    margin: 0 1rem;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
}

.slide:hover {
    transform: scale(1.05);
}

.slide img,
.slide video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
