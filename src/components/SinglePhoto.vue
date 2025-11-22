<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import APIS from '../apis';
import Tag from 'primevue/tag';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();
const photo = ref({});
const comments = ref([]);
const newComment = ref('');

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
        author: t('currentUser'), // Replace with actual user
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

const sharePhoto = () => {
  // Basic share functionality
  if (navigator.share) {
    navigator.share({
      title: photo.value.title,
      text: photo.value.alt,
      url: window.location.href,
    })
    .then(() => console.log(t('successfulShare')))
    .catch((error) => console.log(t('errorSharing'), error));
  } else {
    alert(t('shareNotSupported'));
  }
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
                <Button icon="pi pi-share-alt" class="p-button-rounded p-button-secondary" @click="sharePhoto" />
            </div>
        </template>
    </Card>

    <div class="comments-section">
      <h3>{{ $t('comments') }}</h3>
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <strong>{{ comment.author }}</strong>
        <p>{{ comment.text }}</p>
        <span>{{ comment.createdAt }}</span>
      </div>
      <div class="add-comment">
        <Textarea v-model="newComment" rows="3" :placeholder="$t('addComment')" />
        <Button :label="$t('comment')" @click="addComment" />
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
</style>
