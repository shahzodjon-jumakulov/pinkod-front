<script setup>
const { locale } = useI18n();
const videos = useVideos();
const latest = useLatest();

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
  <div>
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

    <SectionMainCarousel :news="bazaar" suffix="bazaar" title="bazaar" />

    <SectionDoubleCategory first="iqtisodiyot" class="!pb-0" />

    <SectionDoubleCategory first="soliq" third="worklife" />

    <SectionMainCarousel
      :news="latest.news"
      suffix="popular"
      title="most_read"
    />
  </div>
</template>
