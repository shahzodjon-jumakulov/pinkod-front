<script setup>
const props = defineProps({ news: Array });
</script>

<template>
  <div class="flex flex-col gap-5 md:gap-8" v-if="news.length">
    <BaseCategoryTitle
      :title="news[0].category.name"
      :to="`/category/${news[0].category.slug}`"
    />
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
  </div>
</template>
