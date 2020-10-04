import { App } from "vue";

import TContainer from "@/components/TContainer.vue";
import TEcharts from "@/components/TEcharts.vue";

export function install(app: App) {
  app.component("TContainer", TContainer);
  app.component("TEcharts", TEcharts);
}
