<script setup>
const currencies = ref([]);

const { data } = await useMyFetch("/pages/arkhiv-kursov-valyut/");
if (data.value) {
  currencies.value = data.value.results;
}

const visibleCurrencies = [...currencies.value, currencies.value[0]];
const currencyRef = ref(null);

const currentIndex = ref(0);

const startAnimation = () => {
  setInterval(() => {
    currentIndex.value++;

    if (currentIndex.value >= currencies.value.length) {
      setTimeout(() => {
        currencyRef.value?.classList.remove("currencies");
        currentIndex.value = 0;
        setTimeout(() => {
          currencyRef.value?.classList.add("currencies");
        }, 10);
      }, 500);
    }
  }, 2000);
};

onMounted(() => {
  startAnimation();
});

const isOpen = ref(false);
const openModal = () => {
  if (window.innerWidth <= 1280) isOpen.value = true;
};
</script>

<template>
  <div class="" v-if=data?.results>
    <div
      ref="currencyRef"
      @click="openModal"
      class="flex max-lg:flex-col md:gap-5 currencies md:!translate-y-0 cursor-pointer"
      :style="`transform: translateY(${-1.25 * currentIndex}rem);`"
    >
      <div
        v-for="item in visibleCurrencies"
        :key="item.id"
        class="last-of-type:md:hidden"
      >
        <AppHeaderCurrency
          :currency="item.code"
          :price="item.rate"
          :change="item.difference"
          dark
        />
      </div>
    </div>

    <BaseModal
      :open="isOpen"
      @close="isOpen = false"
      :title="$t('currency_rates')"
    >
      <div class="flex flex-col gap-4 py-1">
        <div
          v-for="item in currencies"
          :key="item.id"
          class="flex items-center justify-between"
        >
          <span class="text-sm">{{ item.name }}</span>
          <AppHeaderCurrency
            :currency="item.code"
            :price="item.rate"
            :change="item.difference"
          />
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<style scoped lang="scss">
.currencies {
  @media screen and (max-width: 768px) {
    transition: transform 0.5s ease-in-out;
  }
}
</style>
