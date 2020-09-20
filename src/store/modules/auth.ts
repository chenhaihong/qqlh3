// Write Stores in Typescript #564
// https://github.com/vuejs/vuex/issues/564

// Anonyfox/vuex-store-module-example
// https://github.com/Anonyfox/vuex-store-module-example

import { Module } from 'vuex'

import { login, logout, getUserinfo } from "@/api/auth";

class LocalAuthToken {
  static key = "tiiit_autn_token";
  static get = (): string => {
    return localStorage.getItem(LocalAuthToken.key) || "";
  };
  static set = (token = ""): void => {
    localStorage.setItem(LocalAuthToken.key, token);
  };
  static clear = (): void => {
    localStorage.removeItem(LocalAuthToken.key);
  };
}

type Userinfo = {}

type State = {
  // 数据来自 /auth/login
  // 鉴权token
  token: string;
  // 数据来自 /auth/userinfo
  // 角色值，如果有值，标识已经拉取了userinfo数据
  roles: number[];
  // 用户信息
  userinfo: Userinfo | undefined;
}

type Mutations = {
  setToken: (state: State, payload: { token: string }) => void;
  setRoles: (state: State, payload: { roles: number[] }) => void;
  setUserinfo: (state: State, payload: { userinfo: Userinfo }) => void;
  clear: (state: State) => void;
}

// type Actions = {
//   login: (store: Store<State>, payload: { username: string, password: string }) => Promise<[Error | null, any]>
//   getUserinfo: (store: Store<State>) => Promise<[Error | null, any]>
//   logout: (store: Store<State>) => Promise<[Error | null, any]>
// }

export default {
  namespaced: true,
  state: () => ({
    token: LocalAuthToken.get(),
    roles: [],
    userinfo: {}
  }),
  // getters: {},
  mutations: {
    setToken(state, { token }) {
      state.token = token;
      LocalAuthToken.set(token);
    },
    setRoles(state, { roles }) {
      state.roles = roles;
    },
    setUserinfo(state, { userinfo }) {
      state.userinfo = userinfo;
    },
    clear(state) {
      state.token = "";
      state.roles = [];
      state.userinfo = {};
      LocalAuthToken.clear();
    }
  } as Mutations,
  actions: {
    async login({ commit }, { username, password }) {
      const [err, data] = await login({ username, password });
      if (!err) {
        commit("setToken", { token: data.token });
      }
      return [err, data];
    },
    async getUserinfo({ commit }) {
      const [err, data] = await getUserinfo();
      if (!err) {
        const { userinfo, roles } = data;
        commit("setRoles", { roles });
        commit("setUserinfo", { userinfo });
      }
      return [err, data];
    },
    async logout({ commit }) {
      const [err, data] = await logout();
      if (!err) commit("clear");
      return [err, data];
    }
  }
} as Module<State, any>;
