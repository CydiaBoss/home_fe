<script setup>
import { ref } from 'vue';
import APIS from '../apis';

const username = ref("");
const password = ref("");
const errors = ref([]);

function onFormSubmit() {
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
  <h2>{{ $t("loginTitle") }}</h2>
  <p>
    {{ $t("loginDescription") }}
  </p>
  <form @submit.prevent="onFormSubmit">
    <InputText v-model="username" type="text" :placeholder="$t('username')" fluid />
    <Password v-model="password" :placeholder="$t('password')" toggleMask fluid :feedback="false" />
    <Message v-if="errors.length > 0" severity="error" size="small" variant="simple" :closable="false">
      <ul class="my-0 px-4 flex flex-col gap-1">
        <li v-for="(error, index) of errors" :key="index">{{ error }}</li>
      </ul>
    </Message>
    <Button type="submit" severity="primary" :label="$t('submit')" />
  </form>
</template>

<style scoped>
form {
  width: 100vh;
  margin: auto;
  display: flex;
  gap: 1em;
  flex-direction: column;
}
form div, input {
  width: 100%;
}
button {
  width: 80vh;
  margin: auto;
}
</style>
