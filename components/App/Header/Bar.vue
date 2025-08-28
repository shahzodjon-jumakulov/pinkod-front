<script setup></script>

<template>
  <div class="bg-dark-green-main py-2">
    <UContainer class="flex justify-between items-center">
      <div class="relative max-h-5 overflow-hidden">
        <AppHeaderCurrencies />
      </div>
      <div class="flex gap-4 items-center">
        <AppHeaderLocales />
        <BaseSocial class="max-sm:hidden" dark />
      </div>
    </UContainer>
  </div>
</template>
