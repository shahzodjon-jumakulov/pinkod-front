<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const props = defineProps({
  dark: Boolean,
  suffix: String,
  title: String,
  news: Array,
  to: String,
  video: Boolean,
});

const navigationElements = {
  nextEl: `.slider-button-next-${props.suffix}`,
  prevEl: `.slider-button-prev-${props.suffix}`,
};

const options = {
  modules: [Navigation, Pagination],
  slidesPerView: "auto",
  spaceBetween: 20,
  slidesOffsetBefore: 20,
  slidesOffsetAfter: 20,
  resistanceRatio: 0.5,
  navigation: navigationElements,
  pagination: {
    el: `.pagination-${props.suffix}`,
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      slidesPerView: "auto",
    },
    1280: {
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      slidesPerView: props.video ? 5 : 4,
    },
  },
};

const thumbnail = (link) => {
  return `https://i.ytimg.com/vi/${getYoutubeLink(link, true)}/oardefault.jpg`;
};

const shortsUrl = useShorts();
const shortsOpen = useShortsModal();
const handleShorts = (link) => {
  shortsUrl.value = link;
  shortsOpen.value = true;
};
</script>

<template>
  <div
    v-if="news?.length"
    :class="dark ? 'bg-dark-green-main' : 'bg-dark-green-100'"
  >
    <UContainer class="py-10 md:py-16 flex flex-col gap-5 md:gap-8">
      <BaseCategoryTitle :to="to" :title="$t(title)" :dark="dark">
        <div class="flex gap-2 max-md:hidden">
          <BaseCarouselButton
            :dark="dark"
            :class="`rotate-180 slider-button-prev-${suffix}`"
          />
          <BaseCarouselButton
            :dark="dark"
            :class="`slider-button-next-${suffix}`"
          />
        </div>
      </BaseCategoryTitle>
      <div class="max-md:-mx-5">
        <swiper v-bind="options" class="w-full select-none">
          <swiper-slide
            v-for="slide in news"
            :key="slide.id"
            :class="
              video
                ? 'max-w-[8.77rem] md:max-w-[11.25rem] lg:max-w-[14.19rem] group cursor-pointer'
                : '!w-[18rem]'
            "
          >
            <CardShorts v-if="video" :link="slide.link" :title="slide.title" />
            <CardCarousel v-else :data="slide" :image="slide.image_medium || slide.image_small" />
          </swiper-slide>
        </swiper>
      </div>
      <div
        :class="`pagination-${suffix} ${dark ? 'dark' : ''}`"
        class="flex-center pagination"
      ></div>
    </UContainer>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  --swiper-pagination-color: #019eae;
  --swiper-pagination-bullet-inactive-color: #019eae;
  --swiper-pagination-bullet-inactive-opacity: 0.4;
  --swiper-pagination-bullet-opacity: 1;
  --swiper-pagination-bullet-horizontal-gap: 0.25rem;
  --swiper-pagination-bullet-height: 0.5rem;
  --swiper-pagination-bullet-width: 0.5rem;
  --swiper-pagination-bullet-border-radius: 6.25rem;

  &.dark {
    --swiper-pagination-color: #ffffff;
    --swiper-pagination-bullet-inactive-color: #ffffff;
  }

  &:deep(.swiper-pagination-bullet) {
    transition: all 0.3s ease-in-out;
  }

  &:deep(.swiper-pagination-bullet-active) {
    width: 2rem;
  }
}
</style>
