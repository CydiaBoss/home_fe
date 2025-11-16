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
          <div v-for="photo in filteredPhotos" :key="photo.id" class="photo-item">
            <img :src="photo.itemImageSrc" :alt="photo.alt" />
            <div class="photo-actions">
              <Button icon="pi pi-pencil" @click="openEditDialog(photo)" />
              <Button icon="pi pi-trash" @click="deletePhoto(photo.id)" class="p-button-danger" />
            </div>
          </div>
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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.photo-item {
  position: relative;
}
.photo-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
.photo-actions {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.5rem;
}
.edit-photo-form .field {
  margin-bottom: 1rem;
}
</style>
