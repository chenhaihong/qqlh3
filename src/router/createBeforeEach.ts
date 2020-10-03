import "nprogress/nprogress.css";
import "./override-nprogress.less";

import NProgress from "nprogress";
import store from "@/store";
import hasIntersect from "@/helpers/hasIntersect";
// import confirmLink from "@/helpers/confirmLink";

import { Router, NavigationGuard } from "vue-router";

/**
 * 路由拦截逻辑
 * 1 未登录,
 *          1.1 通用页面     next()
 *          1.2 其他页面     next(`/login?redirect=${to.path}`), [在登录页执行获取token的操作]
 * 2 已登录
 *          2.1 登录页                 next('/')
 *          2.2 通用页面               next()
 *          [如果未拉取用户信息, 执行此操作]
 *          2.3 任何登录角色可访问的页面  next()
 *          2.4 需角色验证页面
 *                       2.4.1 当前用户角色roles与页面的roles有交集 next()
 *                       2.4.2 没有权限                          next('/403')
 */

const commonPaths: string[] = ["/login", "/404", "/403", "/500"]; // 无需鉴权
const createBeforeEach = (router: Router): NavigationGuard => async (to) => {
  if (router.__fullPathStack__.includes(to.fullPath)) {
    router.__routerType__ = to.meta.keepAlive ? "backward" : "forward";
  } else {
    router.__fullPathStack__.push(to.fullPath);
    router.__routerType__ = "forward";
  }

  // // 提前处理link外链
  // if (to.meta && to.meta.link && !to.meta.link.startsWith("/")) {
  //   return confirmLink(to.meta.link, {
  //     showClose: false,
  //     showCancelButton: false,
  //     closeOnClickModal: false
  //   });
  // }

  NProgress.start();

  const token = store.state.auth.token;
  const routeRoles = to.meta.roles || [];
  if (!token) {
    // 1.1 通用页面
    if (commonPaths.includes(to.path)) return;
    // 1.2 其他页面，则眺望登录
    else {
      return router.replace({
        name: "Login",
        query: {
          redirect: encodeURIComponent(to.path),
        },
      });
    }
  } else {
    // 2.1 登录页
    if (to.path === "/login") return router.replace("/403");
    // 2.2 通用页面
    else if (commonPaths.includes(to.path)) return;
    else {
      // [如果未拉取用户信息, 执行此操作]
      if (!store.state.auth.roles.length) {
        const [err, data] = await store.dispatch("auth/getUserinfo");
        if (err) {
          // 有了token，但是获取用户信息失败，就是token无效了。
          // 直接return false，终止导航。
          // @/helpers/request会错误处理，比如调往 Login、ErrorXXX。
          return false;
        } else {
          store.commit("leftMenu/updateVisibledAddressableRoutes", {
            roles: data.roles,
          });
        }
      }

      // 2.3 任何登录角色可访问的页面
      if (!routeRoles.length) return;
      // 2.4 需角色验证页面
      else {
        // 2.4.1 当前用户角色roles与页面的roles有交集 next()
        const userRoles = store.state.auth.roles;
        if (hasIntersect(userRoles, routeRoles)) return;
        // 2.4.2 没有权限 next('/403')
        else router.replace("/403");
      }
    }
  }
};
export default createBeforeEach;
