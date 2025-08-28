<script setup>
const route = useRoute();
const { short } = route.params;
const localePath = useLocalePath();

const { data } = await useMyFetch(`/news/short_slug/${short}`);
if (!data.value) {
  navigateTo(localePath("/"));
}

const availableLangs = useAvailableLanguages();
availableLangs.value.map(l => {
  const short_slug = data.value.short_slug;
  if (data.value.translation_slugs[l.value]) {
    l.link = localePath(`/${short_slug}`, l.value);
  }
})

const similar = ref([]);
await useMyFetch(`/news/similar/${data.value.id}`, {
  params: { limit: 10 },
  server: false,
  lazy: true,
  onResponse({ request, response, options }) {
    if (response._data) {
      similar.value = response._data;
    }
  },
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

const replaceUrl = (slug) => {
  const newPath = localePath(slug);
  history.replaceState({}, "", newPath);
};

onMounted(() => {
  replaceUrl(`/news/${data.value.slug}`);
});
</script>

<template>
  <div>
    <UContainer class="mb-10 md:mb-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
        <SectionDetail :data="data" class="lg:col-span-2" />
        <div class="max-lg:hidden">
        <SectionDetailSidebar class="lg:sticky top-[5rem]" />
        </div>
      </div>
    </UContainer>
    <SectionMainCarousel
      v-if="similar?.length > 0"
      :title="$t('related_news')"
      suffix="related"
      :news="similar"
    />
  </div>
</template>
