<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import APIS from '../apis';

const props = defineProps(["msg"]);
const images = ref([]);
const router = useRouter();

onMounted(() => {
  APIS.getUserPhotos().then((response) => {
    images.value = response.photos;
  });
});

const goToPhoto = (photo) => {
  if (photo && photo.id) {
    router.push({ name: 'singlephoto', params: { id: photo.id } });
  }
};
</script>

<template>
  <div class="photo-container">
    <h2>{{ $t("appTitle") }}</h2>
    <Galleria :value="images" :numVisible="5" containerStyle="width: 100%; min-height: 80vh" circular autoPlay showItemNavigators showItemNavigatorsOnHover>
      <template #item="slotProps">
          <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block; cursor: pointer;" @click="goToPhoto(slotProps.item)"/>
      </template>
      <template #thumbnail="slotProps">
          <div class="p-galleria-thumbnail-item-content">
            <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block;"/>
          </div>
      </template>
    </Galleria>
  </div>
</template>

<style scoped>
.photo-container {
  width: 100%;
}

.photo-container :deep(.p-galleria) {
  border-radius: 0.5rem;
}

.photo-container :deep(.p-galleria-thumbnail-wrapper) {
  background-color: rgba(0,0,0,0.5);
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.photo-container :deep(.p-galleria img) {
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s ease-in-out;
}

.photo-container :deep(.p-galleria .p-galleria-thumbnail-item-content:hover img) {
  transform: scale(1.1);
  cursor: pointer;
}

.photo-container :deep(.p-galleria .p-galleria-item-container img) {
  border-radius: 0.5rem;
}
</style>
