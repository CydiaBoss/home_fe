<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import APIS from '../apis';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();
const photo = ref({});
const comments = ref([]);
const newComment = ref('');
const showShareDialog = ref(false);
const expiryEnabled = ref(false);
const expiryDate = ref(null);
const shareLink = ref('');

onMounted(() => {
  const photoId = route.params.id;
  APIS.getPhotoById(photoId).then((response) => {
    photo.value = response;
    comments.value = response.comments;
  });
});

const addComment = () => {
  if (newComment.value.trim() !== '') {
    // Mock API call to add comment
    comments.value.push({
        id: comments.value.length + 1,
        author: t('user.currentUser'), // Replace with actual user
        text: newComment.value,
        createdAt: new Date().toLocaleString()
    });
    newComment.value = '';
  }
};

const toggleFavorite = () => {
  photo.value.isFavorited = !photo.value.isFavorited;
  // Mock API call to update favorite status
};

const openShareDialog = () => {
  showShareDialog.value = true;
};

const generateShareLink = () => {
  let link = window.location.href;
  if (expiryEnabled.value && expiryDate.value) {
    const expiry = new Date(expiryDate.value).toISOString();
    link += `?expires=${expiry}`;
  }
  shareLink.value = link;
};

</script>

<template>
  <div class="photo-container">
    <Card class="photo-card">
        <template #header>
            <img :src="photo.itemImageSrc" :alt="photo.alt" style="width: 100%; display: block;" />
        </template>
        <template #title>{{ photo.title }}</template>
        <template #content>
            <p>{{ photo.alt }}</p>
            <div class="tags-section">
                <Tag v-for="tag in photo.tags" :key="tag" :value="tag"></Tag>
            </div>
        </template>
        <template #footer>
            <div class="actions">
                <Button icon="pi pi-heart" class="p-button-rounded" :class="{'p-button-danger': photo.isFavorited}" @click="toggleFavorite" />
                <Button icon="pi pi-share-alt" class="p-button-rounded p-button-secondary" @click="openShareDialog" />
            </div>
        </template>
    </Card>

    <Dialog v-model:visible="showShareDialog" modal :header="$t('form.generateShareLink.title')" :style="{ width: '50vw' }">
        <div class="p-fluid">
            <div class="p-field">
                <label for="expiry-toggle">{{ $t('form.generateShareLink.enableExpiry') }}</label>
                <ToggleButton v-model="expiryEnabled" :onLabel="$t('form.generateShareLink.enabled')" :offLabel="$t('form.generateShareLink.disabled')" />
            </div>
            <div v-if="expiryEnabled" class="p-field">
                <label for="expiry-date">{{ $t('form.generateShareLink.expiryDate') }}</label>
                <DatePicker v-model="expiryDate" :showIcon="true" :showTime="true" />
            </div>
            <div class="p-field">
                <Button :label="$t('form.generateShareLink.generateLink')" @click="generateShareLink" />
            </div>
            <div v-if="shareLink" class="p-field">
                <label for="share-link">{{ $t('form.generateShareLink.shareLink') }}</label>
                <InputText v-model="shareLink" readonly />
            </div>
        </div>
    </Dialog>


    <div class="comments-section">
      <h3>{{ $t('form.comments') }}</h3>
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <strong>{{ comment.author }}</strong>
        <p>{{ comment.text }}</p>
        <span>{{ comment.createdAt }}</span>
      </div>
      <div class="add-comment">
        <Textarea v-model="newComment" rows="3" :placeholder="$t('form.addComment')" />
        <Button :label="$t('actions.comment')" @click="addComment" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.photo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
}
.photo-card {
  max-width: 60rem;
  width: 100%;
}
.actions {
    display: flex;
    gap: 1rem;
}
.tags-section {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
}
.comments-section {
    max-width: 60rem;
    width: 100%;
}
.comment {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ccc;
}
.add-comment {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.p-field {
    margin-bottom: 1rem;
}
</style>