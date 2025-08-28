<script setup>
const { slug } = useRoute().params;
</script>

<template>
  <UContainer class="pb-10 md:pb-16">
    <SectionCategory :category="slug" />
  </UContainer>
</template>
