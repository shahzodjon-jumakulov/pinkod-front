<script setup>
import IconHome from "@/components/Icon/Home.vue";
import IconLenta from "@/components/Icon/Lenta.vue";
import IconVideos from "@/components/Icon/Videos.vue";
import IconLiteracy from "@/components/Icon/Literacy.vue";

const { t } = useI18n();

const navbar = [
  {
    icon: IconHome,
    text: t("navbar.home"),
    id: 1,
    to: "/",
  },
  {
    icon: IconLenta,
    text: t("navbar.lenta"),
    id: 2,
    to: "/news"
  },
  {
    icon: IconVideos,
    text: t("navbar.videos"),
    id: 3,
    to: "/videos",
  },
  {
    icon: IconLiteracy,
    text: "FinLit",
    id: 4,
    to: "/category/finlit",
  },
];

const space = ref(null);
const navbarRef = ref(null);
onMounted(() => {
  space.value.style.height = `${navbarRef.value.clientHeight}px`;
});
</script>

<template>
  <div class="z-[98]">
    <div class="" ref="space"></div>
    <div class="fixed bottom-0 w-full md:hidden" ref="navbarRef">
      <div class="bg-white-main border-t border-black-100">
        <UContainer class="grid grid-cols-4 gap-2">
          <NuxtLinkLocale
            v-for="item in navbar"
            :key="item.id"
            :to="item.to"
            class="py-2 flex flex-col items-center group"
          >
            <div class="px-5 py-1">
              <component :is="item.icon" />
            </div>
            <span
              class="text-black-400 text-[0.625rem] leading-normal text-center max-w-[4.5rem]"
            >
              {{ item.text }}
            </span>
          </NuxtLinkLocale>
        </UContainer>
      </div>
    </div>
  </div>
</template>
