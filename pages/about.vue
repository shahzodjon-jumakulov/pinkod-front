<script setup>
import telegram from "@/assets/icons/footer/telegram.png";
import youtube from "@/assets/icons/footer/youtube.png";
import facebook from "@/assets/icons/footer/facebook.png";
import instagram from "@/assets/icons/footer/instagram.png";

const socials = [
  {
    name: "telegram",
    icon: telegram,
    title: "Telegram",
    username: "@pinkoduz",
    link: "https://t.me/pinkoduz",
  },
  {
    name: "youtube",
    icon: youtube,
    title: "YouTube",
    username: "@pinkoduz",
    link: "https://www.youtube.com/@pinkoduz",
  },
  {
    name: "facebook",
    icon: facebook,
    title: "Facebook",
    username: "@pinkoduz",
    link: "https://www.facebook.com/pinkoduz",
  },
  {
    name: "instagram",
    icon: instagram,
    title: "Instagram",
    username: "@pinkoduz",
    link: "https://www.instagram.com/pinkoduz/",
  },
];
</script>

<template>
  <div>
    <div class="pb-10 md:pb-16 -mt-5 md:-mt-8 flex flex-col gap-10 md:gap-8">
      <div
        class="flex-center h-full relative min-h-[37.5rem] md:min-h-[25rem] lg:min-h-[37.5rem] overflow-hidden"
      >
        <UContainer class="flex flex-col gap-8 lg:!max-w-[50rem] py-5">
          <img class="h-[4.5rem] md:h-[5rem] lg:h-[7.5rem]" src="~/assets/icons/logo.svg" alt="logo" />
          <h1 class="text-xl uppercase text-white-main heading text-center">
            {{ $t("about_title") }}
          </h1>
        </UContainer>

        <div
          class="absolute top-1/2 -translate-y-1/2 -z-[1] h-full w-full select-none"
        >
          <video
            src="~/assets/pinkod.mp4"
            autoplay
            muted
            loop
            class="h-full w-full object-cover"
          ></video>
        </div>
        <div
          class="absolute inset-0 bg-dark-green-main mix-blend-color -z-[1]"
        ></div>
      </div>
      <UContainer class="lg:!max-w-[50rem] flex flex-col gap-5">
        <div
          class="text-black-main leading-140 text-base md:text-lg link-underline"
          v-html="$t('about_content')"
        ></div>
        <img src="~/assets/images/about_content.png" alt="about content" />
      </UContainer>
    </div>
    <div class="bg-dark-green-100">
      <UContainer class="py-10 md:py-16 flex flex-col gap-5 md:gap-8">
        <BaseCategoryTitle :title="$t('soc_media_pages')" />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <CardSocialMedia
            v-for="social in socials"
            :key="social.name"
            :icon="social.icon"
            :name="social.name"
            :title="social.title"
            :username="social.username"
            :to="social.link"
          />
        </div>
      </UContainer>
    </div>
  </div>
</template>
