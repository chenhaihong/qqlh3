import "@/assets/less/index.less";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App)
  .use(store)
  .use(router);

{
  const plugins = require.context("./plugins", false, /\.ts$/);
  plugins.keys().map((filename) => {
    const plugin = plugins(filename);
    if (typeof plugin === "function" || plugin["install"]) app.use(plugin);
  });
}

{
  const mixins = require.context("./mixins", false, /\.ts$/);
  mixins.keys().map((filename) => {
    const mixin = mixins(filename);
    if (typeof mixin === "function" || mixin["install"]) app.use(mixin);
  });
}

{
  const directives = require.context("./directives", false, /\.ts$/);
  directives.keys().map((filename) => {
    const directive = directives(filename);
    if (typeof directive === "function" || directive["install"])
      app.use(directive);
  });
}

app.mount("#app");
