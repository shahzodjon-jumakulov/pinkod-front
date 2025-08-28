<script setup>
const route = useRoute();
const { tm, t } = useI18n();
// const texts = tm("footer");

const textWithLinks = computed(() => {
  return t("footer[2]", {
    website: `<a href="https://pinkod.uz/" target="_blank" style="white-space: nowrap;">Pinkod.uz</a>`,
    phone: `<a href="tel:+998951660110" target="_blank" style="white-space: nowrap;">+998 95 166 01 10</a>`,
    telegram: `<a href="https://t.me/PinkodPR" target="_blank" style="white-space: nowrap;">Telegram: Pinkod PR</a>`,
    email: `<a href="mailto:info@pinkod.uz" target="_blank" style="white-space: nowrap;">info@pinkod.uz</a>`,
  });
});

const { locale } = useI18n();
const videos = useVideos();
if (videos.value.news.length === 0 || videos.value.lang !== locale.value) {
  const { data: videoNews, status } = await useMyFetch("/news/video/shorts/", {
    params: { limit: 10 },
    transform: (data) => data.results,
  });

  if (status.value === "success") videos.value.news = videoNews.value;
}

const isVisible = ref(false);
const routesWithVideo = ["news-slug", "short", "category-slug"];
const checkRoute = () => {
  for (const item of routesWithVideo) {
    if (route.name?.startsWith(item)) {
      isVisible.value = true;
      return;
    } else isVisible.value = false;
  }
};
checkRoute();
watch(
  () => route.path,
  () => checkRoute()
);
</script>

<template>
  <SectionMainCarousel
    v-if="isVisible"
    :news="videos.news"
    :title="$t('videos')"
    suffix="videos"
    dark
    video
  />
  <div data-nosnippet>
    <footer class="bg-dark-green-main">
      <UContainer class="py-10 md:py-16 flex flex-col gap-8">
        <AppFooterNav />

        <UDivider />

        <div class="flex gap-6 md:gap-8 max-md:flex-col">
          <p
            v-for="(item, index) in $tm('footer').slice(0, 2)"
            :key="index"
            class="text-sm text-white-500 leading-snug"
          >
            {{ $t(`footer[${index}]`) }}
          </p>
          <div
            class="text-sm text-white-500 leading-snug links link-underline"
            v-html="textWithLinks"
          ></div>
        </div>

        <div class="flex items-center justify-between">
          <p class="text-sm text-white-500 leading-snug">
            © {{ new Date().getFullYear() }} Pinkod.uz. <br class="sm:hidden" />
            {{ $t("rights") }}
          </p>
          <img src="~/assets/icons/18+.svg" alt="18+" />
        </div>
      </UContainer>
    </footer>
  </div>
</template>

<style scoped lang="scss"></style>
