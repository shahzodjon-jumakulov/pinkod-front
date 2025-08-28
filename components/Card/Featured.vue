<script setup>
defineProps({ data: Object });
</script>

<template>
  <NuxtLinkLocale :to="`/news/${data.slug}`" class="group flex flex-col">
    <div class="p-4 flex flex-col gap-2 bg-green-200 grow">
      <BaseMeta :date="data.publish" :category="data.category" />
      <h1 class="text-xl md:text-2xl heading text-black-main link-group-hover">
        {{ data.title }}
      </h1>
      <div
        class="text-black-500 text-sm leading-140"
        v-html="data.short_content"
      ></div>
    </div>
    <BaseOverlayImage :image="data.image_large" title="featured" />
  </NuxtLinkLocale>
</template>
