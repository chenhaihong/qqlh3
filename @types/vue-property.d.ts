import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import { Store } from 'vuex'
import { AxiosInstance } from "axios";

declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $store: Store<any>;

    // 利用模块补充$axios属性到Vue实例，从而在组件里面直接用
    $axios: AxiosInstance;
  }
}
