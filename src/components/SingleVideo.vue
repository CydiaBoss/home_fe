<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import APIS from '../apis';
import Tag from 'primevue/tag';
import { useI18n } from 'vue-i18n';
import { VideoPlayer } from '@videojs-player/vue';
import 'video.js/dist/video-js.css';

const { t } = useI18n();
const route = useRoute();
const video = ref({});
const comments = ref([]);
const newComment = ref('');

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

const shareVideo = () => {
  if (navigator.share) {
    navigator.share({
      title: video.value.title,
      text: video.value.alt,
      url: window.location.href,
    })
    .then(() => console.log(t('messages.success.successfulShare')))
    .catch((error) => console.log(t('messages.errors.errorSharing'), error));
  } else {
    alert(t('messages.errors.shareNotSupported'));
  }
};
</script>

<template>
  <div class="video-container">
    <Card class="video-card">
        <template #header>
            <video-player
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
                <Button icon="pi pi-share-alt" class="p-button-rounded p-button-secondary" @click="shareVideo" />
            </div>
        </template>
    </Card>

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
</style>
