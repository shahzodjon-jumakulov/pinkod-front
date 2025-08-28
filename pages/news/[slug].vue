<script setup>
const localePath = useLocalePath();
const { slug } = useRoute().params;

const { data } = await useMyFetch(`/news/${slug}/`);

const availableLangs = useAvailableLanguages();
availableLangs.value.map(l => {
  const slugs = data.value.translation_slugs;
  if (slugs[l.value]) {
    l.link = localePath(`/news/${slugs[l.value]}`, l.value);
  }
})

const { data: similar } = await useMyFetch(`/news/similar/${data.value.id}`, {
  params: { limit: 10 },
  server: false,
  lazy: true,
});

useSeoMeta({
  title: data.value.title,
  description: htmlToText(data.value.short_content),
  ogTitle: data.value.title,
  ogDescription: htmlToText(data.value.short_content),
  twitterTitle: data.value.title,
  twitterDescription: htmlToText(data.value.short_content),
  twitterCard: "summary_large_image",
  ogImage: data.value.image_large,
  twitterImage: data.value.image_large,
  ogUrl: `https://pinkod.uz/news/${data.value.slug}`,
});
</script>

<template>
  <div>
    <UContainer class="mb-10 md:mb-16" v-if="data">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
        <SectionDetail :data="data" class="lg:col-span-2" />
        <div class="max-lg:hidden">
          <SectionDetailSidebar class="lg:sticky top-[5rem]" />
        </div>
      </div>
    </UContainer>
    <SectionMainCarousel
      v-if="similar && similar.length > 0"
      :title="$t('related_news')"
      suffix="related"
      :news="similar"
    />
  </div>
</template>
