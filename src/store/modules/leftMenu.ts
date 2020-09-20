// eslint-disable-next-line
const { resolve } = require("path");

import hasIntersect from "@/helpers/hasIntersect";
import routes from "@/router/routes";

import { Module } from 'vuex'
import { RouteRecordRaw } from 'vue-router'

type State = {
  fixed: boolean;
  show: boolean;
  visibledAddressableRoutes: RouteRecordRaw[];
}

class LocalDefaultShow {
  static key = "tiiit_leftmenu_default_show";
  static get = () => {
    const local = localStorage.getItem(LocalDefaultShow.key);
    if (local) return local === "1";
    return window.innerWidth > 960;
  };
  static set = (val = true) => {
    localStorage.setItem(LocalDefaultShow.key, val ? "1" : "0");
  };
}

class LocalDefaultFixed {
  static key = "tiiit_leftmenu_default_fixed";
  static get = () => {
    const local = localStorage.getItem(LocalDefaultFixed.key);
    if (local) return local === "1";
    return window.innerWidth <= 768;
  };
  static set = (val = true) => {
    localStorage.setItem(LocalDefaultFixed.key, val ? "1" : "0");
  };
}


// 获取可见的、当前用户角色可以访问的routes数据
function getVisibledAddressableRoutes(
  tree: Array<RouteRecordRaw> = routes,
  userRoles: number[] = [],
  basePath = ""
) {
  const visibledAddressableRoutes: Array<RouteRecordRaw> = [];
  tree.forEach((raw) => {
    // 1 排除hidden的node
    const meta = raw.meta as any;
    if (meta.hidden) return;
    const { roles: routeRoles = [] } = meta;

    if (
      !routeRoles.length || // 2.1 任意已经登录的角色可以访问
      hasIntersect(userRoles, routeRoles) // 2.2 用户角色与路由可访问的角色有交集
    ) {
      // 构造节点
      const nNode = {} as RouteRecordRaw;
      // eslint-disable-next-line
      const { children, component, ...reset } = raw;
      nNode.path = resolve(basePath, reset.path);

      if (children && children.length) {
        nNode.children = getVisibledAddressableRoutes(
          children,
          userRoles,
          reset.path
        );
      }
      visibledAddressableRoutes.push({ ...nNode });
    }
  });
  return visibledAddressableRoutes;
}

export default {
  namespaced: true,
  state: () => {
    const fixed = LocalDefaultFixed.get();
    const show = LocalDefaultShow.get();
    return {
      fixed,
      show,
      visibledAddressableRoutes: [] // 可见的、当前用户角色可以访问的routes数据
    };
  },
  mutations: {
    updateVisibledAddressableRoutes(state, { roles }) {
      const _routes = getVisibledAddressableRoutes(routes, roles);
      state.visibledAddressableRoutes = Object.freeze(_routes);
    },
    toggleShow(state) {
      state.show = !state.show;
      LocalDefaultShow.set(state.show);
    },
    toggleFixed(state) {
      state.fixed = !state.fixed;
      LocalDefaultFixed.set(state.fixed);
    }
  }
} as Module<any, any>;


