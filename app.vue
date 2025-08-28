<script setup>
const { t, locale } = useI18n();
const colorMode = useColorMode();

onMounted(() => {
  colorMode.value = 'light';
  setMomentLocale(locale.value);
});

watch(locale, (newVal) => {
  setMomentLocale(newVal);
});

const getLangCode = computed(() => {
  switch (locale.value) {
    case "uz":
      return "uz-Latn";
    case "uz-cyril":
      return "uz-Cyrl";
    default:
      return locale.value;
  }
});

useHead({
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  htmlAttrs: { lang: getLangCode },
  meta: [{ name: "theme-color", content: "#01566D" }],
});

useSeoMeta({
  title: t("meta.title"),
  description: t("meta.description"),
  ogTitle: t("meta.title"),
  ogDescription: t("meta.description"),
  twitterTitle: t("meta.title"),
  twitterDescription: t("meta.description"),
  twitterCard: "summary_large_image",
  ogImage: "/pinkod.png",
  twitterImage: "/pinkod.png",
  ogUrl: "https://pinkod.uz/",
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
