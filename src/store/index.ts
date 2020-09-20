import { createStore } from "vuex";

import auth from "./modules/auth";
import leftMenu from "./modules/leftMenu";

export default createStore({
  state: {} as any,
  mutations: {},
  actions: {},
  modules: {
    auth, 
    leftMenu
  },
});
