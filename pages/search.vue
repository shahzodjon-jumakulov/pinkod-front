<script setup>
const route = useRoute();
const { q, tags } = route.query;
const query = ref(q ? decodeURIComponent(q) : null);
const tagsQuery = ref(tags ? decodeURIComponent(tags) : null);

const limit = 18;
const count = ref(0);
const news = ref([]);
const next = ref(null);
const temp = ref({
  results: [],
  next: null,
});
const disabled = ref(false);

const fetchNews = async () => {
  const { data, status } = await useMyFetch("/news/all/", {
    params: { search: query, tags: tagsQuery, limit },
  });
  if (status.value === "success") {
    news.value = data.value.results;
    next.value = data.value.next;
    count.value = data.value.count;
  }
};

watch(
  () => route.query,
  async (newVal) => {
    tagsQuery.value = newVal.tags ? decodeURIComponent(newVal.tags) : null;
    query.value = newVal.q ? decodeURIComponent(newVal.q) : null;
    await fetchNews();
    await load();
  }
);

await fetchNews();

const load = async () => {
  disabled.value = true;
  if (temp.value.results.length) {
    news.value.push(...temp.value.results);
    next.value = temp.value.next;
    temp.value.results = [];
    temp.value.next = null;
  }
  if (!next.value) return;
  const nextData = await $fetch(next.value);
  temp.value.results = nextData.results;
  temp.value.next = nextData.next;
  disabled.value = false;
};

onMounted(() => {
  load();
});
</script>

<template>
  <UContainer class="mb-10 md:mb-16 flex flex-col gap-5 md:gap-8">
    <BaseCategoryTitle
      v-if="query"
      small
      :title="$t('search_count', { query, count })"
    />
    <BaseCategoryTitle
      v-else-if="tagsQuery"
      small
      :title="$t('tags_count', { tag: tagsQuery, count })"
    />
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
      <div class="flex flex-col gap-4 md:gap-8 lg:col-span-2">
        <div class="flex flex-col gap-4">
          <CardHorizontal v-for="item in news" :key="item.id" :data="item" />
        </div>
        <UButton
          v-if="next"
          @click="load"
          :disabled="disabled"
          :label="$t('load_more')"
          block
        />
      </div>
      <div class="">
        <SectionDetailSidebar class="lg:sticky top-[5rem]" small />
      </div>
    </div>
  </UContainer>
</template>
