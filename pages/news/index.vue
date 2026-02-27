<script setup>
const props = defineProps({ category: String });
const limit = 18;

const news = ref([]);
const next = ref(null);
const temp = ref([]);
const disabled = ref(false);

const { data, status } = await useMyFetch("/news/all/", {
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
    <div class="flex flex-col gap-5 md:gap-8">
      <div
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-y-8 max-md:hidden"
      >
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
      <div class="flex flex-col gap-5 md:hidden">
        <CardHorizontal v-for="item in news" :key="item.id" :data="item" />
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
