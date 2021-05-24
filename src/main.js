import Vue from 'vue'
import App from './App.vue'

import {
  Row,
  Col,
  Container,
  Header,
  Aside,
  Main,
  Form,
  FormItem,
  Input,
  Message,
  Menu,
  MenuItem,
  Submenu,
  Avatar
} from 'element-ui'

import './plugins/element.js'

Vue.use(Row)
  .use(Col)
  .use(Container)
  .use(Header)
  .use(Aside)
  .use(Main)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Menu)
  .use(MenuItem)
  .use(Submenu)
  .use(Avatar)

import router from './router.js'

Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')