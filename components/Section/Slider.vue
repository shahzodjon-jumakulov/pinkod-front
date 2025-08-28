<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const options = {
  modules: [Pagination, Autoplay],
  slidesPerView: 1,
  loop: true,
  pagination: {
    el: `.pagination-sidebar`,
    clickable: true,
  },
  autoplay: {
    delay: 5000,
    pauseOnMouseEnter: true,
  },
};

defineProps({
  news: Array,
  large: Boolean,
});
</script>

<template>
  <swiper
    v-if="news.length"
    v-bind="options"
    class="w-full select-none relative aspect-[3/2]"
  >
    <swiper-slide
      v-for="slide in news"
      :key="slide.id"
      class="aspect-[3/2]'"
    >
      <NuxtLinkLocale :to="`/news/${slide.slug}`" class="relative group">
        <div class="size-full relative">
          <img
            :src="slide.image_large"
            :alt="slide.source || slide.title"
            class="object-cover size-full"
          />
          <div
            class="absolute left-0 bottom-0 h-3/4 w-full overlay transition-colors opacity-70"
          ></div>
          <div
            class="absolute inset-5 bottom-[2.375rem] flex flex-col justify-end gap-2"
          >
            <BaseMeta :date="slide.publish" :category="slide.category" white />
            <h1
              :class="{ 'md:text-2xl': large }"
              class="heading text-white-main text-lg line-clamp-3"
            >
              {{ slide.title }}
            </h1>
          </div>
        </div>
      </NuxtLinkLocale>
    </swiper-slide>
    <div class="absolute w-full px-5 bottom-5 z-[1] h-2 flex items-center">
      <div class="flex-center pagination pagination-sidebar"></div>
    </div>
  </swiper>
  <USkeleton v-else class="aspect-[3/2]" />
</template>

<style scoped lang="scss">
.pagination {
  --swiper-pagination-color: #ffffff;
  --swiper-pagination-bullet-inactive-color: #ffffff;
  --swiper-pagination-bullet-inactive-opacity: 0.4;
  --swiper-pagination-bullet-opacity: 1;
  --swiper-pagination-bullet-horizontal-gap: 0.25rem;
  --swiper-pagination-bullet-height: 0.125rem;
  --swiper-pagination-bullet-width: 100%;
  --swiper-pagination-bullet-border-radius: 3.125rem;

  &:deep(.swiper-pagination-bullet) {
    transition: all 0.3s ease-in-out;
  }
  &:deep(.swiper-pagination-bullet:hover) {
    height: 0.5rem;
  }
}

.overlay {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 7%,
    rgba(0, 0, 0, 0.08) 12%,
    rgba(0, 0, 0, 0.16) 17%,
    rgba(0, 0, 0, 0.22) 21%,
    rgba(0, 0, 0, 0.32) 26%,
    rgba(0, 0, 0, 0.42) 32%,
    rgba(0, 0, 0, 0.52) 38%,
    rgba(0, 0, 0, 0.62) 47%,
    rgba(0, 0, 0, 0.72) 57%,
    rgba(0, 0, 0, 0.82) 65%
  );
}
</style>
