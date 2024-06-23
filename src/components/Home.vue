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
  <h1>{{ $t("appTitle") }}</h1>

  <div class="card">
    <p>
      {{ $t("homeDescription") }}
    </p>
  </div>

  <Paginator :rows="10" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]"></Paginator>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
