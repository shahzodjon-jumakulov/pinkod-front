<script setup>
import phone from "@/assets/images/phone.svg";
import mail from "@/assets/images/mail.svg";

const { t } = useI18n();

const socials = computed(() => [
  {
    name: "phone",
    icon: phone,
    title: t("advertisement_phone"),
    username: "+998 88 100 11 55",
    link: "tel:+998 88 100 11 55",
  },
  {
    name: "mail",
    icon: mail,
    title: t("advertisement_mail"),
    username: "Pinkod PR",
    link: "https://t.me/PinkodPR",
  },
]);
</script>

<template>
  <UContainer class="pb-10 md:pb-16 flex flex-col gap-5 lg:!max-w-[50rem]">
    <h1 class="text-[2rem] text-black-main heading">
      {{ $t("advertisement") }}
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
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
    <img src="~/assets/images/reklama.png" alt="reklama banner" />
  </UContainer>
</template>
