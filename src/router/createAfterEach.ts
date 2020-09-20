import NProgress from "nprogress";

import setting from "@/setting";

import { Router, NavigationHookAfter } from 'vue-router'

const createAfterEach = (router: Router): NavigationHookAfter => (to, from, failure) => {
  NProgress.done();
  const { title = "" } = to.meta;
  document.title = title ? `${title} - ${setting.name}` : setting.name;

  // if (!failure) sendToAnalytics(to.fullPath)
}

export default createAfterEach;
