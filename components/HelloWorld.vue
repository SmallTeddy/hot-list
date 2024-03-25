<script lang="ts" setup>
defineProps({
  msg: String,
});
</script>

<template>
  <div w-full h-screen flex-center>
    <p color-red>{{ msg }}</p>
  </div>
</template>
