<script setup>
defineProps({
  title: String,
  link: String,
});

const thumbnail = (link) => {
  return `https://i.ytimg.com/vi/${getYoutubeLink(link, true)}/oardefault.jpg`;
};

const shortsUrl = useShorts();
const shortsOpen = useShortsModal();
const handleShorts = (link) => {
  shortsUrl.value = link;
  shortsOpen.value = true;
};
</script>

<template>
  <div class="group cursor-pointer" @click="handleShorts(link)">
    <BaseOverlayImage :image="thumbnail(link)" :title="title" video />
  </div>
</template>
