<script setup>
const props = defineProps({
  currency: String,
  price: String,
  change: String,
  dark: Boolean,
});
</script>

<template>
  <div class="flex gap-1">
    <IconCurrency :symbol="currency" :dark="dark" />
    <div class="flex items-center gap-1 text-sm leading-normal">
      <p :class="dark ? 'text-white-main' : 'text-black-main'">
        {{ priceFormatter(price) }} so‘m
      </p>
      <div class="flex items-center">
        <img
          v-if="change < 0"
          src="~/assets/icons/currency/down.svg"
          alt="decrease"
          class="size-4"
        />
        <img
          src="~/assets/icons/currency/up.svg"
          alt="increase"
          class="size-4"
          v-else
        />
        <p :class="change < 0 ? 'text-[#FF8096]' : 'text-[#5EFF9A]'">
          {{ change }}
        </p>
      </div>
    </div>
  </div>
</template>
