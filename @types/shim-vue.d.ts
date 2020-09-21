import 'vue';
import '@vue/runtime-core';

declare module '@vue/runtime-core' {
  import { Router, Route } from 'vue-router'
  import { Store } from 'vuex'
  import { AxiosInstance } from "axios";

  interface ComponentCustomProperties {
    $store: Store<unknown>;

    $router: Router;
    $route: Route;

    // 利用模块补充$axios属性到Vue实例，从而在组件里面直接用
    $axios: AxiosInstance;
  }
}