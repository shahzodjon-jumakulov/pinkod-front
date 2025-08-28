<script setup>
defineProps({
  data: Object,
  dark: Boolean,
  category: Boolean,
  video: Boolean,
});
</script>

<template>
  <NuxtLinkLocale :to="`/news/${data.slug}`" class="flex flex-col group">
    <BaseOverlayImage :image="data.image_medium" :video="video" />
    <div
      class="py-4 max-md:pb-0 flex flex-col gap-2 group-[.even]:lg:bg-green-200 group-[.even]:lg:p-4 group-[.even]:max-md:bg-green-200 group-[.even]:max-md:p-4 group-[.even-tablet]:md:max-lg:bg-green-200 group-[.even-tablet]:md:max-lg:p-4 grow"
    >
      <BaseMeta
        :date="data.publish"
        :category="category && data.category"
        :dark="dark"
      />
      <h1
        :class="
          dark
            ? 'text-white-main link-group-hover-dark'
            : 'text-black-main link-group-hover'
        "
        class="text-lg heading"
      >
        {{ data.title }}
      </h1>
    </div>
  </NuxtLinkLocale>
</template>
