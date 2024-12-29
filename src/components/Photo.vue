<script setup>
  const props = defineProps(["msg"])
</script>

<template>
  <h3>{{ $t("appTitle") }}</h3>
  {{ props.msg }}
  <p>
    {{ $t("homeDescription") }}
  </p>
</template>

<style scoped>
</style>
