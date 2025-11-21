<script setup>
import { ref, onMounted, computed } from 'vue';
import APIS from '../apis';

import Card from 'primevue/card';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

const photos = ref([]);
const displayEditDialog = ref(false);
const editingPhoto = ref(null);
const searchTerm = ref('');

onMounted(() => {
  APIS.getUserPhotos().then((response) => {
    photos.value = response.photos;
  });
});

const filteredPhotos = computed(() => {
  if (!searchTerm.value) {
    return photos.value;
  }
  return photos.value.filter(photo =>
    photo.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const onUpload = (event) => {
  const file = event.files[0];
  // Handle the file upload to the backend
  // and then update the photos list
};

const openEditDialog = (photo) => {
  editingPhoto.value = { ...photo };
  displayEditDialog.value = true;
};

const savePhoto = () => {
  // Handle saving the updated photo details
  displayEditDialog.value = false;
};

const deletePhoto = (photoId) => {
  // Handle deleting the photo
};

</script>

<template>
  <div class="my-photos-container">
    <Card class="my-photos-card">
      <template #title>
        {{ $t('myPhotos') }}
      </template>
      <template #content>
        <div class="toolbar-section">
          <FileUpload mode="basic" name="photos[]" url="./upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" :chooseLabel="$t('uploadPhoto')" />
          <InputText v-model="searchTerm" :placeholder="$t('search')" />
        </div>
        <div class="photo-gallery">
          <Card v-for="photo in filteredPhotos" :key="photo.id" class="photo-item">
            <template #header>
                <img :src="photo.itemImageSrc" :alt="photo.alt" style="width: 100%; display: block;" />
            </template>
            <template #content>
                <div class="photo-details">
                    <span class="photo-title">{{ photo.title }}</span>
                    <div class="photo-actions">
                        <Button icon="pi pi-pencil" class="p-button-sm" @click="openEditDialog(photo)" />
                        <Button icon="pi pi-trash" class="p-button-sm p-button-danger" @click="deletePhoto(photo.id)" />
                    </div>
                </div>
            </template>
          </Card>
        </div>
      </template>
    </Card>

    <Dialog :header="$t('editPhoto')" v-model:visible="displayEditDialog" :modal="true">
      <div class="edit-photo-form">
        <div class="field">
          <label for="title">{{ $t('title') }}</label>
          <InputText id="title" v-model="editingPhoto.title" />
        </div>
        <!-- Add other fields to edit here -->
      </div>
      <template #footer>
        <Button :label="$t('cancel')" icon="pi pi-times" @click="displayEditDialog = false" class="p-button-text"/>
        <Button :label="$t('save')" icon="pi pi-check" @click="savePhoto" />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.my-photos-card {
  width: 100%;
}
.toolbar-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.photo-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.photo-item {
  border-radius: 0.75rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: transform 0.2s ease-in-out;
  overflow: hidden;
}

.photo-item:hover {
  transform: scale(1.05);
}

.photo-item :deep(.p-card-body) {
    padding: 0;
}

.photo-item :deep(.p-card-content) {
    padding: 0.75rem;
}

.photo-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.photo-title {
    font-weight: bold;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.photo-actions {
  display: flex;
  gap: 0.5rem;
}

.photo-actions .p-button {
    transition: filter 0.2s ease-in-out;
}

.photo-actions .p-button:hover {
    filter: drop-shadow(0 0 0.5rem #646cffaa);
}

.edit-photo-form .field {
  margin-bottom: 1rem;
}
</style>
