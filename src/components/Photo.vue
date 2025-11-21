<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import APIS from '../apis';
import Card from 'primevue/card';

const images = ref([]);
const router = useRouter();
let page = 1;
const loading = ref(false);

const fetchPhotos = () => {
  if (loading.value) return;
  loading.value = true;
  APIS.getUserPhotos({ page, limit: 10 }).then((response) => {
    images.value = [...images.value, ...response.photos];
    page++;
    loading.value = false;
  });
};

const handleScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    fetchPhotos();
  }
};

onMounted(() => {
  fetchPhotos();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const goToPhoto = (photo) => {
  if (photo && photo.id) {
    router.push({ name: 'singlephoto', params: { id: photo.id } });
  }
};
</script>

<template>
  <div class="photo-gallery">
    <Card>
      <template #title>
        {{ $t('photos') }}
      </template>
      <template #content>
        <div class="masonry">
          <div v-for="image in images" :key="image.id" class="masonry-item">
            <Card @click="goToPhoto(image)">
              <template #header>
                <div class="card-header-container">
                  <img :src="image.itemImageSrc" :alt="image.alt" style="width: 100%; display: block; cursor: pointer;" />
                  <div class="card-title-overlay">
                    <div class="card-title">{{ image.title }}</div>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>
        <div v-if="loading" class="loading">Loading...</div>
      </template>
    </Card>
    
  </div>
</template>

<style scoped>
.photo-gallery {
  width: 100%;
}
.masonry {
  column-count: 4;
  column-gap: 1rem;
}
.masonry-item {
  display: inline-block;
  width: 100%;
  margin-bottom: 1rem;
  break-inside: avoid;
}
.masonry-item :deep(.p-card-body) {
    padding: 0;
}
.masonry-item .p-card {
  border-radius: 0.75rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: transform 0.2s ease-in-out;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2); 
}
.masonry-item .p-card:hover {
  transform: scale(1.05);
}
.loading {
  text-align: center;
  padding: 1rem;
}
.card-header-container {
    position: relative;
}
.card-title-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 0.75rem;
}
.card-title {
    font-size: 1rem;
    font-weight: bold;
}
</style>
