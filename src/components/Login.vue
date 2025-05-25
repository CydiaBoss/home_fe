<script setup>
import { ref } from 'vue';
import APIS from '../apis';

const username = ref("");
const password = ref("");
const errors = ref([]);

function loginUser() {
  // Clear Errors
  errors.value = [];

  // Validate Username
  if (username.value.trim() == "") {
    errors.value.push("No username was given!");
  }

  // Validate Password
  if (password.value.trim() == "") {
    errors.value.push("No password was given!");
  }

  // End if fail
  if (errors.value.length > 0) {
    return;
  }

  // Send off request to backend
  APIS.loginUser(username.value, password.value).then((resp) => {
    // On fail
    if (resp.success == "fail") {
      errors.value.push("Incorrect username or password");
      return;
    }
    // On pass
    // TODO login user
  });
}
</script>

<template>
  <Card class="login" style="width: 25rem; overflow: hidden">
      <template #header>
        <div class="headerwrapper">
          <img class="headerpic" src="\example.jpg">
        </div>
      </template>
      <template #title>{{ $t("loginTitle") }}</template>
      <template #subtitle>{{ $t("loginDescription") }}</template>
      <template #content>
        <div class="loginform">
          <InputText v-model="username" type="text" :placeholder="$t('username')" fluid />
          <Password v-model="password" :placeholder="$t('password')" toggleMask fluid :feedback="false" />
          <Message v-if="errors.length > 0" severity="error" size="small" variant="simple" :closable="false">
            <ul class="my-0 px-4 flex flex-col gap-1">
              <li v-for="(error, index) of errors" :key="index">{{ error }}</li>
            </ul>
          </Message>
        </div>
      </template>
      <template #footer>
          <div class="flex gap-4 mt-1">
            <Button severity="primary" :label="$t('submit')" @click="loginUser" />
          </div>
      </template>
  </Card>
</template>

<style scoped>
.login {
  margin: auto;
  margin-top: 3rem;
  flex: 0 1 auto;
}
.headerwrapper {
  display: flex;
  overflow: hidden;
  max-height: 20vh;
  justify-content: center;
}
.headerpic {
  width: 100%;
  object-fit: cover;
}
.loginform {
  width: 80%;
  margin: auto;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
}
button {
  width: 90%;
  margin: auto;
}
</style>
