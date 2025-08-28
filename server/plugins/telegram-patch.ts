export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:response", (response) => {
    if (response.headers?.["content-type"] === "text/html;charset=utf-8") {
      response.headers["content-type"] = "text/html; charset=utf-8";
    }
  });
});
