<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import Paginator from 'primevue/paginator';

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <Button label="button" @click="count++">count is {{ count }}</Button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <Paginator :rows="10" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]"></Paginator>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
