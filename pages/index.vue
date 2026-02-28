<script setup>
const { locale } = useI18n();
const videos = useVideos();
const popular = usePopular();
if (popular.value.news.length < 8 || popular.value.lang !== locale.value) {
  const { data } = await useMyFetch("/news/popular/", {
    params: { limit: 8 },
    transform: (data) => data.results,
  });
  popular.value.news = data.value;
  popular.value.lang = locale.value;
}

if (videos.value.news.length === 0 || videos.value.lang !== locale.value) {
  const { data: videoNews, status } = await useMyFetch("/news/video/shorts/", {
    params: { limit: 10 },
    transform: (data) => data.results,
  });

  if (status.value === "success") videos.value.news = videoNews.value;
}

const bazaar = ref([]);
await useMyFetch("/news/all/", {
  params: { categories: "bozor", limit: 10 },
  server: false,
  lazy: true,
  onResponse({ response }) {
    bazaar.value = response._data.results;
  },
});
</script>

<template>
  <div class="mb-5">
    <SectionMainHero />

    <SectionMainCarousel
      :news="videos.news"
      suffix="video"
      title="videos"
      to="/videos"
      dark
      video
    />

    <SectionDoubleCategory first="finlit" second="bank" />

    <SectionMainCarousel
      :news="bazaar"
      suffix="bazaar"
      title="bazaar"
      :to="locale === 'ru' ? '/category/rnok' : '/category/bozor'"
    />

    <SectionDoubleCategory first="iqtisodiyot" class="!pb-0" />

    <SectionDoubleCategory first="soliq" third="worklife" />

    <SectionMainCarousel
      :news="popular.news"
      suffix="popular"
      title="most_read"
    />
  </div>
</template>
