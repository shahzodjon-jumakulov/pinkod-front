<script setup>
const props = defineProps({ first: String, second: String, third: String });
const limit = 6;

const firstNews = ref([]);
const secondNews = ref([]);
const thirdNews = ref([]);

await useMyFetch("/news/all/", {
  params: { categories: props.first, limit },
  server: false,
  lazy: true,
  onResponse({ response }) {
    firstNews.value = response._data.results;
  },
});

if (props.second) {
  await useMyFetch("/news/all/", {
    params: { categories: props.second, limit },
    server: false,
    lazy: true,
    onResponse({ response }) {
      secondNews.value = response._data.results;
    },
  });
}

if (props.third) {
  await useMyFetch("/news/all/", {
    params: { categories: props.third, limit: 10 },
    server: false,
    lazy: true,
    onResponse({ response }) {
      thirdNews.value = response._data.results;
    },
  });
}
</script>

<template>
  <UContainer
    v-if="firstNews.length || secondNews.length"
    class="py-10 md:py-16 grid gap-10 md:gap-16"
  >
    <SectionMainCategory :news="firstNews" />
    <SectionMainCategory :news="secondNews" />
    <div v-if="thirdNews.length" class="flex flex-col gap-5 md:gap-8">
      <BaseCategoryTitle
        :title="thirdNews[0].category.name"
        :to="`/category/${thirdNews[0].category.slug}`"
      />
      <div class="grid lg:grid-cols-2 gap-y-4 gap-x-10" v-if="thirdNews.length">
        <div
          class="flex flex-col gap-4 max-lg:[&:nth-child(n+6)]:hidden"
          v-for="(item, index) in thirdNews"
          :key="item.id"
        >
          <hr
            v-if="index !== 0"
            :class="{ 'lg:hidden': index === 1 }"
            class="border-t border-dark-green-300 dark:border-dark-green-300"
          />
          <CardHorizontal :data="item" />
        </div>
      </div>
      <UButton :label="$t('more_news')" block :to="`/category/${third}`" />
    </div>
  </UContainer>
</template>
