export default (localeValue) => {
  const { $moment } = useNuxtApp();

  switch (localeValue) {
    case "uz":
      $moment.locale("uz-latn");
      break;
    case "uz-cyril":
      $moment.locale("uz");
      break;
    default:
      $moment.locale(localeValue);
  }
};
