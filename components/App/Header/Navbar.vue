<script setup>
const { locale, t } = useI18n();
const route = useRoute();
const categories = useCategories();

const storeCategories = (newValues) => {
  if (
    categories.value.categories.length === 0 ||
    categories.value.lang !== locale.value
  ) {
    categories.value.categories = newValues;
    categories.value.lang = locale.value;
  }
};

const { data } = await useMyFetch("/categories/list/", {
  onResponse({ response }) {
    storeCategories(response._data.results);
  },
  watch: [locale],
});
if (data.value) storeCategories(data.value.results);

const open = ref(false);
const popover = ref(null);
const navbar = ref(null);
const visibleCategories = ref([]);
const hiddenCategories = ref([]);

const updateCategories = () => {
  const navbarWidth = navbar.value.clientWidth;
  const moreButtonWidth = getElementWidth(t("more"), "nav-item");
  const availableWidth = navbarWidth - moreButtonWidth;
  let usedWidth = 0;

  visibleCategories.value = [];
  hiddenCategories.value = [];

  categories.value.categories.forEach((category) => {
    const categoryWidth = getElementWidth(category.name, "nav-item");

    if (usedWidth + categoryWidth <= availableWidth) {
      visibleCategories.value.push(category);
      usedWidth += categoryWidth;
    } else {
      hiddenCategories.value.push(category);
    }
  });
};
watch(
  () => categories.value.categories,
  () => {
    updateCategories();
  }
);

onMounted(() => {
  updateCategories();
  window.addEventListener("resize", updateCategories);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateCategories);
});

const burgerOpen = ref(false);
const navbarRef = ref(null);
const burgerHeight = ref("0px");
watch(burgerOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = "hidden";
    const bottom = navbarRef.value.getBoundingClientRect().bottom;
    const height = window.innerHeight - bottom;
    burgerHeight.value = `${height}px`;
  } else document.body.style.overflow = "";
});
watch(
  () => route.fullPath,
  () => {
    burgerOpen.value = false;
  }
);

const searchOpen = ref(false);
</script>

<template>
  <div class="bg-white-main relative">
    <div ref="navbarRef" class="shadow-nav relative z-[1]">
      <UContainer class="py-3 flex items-center justify-between gap-6 lg:gap-8">
        <button
          @click="burgerOpen = !burgerOpen"
          :class="{ hidden: searchOpen }"
          class="md:hidden select-none"
        >
          <img src="~/assets/icons/burger.svg" alt="hamburger" />
        </button>

        <div
          :class="{ hidden: searchOpen }"
          class="flex items-center gap-5 md:w-full"
        >
          <NuxtLinkLocale to="/">
            <IconLogo />
          </NuxtLinkLocale>

          <nav
            ref="navbar"
            class="grow max-md:hidden overflow-hidden"
            v-if="!searchOpen"
          >
            <div class="flex justify-start">
              <NuxtLinkLocale
                v-for="item in visibleCategories"
                :key="item.id"
                active-class="text-green-main"
                class="nav-item text-black-main link-hover"
                :to="`/category/${item.slug}`"
              >
                {{ item.name }}
              </NuxtLinkLocale>
              <UPopover
                v-if="hiddenCategories.length"
                v-model:open="open"
                :popper="{ offsetDistance: 4, placement: 'bottom-end' }"
              >
                <button
                  ref="popover"
                  :class="{ '!text-black-main': open }"
                  class="px-3 py-2 text-base font-bold text-black-400 leading-normal hover:text-black-main active:text-black-500 transition-colors"
                >
                  {{ $t("more") }}
                </button>

                <template #panel>
                  <div class="py-2 flex flex-col gap-0.5">
                    <NuxtLinkLocale
                      v-for="item in hiddenCategories"
                      :key="item.id"
                      :to="`/category/${item.slug}`"
                      class="py-2 pl-3 pr-4 text-base leading-tight text-black-500 hover:text-[#1C232B] active:text-black-main transition-colors hover:bg-black-100 active:bg-black-200"
                    >
                      {{ item.name }}
                    </NuxtLinkLocale>
                  </div>
                </template>
              </UPopover>
            </div>
          </nav>
        </div>

        <AppHeaderSearch
          :class="{ grow: searchOpen }"
          @open="searchOpen = true"
          @close="searchOpen = false"
          :open="searchOpen"
        />
      </UContainer>
    </div>

    <AppHeaderBurger
      @close="burgerOpen = false"
      :open="burgerOpen"
      :height="burgerHeight"
      :categories="categories.categories"
    />
  </div>
</template>

<style scoped lang="scss">
.shadow-nav {
  box-shadow: 0px 8px 8px -4px rgba(0, 0, 0, 0.04);
}
</style>

<style>
.nav-item {
  @apply py-2 px-3 text-base leading-normal font-bold transition-colors whitespace-nowrap;
}
</style>
