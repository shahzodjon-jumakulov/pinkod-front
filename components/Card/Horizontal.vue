<script setup>
defineProps({ data: Object, small: Boolean, large: Boolean });
</script>

<template>
  <NuxtLinkLocale :to="`/news/${data.slug}`" class="flex gap-4 group">
    <div class="flex flex-col gap-1.5 md:gap-2 grow">
      <BaseMeta :date="data.publish" :category="data.category" :small="small" />
      <h1
        :class="small ? 'md:text-base md:!leading-[130%]' : large ? 'md:text-lg' : 'md:text-xl'"
        class="text-sm heading text-black-main link-group-hover line-clamp-3"
      >
        {{ data.title }}
      </h1>
    </div>
    <BaseOverlayImage
      :image="data.image_small"
      title="featured"
      :class="large ? 'md:h-[7.125rem]' : small ? 'md:h-[5.5rem]' : 'md:h-[6.5rem]'"
      class="h-20"
    />
  </NuxtLinkLocale>
</template>
