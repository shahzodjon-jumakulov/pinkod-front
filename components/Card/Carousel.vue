<script setup>
defineProps({
  data: Object,
  image: String,
  green: Boolean,
});
</script>

<template>
  <NuxtLinkLocale
    :to="`/news/${data.slug}`"
    class="flex flex-col group w-[18rem]"
  >
    <div
      :class="green ? 'bg-green-200' : 'bg-white-main'"
      class="p-4 flex flex-col gap-3 min-h-[8.3125rem]"
    >
      <div class="grow">
        <h1
          class="text-black-main link-group-hover text-lg heading line-clamp-3"
        >
          {{ data.title }}
        </h1>
      </div>
      <BaseMeta :date="data.publish" :category="data.category" />
    </div>
    <BaseOverlayImage :image="image" />
  </NuxtLinkLocale>
</template>
