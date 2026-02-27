export default defineAppConfig({
  ui: {
    primary: "sky",
    gray: "cool",
    container: {
      base: "mx-auto",
      padding: "sm:px-5 px-5 lg:px-[2rem]",
      constrained: "max-w-[30rem] md:max-w-[48rem] lg:max-w-[80rem]",
    },
    modal: {
      wrapper: "z-[100]",
      container: "items-center",
      padding: "!p-5",
      overlay: { background: "bg-black-500 dark:bg-black-500" },
      background: "bg-white-main",
    },
    divider: {
      border: {
        base: "border-white-300 dark:border-white-300",
      },
    },
    button: {
      base: "transition-colors ring-dark-green-main",
      font: "font-bold",
      rounded: "rounded-none",
      size: {
        sm: "text-base leading-140",
      },
      padding: {
        sm: "px-8 py-4",
      },
      color: {
        primary: {
          solid:
            "shadow-none ring-0 text-dark-green-main bg-dark-green-200 hover:bg-dark-green-300 active:bg-dark-green-400 focus-visible:ring-1 focus-visible:bg-dark-green-300",
        },
      },
    },
    popover: {
      background: "bg-white-main dark:bg-white-main",
      shadow:
        "shadow-[0px_6px_12px_-6px_rgba(24,39,75,0.12),0px_8px_24px_-4px_rgba(24,39,75,0.08)]",
      rounded: "rounded-none",
      ring: "ring-0",
    },
    input: {
      wrapper: "relative caret-green-main",
      rounded: "rounded-none",
      placeholder: "placeholder-gray-400 dark:placeholder-gray-500",
      size: {
        sm: "text-base leading-normal",
      },
      padding: {
        sm: "px-0 py-2.5",
      },
      color: {
        primary: {
          none: "bg-transparent text-black-main focus:ring-0 border-b border-green-main focus:border-green-main group-[.error]:border-red-600",
        },
      },
    },
  },
});
