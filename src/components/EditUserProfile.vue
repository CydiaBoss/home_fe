<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import APIS from '../apis';

const router = useRouter();
const user = ref({});

onMounted(() => {
  // Mock API call to get user data
  APIS.getUserProfile().then((response) => {
    user.value = response.user;
  });
});

const saveProfile = () => {
  // Mock API call to save user data
  console.log('Saving profile:', user.value);
  router.push('/profile');
};

const cancelEdit = () => {
  router.push('/profile');
};
</script>

<template>
  <div class="edit-profile-container">
    <Card class="edit-profile-card">
      <template #title>{{ $t('editProfile') }}</template>
      <template #content>
        <div class="form-grid">
          <div class="field">
            <label for="name">{{ $t('name') }}</label>
            <InputText id="name" v-model="user.name" />
          </div>
          <div class="field">
            <label for="email">{{ $t('email') }}</label>
            <InputText id="email" v-model="user.email" />
          </div>
          <div class="field">
            <label for="bio">{{ $t('bio') }}</label>
            <Textarea id="bio" v-model="user.bio" rows="5" />
          </div>
          <div class="field">
            <label for="password">{{ $t('newPassword') }}</label>
            <Password id="password" v-model="user.password" />
          </div>
          <div class="field">
            <label for="avatar">{{ $t('avatar') }}</label>
            <div class="avatar-upload">
              <img class="avatar-preview" :src="user.avatar" />
              <FileUpload mode="basic" name="avatar-upload" url="./upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" :auto="true" :chooseLabel="$t('browse')" />
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="p-d-flex p-jc-end">
          <Button :label="$t('cancel')" icon="pi pi-times" @click="cancelEdit" class="p-button-secondary" />
          <Button :label="$t('save')" icon="pi pi-check" @click="saveProfile" />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.edit-profile-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
}

.edit-profile-card {
  width: 100%;
  max-width: 50rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.field > label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.avatar-upload {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
