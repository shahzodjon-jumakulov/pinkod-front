<script setup>
import Telegram from "~/components/Icon/Telegram.vue";
import Facebook from "~/components/Icon/Facebook.vue";
import Twitter from "~/components/Icon/Twitter.vue";
import Link from "~/components/Icon/Link.vue";
import Copied from "~/components/Icon/Copied.vue";

const { t, locale } = useI18n();
const { text, copy, copied, isSupported } = useClipboard({
  copiedDuring: 3000,
  legacy: true,
});

const props = defineProps({
  short: {
    required: true,
  },
  title: {
    required: true,
    type: String,
  },
});
const base = ref("https://pinkod.uz/");
if (locale.value === "ru") base.value += "ru/";

const url = ref(base.value);
onMounted(() => {
  url.value = window.location.href;
});

const getPostUrl = computed(() => {
  if (props.short) return base.value + props.short;
  else return url.value;
});

const open = ref(false);
const share = (social) => {
  let href;
  if (social === "tg") {
    href = `https://t.me/share/url?url=${encodeURIComponent(
      url.value
    )}&text=${encodeURIComponent(props.title)}`;
  } else if (social === "fb") {
    href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url.value
    )}`;
  } else if (social === "tw") {
    href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url.value
    )}&text=${encodeURIComponent(props.title)}`;
  }
  window.open(href, "_blank");
};

const items = ref([
  {
    label: "Telegram",
    icon: Telegram,
    click: () => {
      share("tg");
      open.value = false;
    },
  },
  {
    label: "Facebook",
    icon: Facebook,
    click: () => {
      share("fb");
      open.value = false;
    },
  },
  {
    label: "Twitter",
    icon: Twitter,
    click: () => {
      share("tw");
      open.value = false;
    },
  },
  {
    label: t("copy_link"),
    icon: Link,
    isCopy: true,
    click: () => copy(getPostUrl.value),
    active: false,
  },
]);

watch(copied, (val) => {
  if (val) {
    items.value[items.value.length - 1].icon = Copied;
    items.value[items.value.length - 1].label = t("copied");
    items.value[items.value.length - 1].active = true;
  } else {
    items.value[items.value.length - 1].icon = Link;
    items.value[items.value.length - 1].label = t("copy_link");
    items.value[items.value.length - 1].active = false;
    open.value = false;
  }
});

const preventClose = ref(false);
const popoverToggler = () => {
  if (!open.value) open.value = true;
  else preventClose.value = true;
};

const onClick = () => {
  if (preventClose.value) {
    open.value = !open.value;
    preventClose.value = false;
  }
};
</script>

<template>
  <UPopover
    v-model:open="open"
    :popper="{ offsetDistance: 4, placement: 'bottom-start' }"
  >
    <template #panel>
      <div class="py-2 flex flex-col gap-0.5 select-none">
        <button
          v-for="(item, index) in items"
          :key="index"
          @click="item.click"
          class="py-2 pl-3 pr-4 flex items-center gap-1 group/item hover:bg-black-100 active:bg-black-200"
        >
          <component :is="item.icon" />
          <span
            :class="{ '!text-green-main': item.active }"
            class="text-base leading-tight text-black-500 group-hover/item:text-black-main group-active/item:text-black-main transition-colors"
            >{{ item.label }}
          </span>
        </button>
      </div>
    </template>

    <button class="flex items-center gap-1 group">
      <span
        :class="{ 'text-green-main': open }"
        class="text-base font-semibold text-black-400 group-hover:text-green-main group-active:text-green-500 transition-colors leading-normal"
      >
        {{ $t("share") }}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M11.6291 4.31861L15.7773 8.0059C16.5527 8.69521 16.9405 9.03987 17.0834 9.44685C17.2089 9.80425 17.2089 10.1937 17.0834 10.5511C16.9405 10.9581 16.5527 11.3028 15.7773 11.9921L11.6291 15.6794C11.2771 15.9922 11.1012 16.1486 10.9517 16.1542C10.8219 16.159 10.6972 16.1031 10.6146 16.0028C10.5195 15.8874 10.5195 15.6519 10.5195 15.1811V12.8561C8.49608 12.8561 6.35894 13.506 4.79843 14.6596C3.98602 15.2602 3.5798 15.5605 3.42508 15.5487C3.27427 15.5371 3.17856 15.4782 3.10031 15.3488C3.02003 15.216 3.09093 14.8011 3.23274 13.9712C4.15355 8.58279 7.86186 7.14185 10.5195 7.14185V4.81688C10.5195 4.34604 10.5195 4.11062 10.6146 3.9952C10.6972 3.89493 10.8219 3.83894 10.9517 3.8438C11.1012 3.84939 11.2771 4.0058 11.6291 4.31861Z"
          :class="{ 'fill-green-main': open }"
          class="fill-black-400 group-hover:fill-green-main group-active:fill-green-500 transition-colors"
        />
      </svg>
    </button>
  </UPopover>
</template>
