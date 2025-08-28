<script setup>
const scrollDirection = ref("down");
const lastScroll = ref(0);

const handleScroll = () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll.value) {
    scrollDirection.value = "down";
  } else {
    scrollDirection.value = "up";
  }

  lastScroll.value = currentScroll;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header class="contents z-[99]">
    <AppHeaderBar />
    <AppHeaderNavbar
      :class="scrollDirection === 'down' ? 'max-md:-top-16' : 'max-md:top-0'"
      class="sticky z-[99] transition-all md:top-0"
    />
  </header>
</template>
