<script setup>
const limit = 15;

const news = ref([]);
const next = ref(null);
const temp = ref([]);
const disabled = ref(false);

const { data, status } = await useMyFetch("/news/video/shorts/", {
  params: { limit },
});
if (status.value === "success") {
  news.value = data.value.results;
  next.value = data.value.next;
}

const load = async () => {
  disabled.value = true;
  if (temp.value.length) {
    news.value.push(...temp.value);
    temp.value = [];
  }
  if (!next.value) return;
  const nextData = await $fetch(next.value);
  temp.value = nextData.results;
  next.value = nextData.next;
  disabled.value = false;
};

onMounted(() => {
  load();
});
</script>

<template>
  <UContainer class="pb-10 md:pb-16">
    <div class="flex flex-col gap-5 lg:gap-8">
      <BaseCategoryTitle :title="$t('videos')" />
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5"
      >
        <CardShorts
          v-for="item in news"
          :key="item.id"
          :link="item.link"
          :title="item.title"
        />
      </div>
      <UButton
        v-if="next"
        @click="load"
        :disabled="disabled"
        :label="$t('more')"
        block
      />
    </div>
  </UContainer>
</template>
