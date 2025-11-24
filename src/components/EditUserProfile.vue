<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import APIS from '../apis';

const user = ref({});
const router = useRouter();

onMounted(() => {
  APIS.getUserProfile().then(data => {
    user.value = data.user;
  });
});

const onUpload = (event) => {
  const file = event.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    user.value.avatar = e.target.result;
  };
  reader.readAsDataURL(file);
};

const cancelEdit = () => {
  router.push('/profile');
};

const saveProfile = () => {
  // In a real app, you'd call an API to save the profile.
  // For now, just navigate back to the profile page.
  router.push('/profile');
};
</script>

<template>
  <div class="edit-profile-container">
    <Card class="edit-profile-card">
      <template #title>
        {{ $t('pages.userProfile.editTitle') }}
      </template>
      <template #content>
        <div class="form-grid">
          <div class="field">
            <label>{{ $t('form.avatar') }}</label>
            <div class="avatar-upload">
              <Avatar :image="user.avatar" class="avatar-preview" shape="circle" />
              <FileUpload mode="basic" name="avatar[]" url="./upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" :chooseLabel="$t('actions.browse')" />
            </div>
          </div>
          <div class="field"><!-- Buffer --></div>
          <div class="field">
            <label for="name">{{ $t('form.name') }}</label>
            <InputText id="name" v-model="user.name" />
          </div>
          <div class="field">
            <label for="email">{{ $t('form.email') }}</label>
            <InputText id="email" v-model="user.email" />
          </div>
          <div class="field">
            <label for="bio">{{ $t('form.bio') }}</label>
            <Textarea id="bio" v-model="user.bio" rows="5" />
          </div>
          <div class="field">
            <label for="password">{{ $t('form.newPassword') }}</label>
            <Password id="password" v-model="user.password" />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="footer-buttons">
          <Button :label="$t('actions.cancel')" icon="pi pi-times" @click="cancelEdit" class="p-button-secondary" />
          <Button :label="$t('actions.save')" icon="pi pi-check" @click="saveProfile" style="margin-left: 1rem" />
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
  padding: 1rem;
}

.edit-profile-card {
  width: 100%;
  max-width: 50rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  justify-content: center;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.footer-buttons {
  display: flex;
  justify-content: center;
}
</style>
