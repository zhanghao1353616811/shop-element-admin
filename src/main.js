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
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  Backtop,
  Card
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
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(Backtop)
  .use(Card)
import router from '@/router.js'

import $config from '@/common/config/config.js'

Vue.prototype.$config = $config // 挂载config配置文件

Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')