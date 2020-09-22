import { RouteRecordRaw } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    redirect: "/home",
    path: "/",
    name: "/",
    meta: { hidden: true }
  },
  {
    path: "/403",
    name: "Error403",
    meta: { hidden: true, title: "403", },
    component: () => import("@/views/403.vue")
  },
  {
    path: "/404",
    name: "Error404",
    meta: { hidden: true, title: "404" },
    component: () => import("@/views/404.vue")
  },
  {
    path: "/500",
    name: "Error500",
    meta: { hidden: true, title: "500" },
    component: () => import("@/views/500.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: { hidden: true, title: "登录" },
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/DataView",
    name: "DataView",
    meta: { hidden: true, title: "数据面板" },
    component: () => import("@/views/DataView/index.vue")
  },
  {
    path: "/home",
    name: "Home",
    meta: { title: "首页", icon: 'home' },
    component: MainLayout,
    children: [
      {
        path: "",
        name: "HomeIndex",
        meta: { hidden: true, title: "首页", keepAlive: true },
        component: () => import("@/views/DataView/index.vue"),
      }
    ]
  },
  {
    // 使用文档
    path: "/doc",
    name: 'Doc',
    meta: { title: "使用文档", icon: "doc", roles: [2] },
    component: MainLayout,
    children: [
      {
        path: "",
        name: "DocIndex",
        meta: { title: "项目使用指南", roles: [2] },
        component: () => import("@/views/doc/DocIndex.vue")
      },
    ]
  },
  {
    redirect: "/404",
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: { hidden: true, title: "404", },
  },
]
export default routes;