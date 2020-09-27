import "@/assets/less/index.less";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import SvgIcon from "@/plugins/SvgIcon";
import installTui from "@/plugins/t-ui";
import createHlksDirective from "@/directives/hljs";

const app = createApp(App)
  .use(store)
  .use(router);
app.component("SvgIcon", SvgIcon);
installTui(app);

createHlksDirective(app);

app.mount("#app");
