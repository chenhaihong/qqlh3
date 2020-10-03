import "@/assets/less/index.less";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App)
  .use(store)
  .use(router);

function importAll(request: any) {
  request.keys().map((key: string) => {
    const one = request(key);
    if (typeof one === "function" || typeof one["install"] === "function")
      app.use(one);
  });
}

importAll(require.context("./plugins", false, /\.ts$/));
importAll(require.context("./mixins", false, /\.ts$/));
importAll(require.context("./directives", false, /\.ts$/));

app.mount("#app");
