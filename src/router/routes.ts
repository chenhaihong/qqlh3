import { defineAsyncComponent } from "vue";
import { RouteRecordRaw } from "vue-router";

import MainLayout from "@/layouts/MainLayout.vue";
const EmptyComponent = {
  render() {
    return null;
  },
};

const routes: Array<RouteRecordRaw> = [
  {
    redirect: "/home",
    path: "/",
    name: "/",
    meta: { hidden: true },
  },
  {
    path: "/403",
    name: "Error403",
    meta: { hidden: true, title: "403" },
    component: defineAsyncComponent(() => import("@/views/403.vue")),
  },
  {
    path: "/404",
    name: "Error404",
    meta: { hidden: true, title: "404" },
    component: defineAsyncComponent(() => import("@/views/404.vue")),
  },
  {
    path: "/500",
    name: "Error500",
    meta: { hidden: true, title: "500" },
    component: defineAsyncComponent(() => import("@/views/500.vue")),
  },
  {
    path: "/login",
    name: "Login",
    meta: { hidden: true, title: "登录" },
    component: defineAsyncComponent(() => import("@/views/Login.vue")),
  },
  {
    path: "/DataView",
    name: "DataView",
    meta: { hidden: true, title: "数据面板" },
    component: defineAsyncComponent(() => import("@/views/DataView/index.vue")),
  },
  {
    // 首页
    path: "/home",
    name: "Home",
    meta: { title: "首页", icon: "home" },
    component: MainLayout,
    children: [
      {
        path: "/home",
        name: "HomeIndex",
        meta: { hidden: true, title: "首页", keepAlive: true },
        component: defineAsyncComponent(() =>
          import("@/views/DataView/index.vue")
        ),
      },
    ],
  },
  {
    path: "/Github",
    name: "GithubHaihong",
    meta: {
      hidden: false,
      icon: "github",
      link: "https://github.com/chenhaihong/qqlh3",
      title: "Github代码",
    },
    component: EmptyComponent,
  },
  {
    // 使用文档
    path: "/doc",
    name: "Doc",
    meta: { title: "使用文档", icon: "doc", roles: [2] },
    component: MainLayout,
    children: [
      {
        path: "/doc",
        name: "DocIndex",
        meta: { title: "项目使用指南", roles: [2] },
        component: defineAsyncComponent(() =>
          import("@/views/doc/DocIndex.vue")
        ),
      },
      {
        path: "/doc/types",
        name: "DocDypes",
        meta: { title: "声明文件", roles: [2] },
        component: defineAsyncComponent(() =>
          import("@/views/doc/DocTypes.vue")
        ),
      },
      {
        path: "/doc/style",
        name: "DocSetting",
        meta: { title: "项目配置", roles: [2] },
        component: defineAsyncComponent(() =>
          import("@/views/doc/DocSetting.vue")
        ),
      },
      {
        path: "/doc/route",
        name: "DocRoute",
        meta: { title: "路由配置", roles: [2] },
        component: defineAsyncComponent(() =>
          import("@/views/doc/DocRoute.vue")
        ),
      },
      {
        path: "/doc/common-paths",
        name: "DocCommonPaths",
        meta: { title: "白名单页面", roles: [2] },
        component: defineAsyncComponent(() =>
          import("@/views/doc/DocCommonPaths.vue")
        ),
      },
      {
        path: "/doc/permission",
        name: "DocPermission",
        meta: { title: "菜单权限", roles: [2] },
        component: defineAsyncComponent(() =>
          import("@/views/doc/DocPermission.vue")
        ),
      },
      {
        path: "/doc/auth",
        name: "DocAuth",
        meta: { title: "鉴权逻辑", roles: [2] },
        component: defineAsyncComponent(() =>
          import("@/views/doc/DocAuth.vue")
        ),
      },
      {
        path: "/doc/svg",
        name: "DocSvg",
        meta: { title: "Svg图标", roles: [2] },
        component: defineAsyncComponent(() => import("@/views/doc/DocSvg.vue")),
      },
      {
        path: "/doc/service",
        name: "DocService",
        meta: { title: "数据请求", roles: [2] },
        component: defineAsyncComponent(() =>
          import("@/views/doc/DocService.vue")
        ),
      },
      {
        path: "/doc/mock",
        name: "DocMock",
        meta: { title: "数据模拟", roles: [2] },
        component: defineAsyncComponent(() =>
          import("@/views/doc/DocMock.vue")
        ),
      },
      {
        path: "/doc/lodash-template",
        name: "DocLodashTemplate",
        meta: { title: "Lodash模板", roles: [2] },
        component: defineAsyncComponent(() =>
          import("@/views/doc/DocLodashTemplate.vue")
        ),
      },
      {
        path: "/doc/element-ui",
        name: "DocElement",
        meta: { title: "饿了么UI", roles: [2] },
        component: defineAsyncComponent(() =>
          import("@/views/doc/DocElement.vue")
        ),
      },
    ],
  },
  {
    redirect: "/404",
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: { hidden: true, title: "404" },
  },
];
export default routes;
