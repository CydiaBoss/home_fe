<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import APIS from '../apis';
import Tag from 'primevue/tag';
import { useI18n } from 'vue-i18n';
import { VideoPlayer } from '@videojs-player/vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ToggleButton from 'primevue/togglebutton';
import Calendar from 'primevue/calendar';

import 'video.js/dist/video-js.css';

const { t } = useI18n();
const route = useRoute();
const video = ref({});
const comments = ref([]);
const newComment = ref('');
const showShareDialog = ref(false);
const expiryEnabled = ref(false);
const expiryDate = ref(null);
const shareLink = ref('');

onMounted(() => {
  const videoId = route.params.id;
  APIS.getVideoById(videoId).then((response) => {
    video.value = response;
    comments.value = response.comments;
  });
});

const addComment = () => {
  if (newComment.value.trim() !== '') {
    comments.value.push({
        id: comments.value.length + 1,
        author: t('user.currentUser'),
        text: newComment.value,
        createdAt: new Date().toLocaleString()
    });
    newComment.value = '';
  }
};

const toggleFavorite = () => {
  video.value.isFavorited = !video.value.isFavorited;
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
  <div class="video-container">
    <Card class="video-card">
        <template #header>
            <VideoPlayer
                class="video-js vjs-big-play-centered"
                :src="video.itemImageSrc"
                controls
                :loop="true"
                :volume="0.6"
                />
        </template>
        <template #title>{{ video.title }}</template>
        <template #content>
            <p>{{ video.alt }}</p>
            <div class="tags-section">
                <Tag v-for="tag in video.tags" :key="tag" :value="tag"></Tag>
            </div>
        </template>
        <template #footer>
            <div class="actions">
                <Button icon="pi pi-heart" class="p-button-rounded" :class="{'p-button-danger': video.isFavorited}" @click="toggleFavorite" />
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
                <Calendar v-model="expiryDate" :showIcon="true" />
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
.video-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
}
.video-card {
  max-width: 60rem;
  width: 100%;
}

.video-card :deep(.video-js) {
    border-radius: 0.75rem;
    overflow: hidden;
    width: 100%;
}

.video-card :deep(.vjs-big-play-button) {
    background-color: #646cffaa;
    border: none;
    transition: background-color 0.2s ease-in-out;
}

.video-card :deep(.vjs-big-play-button:hover) {
    background-color: #646cff;
}

.video-card :deep(.vjs-control-bar) {
    background-color: rgba(0, 0, 0, 0.5);
}

.video-card :deep(.vjs-play-progress) {
    background-color: #646cff;
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
