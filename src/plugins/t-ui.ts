import { App, defineAsyncComponent } from "vue";

export function install(app: App) {
  app.component(
    "TContainer",
    defineAsyncComponent(() => import("@/components/TContainer.vue"))
  );
}
