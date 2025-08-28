<script setup>
const footerLinks = [
  {
    title: "about_website",
    to: "/about",
  },
  {
    title: "advertisement",
    to: "/reklama",
  },
];
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-16">
        <IconLogo dark class="h-12 w-auto" />
        <div class="hidden md:flex gap-8">
          <NuxtLinkLocale
            v-for="item in footerLinks"
            :key="item.key"
            class="text-white-main link-hover"
            :to="item.to"
          >
            {{ $t(item.title) }}
          </NuxtLinkLocale>
        </div>
      </div>
      <BaseSocial dark />
    </div>

    <div class="md:hidden flex gap-8">
      <NuxtLinkLocale
        v-for="item in footerLinks"
        :key="item.key"
        class="text-white-main link-hover"
        :to="item.to"
      >
        {{ $t(item.title) }}
      </NuxtLinkLocale>
    </div>
  </div>
</template>
