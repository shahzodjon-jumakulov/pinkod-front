import uz from "~/locales/uz.json";
import ru from "~/locales/ru.json";
import cyril from "~/locales/cyril.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "uz-cyril",
  messages: {
    uz: uz,
    ru: ru,
    "uz-cyril": cyril,
  },
}));
