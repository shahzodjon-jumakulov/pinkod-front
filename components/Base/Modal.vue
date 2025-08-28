<script setup>
const props = defineProps({
  open: Boolean,
  title: String,
});
const emit = defineEmits(["close"]);
const isOpen = ref(props.open);

watch(
  () => props.open,
  (newVal) => {
    if (newVal) isOpen.value = true;
  }
);

watch(isOpen, (newVal) => {
  if (!newVal) emit("close");
});
</script>

<template>
  <UModal v-model="isOpen">
    <div class="px-5 py-4 flex flex-col gap-4">
      <h1 class="text-black-main text-center font-bold text-xl leading-normal">
        {{ title }}
      </h1>
      <slot />
    </div>
  </UModal>
</template>
