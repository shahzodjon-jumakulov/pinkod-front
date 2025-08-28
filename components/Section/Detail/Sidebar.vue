<script setup>
const { locale } = useI18n();
const news = ref([]);
const pinned = usePinned();
if (pinned.value.news.length === 0 || pinned.value.lang !== locale.value) {
  await useMyFetch("/news/all/", {
    params: { is_pinned: true, limit: 8 },
    transform: (data) => data.results,
    server: false,
    lazy: true,
    onResponse({ response }) {
      news.value = response._data.results.slice(0, 5);
      pinned.value.news = response._data.results;
      pinned.value.lang = locale.value;
    },
  });
} else {
  news.value = pinned.value.news.slice(0, 5);
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <BaseCategoryTitle :title="$t('important_news')" small />

    <SectionSlider :news="news" />

    <NuxtLink
      :to="locale === 'ru' ? 'https://t.me/pinkoduzru' : 'https://t.me/pinkoduz'"
      target="_blank"
      class="px-5 py-4 flex-center gap-4 bg-[#34AADF] relative group"
    >
      <img src="~/assets/icons/telegram.svg" alt="telegram icon" />
      <span class="text-white-main text-base leading-140 font-bold">
        {{ $t("follow_telegram") }}
      </span>
      <div
        class="absolute inset-0 bg-transparent group-hover:bg-white-200 group-active:bg-white-400 transition-colors"
      ></div>
    </NuxtLink>
  </div>
</template>
