<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import APIS from '../apis';

const { t } = useI18n();
const media = ref([]);
const loading = ref(false);
const page = ref(1);
const router = useRouter();
const hasMore = ref(true);
const sentinel = ref(null);

const isVideo = (item) => {
  return item.itemImageSrc && item.itemImageSrc.endsWith('.mp4');
};

const loadMoreItems = async () => {
  if (loading.value || !hasMore.value) return;
  loading.value = true;
  try {
    const data = await APIS.getMedia(page.value, 10);
    if (data.media && data.media.length > 0) {
      media.value.push(...data.media);
      page.value++;
    } else {
      hasMore.value = false;
    }
  } catch (error) {
    console.error('Failed to load media:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry && entry.isIntersecting) {
        loadMoreItems();
      }
    },
    {
      root: null, // observing intersections with the viewport
      threshold: 1.0,
    }
  );

  if (sentinel.value) {
    observer.observe(sentinel.value);
  }

  onUnmounted(() => {
    observer.disconnect();
  });
});

const goToMedia = (item) => {
  if (item && item.id) {
    if (isVideo(item)) {
      router.push({ name: 'singlevideo', params: { id: item.id } });
    } else {
      router.push({ name: 'singlephoto', params: { id: item.id } });
    }
  }
};

const playVideo = (event) => {
  event.target.play();
};

const pauseVideo = (event) => {
  event.target.pause();
};
</script>

<template>
  <div class="media-gallery-container">
    <h1>{{ t('pages.gallery.title') }}</h1>
    <div class="media-grid">
      <div v-for="item in media" :key="item.id" class="grid-item">
        <Card @click="goToMedia(item)">
          <template #header>
            <div class="card-header-container">
              <img v-if="!isVideo(item)" :src="item.itemImageSrc" :alt="item.title" style="width: 100%; display: block;" />
              <video 
                v-else 
                :src="item.itemImageSrc" 
                muted 
                loop
                playsinline
                @mouseenter="playVideo" 
                @mouseleave="pauseVideo"
                style="width: 100%; display: block;">
                <source :src="item.itemImageSrc">
                Your browser does not support the video tag.
              </video>
              <div class="card-title-overlay">
                <div class="card-title">{{ item.title }}</div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <div ref="sentinel" style="height: 10px"></div>
    <div v-if="loading" class="loading">{{ t('messages.loading') }}</div>
  </div>
</template>

<style scoped>
.media-gallery-container {
  width: 100%;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.grid-item {
  position: relative;
}

.grid-item .p-card {
  border-radius: 0.75rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: transform 0.2s ease-in-out;
  overflow: hidden;
  cursor: pointer;
}

.grid-item .p-card:hover {
  transform: scale(1.05);
}

.grid-item :deep(.p-card-body) {
    padding: 0;
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
    padding: 0.5rem;
    text-align: center;
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
}

.grid-item .p-card:hover .card-title-overlay {
    opacity: 1;
}

.card-title {
    font-weight: bold;
}
</style>
