import 'vue-router';

declare module 'vue-router' {
  export interface Router {
    __fullPathStack__: Array<string>;
    __routerType__: string;
  }
}
