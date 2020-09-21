import "@/assets/less/index.less";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import SvgIcon from '@/plugins/SvgIcon'

const app = createApp(App).use(store).use(router)
app.component('SvgIcon', SvgIcon);

app.mount('#app')
