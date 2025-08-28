<script setup>
const switchLocalePath = useSwitchLocalePath();
const { locale } = useI18n();

const availableLangs = useAvailableLanguages();

const languages = [
  {
    name: "O‘z",
    nameFull: "O‘zbekcha",
    value: "uz",
    link: switchLocalePath("uz"),
  },
  {
    name: "Ўз",
    nameFull: "Ўзбекча",
    value: "uz-cyril",
    link: switchLocalePath("uz-cyril"),
  },
  {
    name: "Ру",
    nameFull: "Русский",
    value: "ru",
    link: switchLocalePath("ru"),
  },
];

const route = useRoute();
watch(
  () => route.path,
  () => {
    availableLangs.value = languages;
  },
  { immediate: true }
);

const currentLocale = computed(() =>
  availableLangs.value.find((lang) => lang.value === locale.value)
);

const isOpen = ref(false);
</script>

<template>
  <div class="text-sm leading-[1.375rem] select-none">
    <div class="hidden sm:flex">
      <NuxtLink
        v-for="item in availableLangs"
        :key="item.value"
        :to="item.link"
        class="text-white-400 hover:text-green-main active:text-green-main size-8 flex-center"
        :class="{ '!text-white-main': locale === item.value }"
      >
        {{ item.name }}
      </NuxtLink>
    </div>

    <button
      class="flex items-center gap-1 h-8 sm:hidden"
      @click="isOpen = true"
    >
      <span class="text-white-main">{{ currentLocale?.nameFull }}</span>
      <img src="~/assets/icons/arrow-down.svg" alt="arrow" />
    </button>

    <BaseModal
      :open="isOpen"
      @close="isOpen = false"
      :title="$t('select_locale')"
    >
      <div class="flex flex-col">
        <NuxtLink
          v-for="item in availableLangs"
          :key="item.value"
          :to="item.link"
          class="py-4 flex items-center justify-between gap-2"
        >
          <span>{{ item.nameFull }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              v-if="item.value === locale"
              d="M10.0003 15.0003C12.7617 15.0003 15.0003 12.7617 15.0003 10.0003C15.0003 7.2389 12.7617 5.00033 10.0003 5.00033C7.2389 5.00033 5.00033 7.2389 5.00033 10.0003C5.00033 12.7617 7.2389 15.0003 10.0003 15.0003Z"
              class="fill-green-main"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.0003 1.04199C5.05277 1.04199 1.04199 5.05277 1.04199 10.0003C1.04199 14.9479 5.05277 18.9587 10.0003 18.9587C14.9479 18.9587 18.9587 14.9479 18.9587 10.0003C18.9587 5.05277 14.9479 1.04199 10.0003 1.04199ZM2.29199 10.0003C2.29199 5.74313 5.74313 2.29199 10.0003 2.29199C14.2575 2.29199 17.7087 5.74313 17.7087 10.0003C17.7087 14.2575 14.2575 17.7087 10.0003 17.7087C5.74313 17.7087 2.29199 14.2575 2.29199 10.0003Z"
              :class="
                locale === item.value ? 'fill-green-main' : 'fill-black-400'
              "
            />
          </svg>
        </NuxtLink>
      </div>
    </BaseModal>
  </div>
</template>
