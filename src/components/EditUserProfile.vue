<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import APIS from '../apis';
import { useUserStore } from '../stores/user';
import { useToast } from 'primevue/usetoast';

const userStore = useUserStore();
const name = ref("");
const email = ref("");
const bio = ref("");
const password = ref("");
const router = useRouter();
const toast = useToast();

onMounted(() => {
  name.value = userStore.user.full_name;
  bio.value = userStore.user.bio;
  email.value = userStore.user.email;
});

const onUpload = (event) => {
  const file = event.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    userStore.avatar.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const cancelEdit = () => {
  router.push('/profile');
};

const saveProfile = () => {
  const nameParts = name.value.split(" ");
  let userPayload = {
    first_name: nameParts.slice(0, -1).join(" "),
    last_name: nameParts.at(-1),
    bio: bio.value,
    email: email.value
  };

  // Add password if needed
  if (password.value != "") {
    userPayload.password = password.value;
  }

  // Update
  APIS.updateUserProfile(userPayload).then(resp => {
    const isError = resp.success != "success";
    toast.add({
      severity: isError ? 'error' : 'success', 
      summary: 'User Details', 
      detail: isError ? 'Failed to save: ' + resp.message : "Saved successfully", 
      life: 3000
    });
    if (!isError)
      router.push('/profile');
  });
};
</script>

<template>
  <div class="edit-profile-container">
    <Card class="edit-profile-card">
      <template #title>
        {{ $t('pages.userProfile.editTitle') }}
      </template>
      <template #content>
        <div class="field">
          <label>{{ $t('form.avatar') }}</label>
          <div class="avatar-upload">
            <Avatar :image="userStore.avatar" class="avatar-preview" shape="circle" />
            <FileUpload mode="basic" name="avatar[]" url="./upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" :chooseLabel="$t('actions.browse')" />
          </div>
        </div>
        <div class="form-grid">
          <div class="field">
            <label for="name">{{ $t('form.name') }}</label>
            <InputText id="name" v-model="name" />
          </div>
          <div class="field">
            <label for="email">{{ $t('form.email') }}</label>
            <InputText id="email" v-model="email" />
          </div>
          <div class="field">
            <label for="bio">{{ $t('form.bio') }}</label>
            <Textarea id="bio" v-model="bio" rows="5" />
          </div>
          <div class="field">
            <label for="password">{{ $t('form.newPassword') }}</label>
            <Password id="password" v-model="password" />
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
