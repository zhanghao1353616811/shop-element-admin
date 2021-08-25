import Vue from 'vue'
import App from './App.vue'

import './plugins/element.js' // 引入element-ui组件样式

import router from '@/router.js' // 引入路由

import $config from '@/common/config/config.js' // 引入config配置

import store from '@/store/index.js' // 引入vuex

import VueDND from 'awe-dnd' // 引入拖拽

Vue.use(VueDND)

Vue.prototype.$config = $config // 挂载config配置文件

Vue.config.productionTip = false // 阻止启动生产消息，常用作指令

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')