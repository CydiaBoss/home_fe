<script setup>
import { ref, onMounted, computed } from 'vue';
import APIS from '../apis';

import Card from 'primevue/card';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Chips from 'primevue/chips';

const media = ref([]);
const displayEditDialog = ref(false);
const editingMedia = ref(null);
const searchTerm = ref('');

onMounted(() => {
  APIS.getUserPhotos().then((response) => {
    const photos = response.photos || [];
    const videos = response.videos || [];
    media.value = [...photos, ...videos];
  });
});

const filteredMedia = computed(() => {
  if (!searchTerm.value) {
    return media.value;
  }
  return media.value.filter(item =>
    item.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const onUpload = (event) => {
  const file = event.files[0];
  // Handle the file upload to the backend
  // and then update the media list
};

const openEditDialog = (item) => {
  editingMedia.value = { ...item };
  displayEditDialog.value = true;
};

const saveMedia = () => {
  // Handle saving the updated media details
  displayEditDialog.value = false;
};

const deleteMedia = (mediaId) => {
  // Handle deleting the media
};

const isVideo = (item) => {
  return item && item.itemImageSrc && item.itemImageSrc.includes('.mp4');
}

</script>

<template>
  <div class="my-media-container">
    <Card class="my-media-card">
      <template #title>
        {{ $t('pages.myMedia.title') }}
      </template>
      <template #content>
        <div class="toolbar-section">
          <FileUpload mode="basic" name="media[]" url="./upload" accept="image/*,video/*" :maxFileSize="1000000" @upload="onUpload" :chooseLabel="$t('actions.uploadPhoto')" />
          <InputText v-model="searchTerm" :placeholder="$t('actions.search')" />
        </div>
        <div class="media-gallery">
          <Card v-for="item in filteredMedia" :key="item.id" class="media-item">
            <template #header>
                <img v-if="!isVideo(item)" :src="item.itemImageSrc" :alt="item.alt" style="width: 100%; display: block;" />
                <video v-else :src="item.itemImageSrc" controls style="width: 100%; display: block;"></video>
            </template>
            <template #content>
                <div class="media-details">
                    <span class="media-title">{{ item.title }}</span>
                    <div class="media-actions">
                        <Button icon="pi pi-pencil" class="p-button-sm" @click="openEditDialog(item)" />
                        <Button icon="pi pi-trash" class="p-button-sm p-button-danger" @click="deleteMedia(item.id)" />
                    </div>
                </div>
            </template>
          </Card>
        </div>
      </template>
    </Card>

    <Dialog :header="!isVideo(editingMedia) ? $t('pages.singlePhoto.editTitle') : $t('pages.singleVideo.editTitle')" v-model:visible="displayEditDialog" :modal="true">
      <div class="edit-media-form">
        <div class="edit-media-image">
          <img v-if="!isVideo(editingMedia)" :src="editingMedia.itemImageSrc" :alt="editingMedia.alt" />
          <video v-else :src="editingMedia.itemImageSrc" controls></video>
        </div>
        <div class="edit-media-fields">
          <div class="field">
            <label for="title">{{ $t('form.title') }}</label>
            <InputText id="title" v-model="editingMedia.title" />
          </div>
          <div class="field">
            <label for="description">{{ $t('form.description') }}</label>
            <Textarea id="description" v-model="editingMedia.description" rows="3" />
          </div>
          <div class="field">
            <label for="tags">{{ $t('form.tags') }}</label>
            <Chips id="tags" v-model="editingMedia.tags" />
          </div>
        </div>
      </div>
      <template #footer>
        <Button :label="$t('actions.cancel')" icon="pi pi-times" @click="displayEditDialog = false" class="p-button-text"/>
        <Button :label="$t('actions.save')" icon="pi pi-check" @click="saveMedia" />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.my-media-card {
  width: 100%;
}
.toolbar-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.media-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
}

.media-item {
  border-radius: 0.75rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: transform 0.2s ease-in-out;
  overflow: hidden;
}

.media-item:hover {
  transform: scale(1.05);
}

.media-item :deep(.p-card-body) {
    padding: 0;
}

.media-item :deep(.p-card-content) {
    padding: 0.75rem;
}

.media-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.media-title {
    font-weight: bold;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.media-actions {
  display: flex;
  gap: 0.5rem;
}

.media-actions .p-button {
    transition: filter 0.2s ease-in-out;
}

.media-actions .p-button:hover {
    filter: drop-shadow(0 0 0.5rem #646cffaa);
}

.edit-media-form {
  display: flex;
  gap: 1.5rem;
}

.edit-media-image {
  flex: 1;
}

.edit-media-image img, .edit-media-image video {
  width: 100%;
  border-radius: 0.5rem;
}

.edit-media-fields {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.edit-media-form .field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.edit-media-form .field :deep(input, textarea, .p-chips) {
  width: 100%;
}

@media (max-width: 768px) {
  .edit-media-form {
    flex-direction: column;
  }
}
</style>
