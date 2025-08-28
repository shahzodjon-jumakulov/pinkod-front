<script setup>
defineProps({
  open: Boolean,
  height: String,
  categories: Array,
});
</script>

<template>
  <Transition name="fade-300">
    <div
      v-if="open"
      class="absolute top-full h-[100svh] w-full md:hidden"
      @click="$emit('close')"
    >
      <div class="bg-black-500 size-full"></div>
    </div>
  </Transition>
  <Transition name="slide-300">
    <div
      v-if="open"
      :style="`height: ${height};`"
      class="absolute top-[calc(100%-1px)] max-w-[22rem] w-full bg-white-main md:hidden overflow-auto"
    >
      <div class="flex flex-col gap-5 pt-3 pb-5 h-full">
        <div class="flex flex-col grow">
          <NuxtLinkLocale
            v-for="item in categories"
            :key="item.id"
            :to="`/category/${item.slug}`"
            active-class="text-green-main bg-black-100"
            class="py-4 px-5 text-base leading-normal font-bold text-black-main link-hover hover:bg-black-100"
          >
            {{ item.name }}
          </NuxtLinkLocale>
        </div>
        <UDivider
          :ui="{ border: { base: 'border-black-300' } }"
          class="w-[calc(100%-2rem)] mx-auto"
        />
        <div class="flex items-center justify-between gap-4 mx-4">
          <div class="flex gap-5 text-sm">
            <NuxtLinkLocale to="/about" class="text-black-main link-hover">
              {{ $t("about_website") }}
            </NuxtLinkLocale>
            <NuxtLinkLocale to="/" class="text-black-main link-hover">
              {{ $t("advertisement") }}
            </NuxtLinkLocale>
          </div>
          <BaseSocial />
        </div>
        <div class="flex items-center justify-between mx-5">
          <p class="text-sm text-black-400 leading-snug">
            © {{ new Date().getFullYear() }} Pinkod.uz.
            <br class="sm:hidden" />
            {{ $t("rights") }}
          </p>
          <img src="~/assets/icons/18black.svg" alt="18+" />
        </div>
      </div>
    </div>
  </Transition>
</template>
