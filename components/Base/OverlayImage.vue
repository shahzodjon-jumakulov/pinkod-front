<script setup>
defineProps({
  image: String,
  title: String,
  video: Boolean,
});
</script>

<template>
  <div class="relative aspect-[3/2] -z-[1]">
    <img :src="image" :alt="title" class="w-full" />
    <div
      class="absolute inset-0 bg-transparent group-hover:bg-green-400 group-active:bg-green-500 transition-colors mix-blend-screen"
    ></div>

    <IconVideo v-if="video" class="absolute bottom-4 right-4" />
  </div>
</template>
