<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import APIS from '../apis';
import Card from 'primevue/card';

const media = ref([]);
const router = useRouter();
let page = 1;
const loading = ref(false);

const fetchMedia = () => {
  if (loading.value) return;
  loading.value = true;
  APIS.getUserProfile({ page, limit: 10 }).then((response) => {
    const { photos = [], videos = [] } = response;
    media.value = [...media.value, ...photos, ...videos.map(v => ({...v, thumbnailTime: v.thumbnailTime || 0.1}))];
    page++;
    loading.value = false;
  });
};

const handleScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    fetchMedia();
  }
};

onMounted(() => {
  fetchMedia();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const isVideo = (item) => {
  return item && item.itemImageSrc && item.itemImageSrc.includes('.mp4');
};

const goToMedia = (item) => {
  if (item && item.id) {
    if (isVideo(item)) {
      router.push({ name: 'singlevideo', params: { id: item.id } });
    } else {
      router.push({ name: 'singlephoto', params: { id: item.id } });
    }
  }
};
</script>

<template>
  <div class="media-gallery-container">
    <Card>
      <template #title>
        {{ $t('pages.gallery.title') }}
      </template>
      <template #content>
        <div class="masonry">
          <div v-for="item in media" :key="item.id" class="masonry-item">
            <Card @click="goToMedia(item)">
              <template #header>
                <div class="card-header-container">
                  <img v-if="!isVideo(item)" :src="item.itemImageSrc" :alt="item.alt" style="width: 100%; display: block; cursor: pointer;" />
                  <video v-else :src="item.itemImageSrc + '#t=' + item.thumbnailTime" style="width: 100%; display: block; cursor: pointer;" />
                  <div class="card-title-overlay">
                    <div class="card-title">{{ item.title }}</div>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>
        <div v-if="loading" class="loading">{{ $t('messages.loading') }}</div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.media-gallery-container {
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
    background-color: rgba(0, 0, 0, 0.25);
    color: #fff;
    padding: 0.5rem;
    text-align: center;
    font-size: 0.75rem;
    transition: font-size 0.2s ease-in-out;
}

.masonry-item .p-card:hover .card-title-overlay {
    font-size: 1.25rem;
}

.card-title {
    font-weight: bold;
}

@media (max-width: 768px) {
  .masonry {
    column-count: 2;
  }
}
</style>
