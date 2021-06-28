import Vue from 'vue'
import App from './App.vue'

import {
  Row,
  Col,
  Container,
  Header,
  Aside,
  Main,
  Footer,
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
  Card,
  Table,
  TableColumn,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
  ButtonGroup,
  Select,
  Option,
  Dialog,
  InputNumber,
  MessageBox,
  Upload,
  Tag,
  Pagination,
  Tabs,
  TabPane,
  Image
} from 'element-ui'

import './plugins/element.js'

Vue.use(Row)
  .use(Col)
  .use(Container)
  .use(Header)
  .use(Aside)
  .use(Main)
  .use(Footer)
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
  .use(Table)
  .use(TableColumn)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Button)
  .use(ButtonGroup)
  .use(Select)
  .use(Option)
  .use(Dialog)
  .use(InputNumber)
  .use(Upload)
  .use(Tag)
  .use(Pagination)
  .use(Tabs)
  .use(TabPane)
  .use(Image)
import router from '@/router.js'

import $config from '@/common/config/config.js'

Vue.prototype.$config = $config // 挂载config配置文件

Vue.prototype.$message = Message // 消息提示
Vue.prototype.$confirm = MessageBox.confirm // 弹框
Vue.prototype.$prompt = MessageBox.prompt

Vue.config.productionTip = false // 阻止启动生产消息，常用作指令

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')