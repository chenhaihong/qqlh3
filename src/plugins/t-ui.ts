import { App, defineAsyncComponent } from "vue";

export default function installTui(app: App) {
  app.component("TContainer", defineAsyncComponent(() => import("@/components/TContainer.vue")));
}
