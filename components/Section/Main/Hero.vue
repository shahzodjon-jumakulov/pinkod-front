<script setup>
const localePath = useLocalePath();
const { locale } = useI18n();
const pinned = usePinned();
const popular = usePopular();
const latest = useLatest();

if (pinned.value.news.length === 0 || pinned.value.lang !== locale.value) {
  const { data } = await useMyFetch("/news/all/", {
    params: { is_pinned: true, limit: 8 },
    transform: (data) => data.results,
  });
  pinned.value.news = data.value;
  pinned.value.lang = locale.value;
}

if (popular.value.news.length === 0 || popular.value.lang !== locale.value) {
  const { data } = await useMyFetch("/news/popular/", {
    params: { limit: 2 },
    transform: (data) => data.results,
  });
  popular.value.news = data.value;
  popular.value.lang = locale.value;
}

if (latest.value.news.length === 0 || latest.value.lang !== locale.value) {
  const { data } = await useMyFetch("/news/all/", {
    params: { limit: 6 },
    transform: (data) => data.results,
  });
  latest.value.news = data.value;
  latest.value.lang = locale.value;
}
</script>

<template>
  <UContainer class="pb-10 md:pb-16" v-if="pinned.news.length">
    <div class="grid grid-cols-12 gap-5">
      <div
        class="md:col-span-5 lg:col-span-3 flex flex-col gap-5 max-md:hidden"
      >
        <BaseCategoryTitle :title="$t('popular_news')" small />
        <div class="flex flex-col gap-4">
          <CardCarousel
            v-for="item in popular.news.slice(0, 2)"
            :key="item.id"
            :data="item"
            :image="item.image_small"
            green
          />
        </div>
      </div>
      <div
        class="col-span-full md:col-span-7 lg:col-span-5 flex flex-col gap-5"
      >
        <SectionSlider :news="pinned.news.slice(0, 5)" large />
        <div class="flex flex-col gap-4" v-if="pinned.news.length > 5">
          <div
            v-for="(item, index) in pinned.news.slice(5)"
            :key="item.id"
            class="flex flex-col gap-4"
          >
            <hr class="lg:hidden" v-if="index !== 0" />
            <CardHorizontal :data="item" large />
          </div>
        </div>
      </div>
      <div class="col-span-full lg:col-span-4 flex flex-col gap-5">
        <BaseCategoryTitle :title="$t('latest_news')" small />
        <div class="flex flex-col gap-1">
          <div class="relative flex flex-col gap-4 group/gradient grow">
            <div
              class="flex flex-col gap-4"
              v-for="(item, index) in latest.news.slice(0, 6)"
              :key="item.id"
            >
              <hr class="md:hidden" v-if="index !== 0" />
              <CardHorizontal :data="item" small />
            </div>

            <div
              v-if="latest.news.length > 1"
              class="absolute -bottom-0.5 w-full h-[11rem] gradient pointer-events-none group-hover/gradient:opacity-0 transition-opacity duration-300 ease-in-out"
            ></div>
          </div>
          <UButton :to="localePath('/news')" :label="$t('more_news')" block />
        </div>
      </div>
    </div>
  </UContainer>
</template>

<style scoped lang="scss">
.gradient {
  background: linear-gradient(0deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
}
</style>
