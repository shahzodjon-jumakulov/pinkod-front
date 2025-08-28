<script setup>
const isOpen = useShortsModal();
const shortsUrl = useShorts();

watch(isOpen, (newVal) => {
  if (newVal) return;
  shortsUrl.value = null;
});

const ui = {
  rounded: "rounded-none",
  shadow: "shadow-none",
};
</script>

<template>
  <div>
    <UModal v-model="isOpen" v-if="shortsUrl" :ui="ui">
      <div class="relative w-full max-h-[calc(100svh-6.5rem)] aspect-[9/16]">
        <iframe
          :src="getYoutubeLink(shortsUrl)"
          class="absolute top-0 left-0 w-full h-full"
          frameborder="0"
          allowfullscreen
        ></iframe>

        <button @click="isOpen = false" class="absolute -top-4 -right-4">
          <div
            class="size-8 flex-center bg-white-main border border-white-200 rounded-full group hover:bg-dark-green-main transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.7128 16.7734C16.0057 17.0663 16.4805 17.0663 16.7734 16.7734C17.0663 16.4805 17.0663 16.0057 16.7734 15.7128L13.0611 12.0005L16.7734 8.28819C17.0663 7.99529 17.0663 7.52042 16.7734 7.22753C16.4805 6.93463 16.0057 6.93463 15.7128 7.22753L12.0005 10.9398L8.28815 7.22748C7.99526 6.93459 7.52038 6.93459 7.22749 7.22748C6.9346 7.52038 6.9346 7.99525 7.22749 8.28814L10.9398 12.0005L7.22748 15.7128C6.93459 16.0057 6.93459 16.4806 7.22748 16.7735C7.52038 17.0664 7.99525 17.0664 8.28814 16.7735L12.0005 13.0611L15.7128 16.7734Z"
                class="fill-dark-green-main group-hover:fill-white-main transition-colors"
              />
            </svg>
          </div>
        </button>
      </div>
    </UModal>
  </div>
</template>
