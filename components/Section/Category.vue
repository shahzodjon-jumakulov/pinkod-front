<script setup>
const props = defineProps({ category: String });
const limit = 18;

const news = ref([]);
const next = ref(null);
const temp = ref({
  results: [],
  next: null,
});
const disabled = ref(false);

const { data, status } = await useMyFetch("/news/all/", {
  params: { categories: props.category, limit },
});
if (status.value === "success") {
  news.value = data.value.results;
  next.value = data.value.next;
}

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
  <div class="flex flex-col gap-5 md:gap-8" v-if="news.length">
    <BaseCategoryTitle :title="news[0].category.name" />
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-y-8">
      <CardCategory
        v-for="(item, index) in news"
        :key="item.id"
        :data="item"
        :class="{
          even: index % 2 === 1,
          'even-tablet': index % 4 === 1 || index % 4 === 2,
        }"
      />
    </div>
    <UButton
      v-if="next"
      @click="load"
      :disabled="disabled"
      :label="$t('load_more')"
      block
    />
  </div>
</template>
