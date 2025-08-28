<script setup>
defineProps({
  name: String,
  icon: String,
  title: String,
  username: String,
  link: String,
});
</script>

<template>
  <NuxtLink
    :to="link"
    target="_blank"
    class="p-5 bg-green-100 hover:bg-green-main active:bg-green-600 flex gap-2 items-center justify-between transition-colors group"
  >
    <div class="flex items-center gap-3">
      <img :src="icon" :alt="name" class="size-12" />
      <div class="flex flex-col justify-between">
        <p
          class="text-black-500 text-sm leading-140 group-hover:text-white-500 transition-colors"
        >
          {{ title }}
        </p>
        <p
          class="text-black-main text-lg leading-140 font-bold group-hover:text-white-main transition-colors"
        >
          {{ username }}
        </p>
      </div>
    </div>
    <div
      class="size-8 border border-black-200 group-hover:border-white-200 group-active:border-white-200 transition-colors flex-center rounded-full shrink-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.51192 4.43057C8.82641 4.161 9.29989 4.19743 9.56946 4.51192L15.5695 11.5119C15.8102 11.7928 15.8102 12.2072 15.5695 12.4881L9.56946 19.4881C9.29989 19.8026 8.82641 19.839 8.51192 19.5695C8.19743 19.2999 8.161 18.8264 8.43057 18.5119L14.0122 12L8.43057 5.48811C8.161 5.17361 8.19743 4.70014 8.51192 4.43057Z"
          class="fill-black-main group-hover:fill-white-main transition-colors"
        />
      </svg>
    </div>
  </NuxtLink>
</template>
