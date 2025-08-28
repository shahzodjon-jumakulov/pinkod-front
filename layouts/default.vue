<script setup></script>

<template>
  <div class="flex flex-col min-h-[100svh]">
    <AppHeader />
    <main class="mb-auto mt-5 md:mt-8">
      <slot />
    </main>
    <AppFooter />
    <AppFooterNavigation />

    <BaseYtubeShorts />
  </div>
</template>
