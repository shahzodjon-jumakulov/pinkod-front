// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "https://cp.pincode.uz",
    },
  },
  modules: ["@nuxt/ui", "@nuxtjs/i18n", "@vueuse/nuxt", "@nuxt/image"],
  image: {
    domains: ["cp.pinkod.uz", "cp.pincode.uz"],
  },
  css: ["~/assets/css/main.scss"],
  i18n: {
    vueI18n: "./i18n.config.ts",
    strategy: "prefix_except_default",
    locales: ["uz", "uz-cyril", "ru"],
    defaultLocale: "uz-cyril",
  },
});
