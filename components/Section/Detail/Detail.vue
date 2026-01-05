<script setup>
defineProps({
  data: Object,
});
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between h-5">
            <div class="flex items-center gap-3">
              <BaseMeta
              :date="data.publish"
              :category="data.category"
              :link="true"
              />
              <div class="flex items-end gap-0.5 text-black-400">
                <UIcon name="i-heroicons-eye" class="size-3.5" />
                <span class="text-xs">{{ data.number_of_views }}</span>
              </div>
            </div>
            <SectionDetailShare :short="data.short_slug" :title="data.title" />
          </div>
          <h1 class="heading text-[1.5rem] md:text-[2rem] text-black-main">
            {{ data.title }}
          </h1>
        </div>
        <div class="heading short space-y-3" v-html="data.short_content"></div>
      </div>

      <div v-if="data.youtube_link">
        <iframe
          :src="getYoutubeLink(data.youtube_link)"
          class="w-full aspect-[16/9]"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>

      <div v-else class="flex flex-col gap-2">
        <img
          class="aspect-[3/2]"
          :src="data.image_large"
          :alt="data.image_name || data.title"
        />
        <div
          v-if="data.image_source"
          class="text-black-400 text-xs md:text-sm leading-normal"
        >
          {{ data.image_source }}
        </div>
      </div>

      <div
        class="content !space-y-5 text-lg text-black-main leading-140"
        v-html="modifyContent(data.content)"
      ></div>
    </div>
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <div class="flex flex-wrap gap-2 md:gap-4">
        <NuxtLinkLocale
          v-for="tag in data.tags"
          :key="tag.key"
          :to="`/search?tags=${encodeURIComponent(tag)}`"
          class="text-base leading-140 text-green-main hover:text-green-500 active:text-green-600 transition-colors"
        >
          #{{ tag }}
        </NuxtLinkLocale>
      </div>
      <SectionDetailShare :short="data.short_slug" :title="data.title" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.short:deep(*) {
  color: rgba(0, 0, 0, 0.7) !important;
}

figcaption,
.content:deep(figcaption),
.credit {
  margin-top: 0.2rem;
  color: var(--black-400, rgba(0, 0, 0, 0.4)) !important;
  font-size: 0.75rem !important;
  font-weight: 400 !important;
  line-height: normal !important;

  @media screen and (min-width: 768px) {
    font-size: 0.875rem !important;
  }
}

.content {
  :deep(img) {
    height: auto !important;
    max-width: 100% !important;
  }

  :deep(figure) {
    width: 100%;
    margin: 0 auto;

    &.table {
      width: 100%;
    }
  }

  :deep(table) {
    border: 1px solid theme("colors.green.main");
    width: 100%;

    td {
      border: 1px solid theme("colors.green.main");
      padding: 0.5rem;
    }
  }

  :deep(a span) {
    color: unset !important;
    background-color: unset !important;
  }
}
</style>
