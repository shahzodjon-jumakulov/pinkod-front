<script setup>
const props = defineProps({
  open: Boolean,
});
const emits = defineEmits(["open", "close"]);

const route = useRoute();
const { q } = route.query;
const search = ref(q ? decodeURIComponent(q) : "");
const searchRef = ref(null);
const error = ref(false);
watch(
  () => props.open,
  (newVal) => {
    if (!newVal) return;
    setTimeout(() => {
      searchRef.value.$refs.input.focus();
    }, 10);
  }
);
watch(search, () => {
  error.value = false;
});

const onBlur = () => {
  emits("close");
};

const localePath = useLocalePath();
const onSubmit = () => {
  const query = search.value.trim();
  if (query.length < 3) {
    error.value = true;
    return;
  }
  navigateTo(localePath(`/search?q=${encodeURIComponent(query)}`));
  emits("close");
};
</script>

<template>
  <button v-if="!open" @click="$emit('open')" type="submit">
    <img src="~/assets/icons/search.svg" alt="search" />
  </button>
  <form v-else class="flex items-center gap-4" @submit.prevent="onSubmit">
    <button type="submit">
      <img src="~/assets/icons/search.svg" alt="search" />
    </button>
    <UInput
      v-if="open"
      ref="searchRef"
      v-model:model-value="search"
      :placeholder="$t('search_placeholder')"
      :class="{ error }"
      class="group grow max-h-10"
      color="primary"
      variant="none"
      @blur="onBlur"
    />
    <button v-if="open" @click="$emit('close')">
      <img src="~/assets/icons/close.svg" alt="close" />
    </button>
  </form>
</template>
