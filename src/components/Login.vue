<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import APIS from '../apis';

const username = ref("");
const password = ref("");
const errors = ref([]);
const router = useRouter();

function loginUser() {
  // Clear Errors
  errors.value = [];

  // Validate Username
  if (username.value.trim() == "") {
    errors.value.push("usernameRequired");
  }

  // Validate Password
  if (password.value.trim() == "") {
    errors.value.push("passwordRequired");
  }

  // End if fail
  if (errors.value.length > 0) {
    return;
  }

  // Send off request to backend
  APIS.loginUser(username.value, password.value).then((resp) => {
    // On fail
    if (resp.success == "fail") {
      errors.value.push("incorrectCredentials");
      return;
    }
    // On pass
    document.cookie = `token=${resp.token}; path=/`;
    router.push('/profile');
  });
}
</script>

<template>
  <Card class="login-card" style="max-width: 30rem; overflow: hidden">
      <template #header>
        <div class="header-wrapper">
          <img class="header-pic" src="https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg">
        </div>
      </template>
      <template #title>{{ $t("loginTitle") }}</template>
      <template #subtitle>{{ $t("loginDescription") }}</template>
      <template #content>
        <div class="login-form">
          <InputText v-model="username" type="text" :placeholder="$t('username')" fluid />
          <Password v-model="password" :placeholder="$t('password')" toggleMask fluid :feedback="false" />
          <Message v-if="errors.length > 0" severity="error" size="small" variant="simple" closable>
            <ul class="error-list">
              <li v-for="(error, index) of errors" :key="index">{{ $t(error) }}</li>
            </ul>
          </Message>
        </div>
      </template>
      <template #footer>
          <div class="flex mt-1">
            <Button severity="primary" :label="$t('submit')" @click="loginUser" style="width: 100%;"/>
          </div>
      </template>
  </Card>
</template>

<style scoped>
.login-card {
  margin: auto;
  flex: 0 1 auto;
}
.header-wrapper {
  display: flex;
  overflow: hidden;
  max-height: 25vh;
  justify-content: center;
}
.header-pic {
  width: 100%;
  object-fit: cover;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.error-list {
  font-size: small;
  margin: 0;
  padding-left: 1.5rem;
}
</style>
