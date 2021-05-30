import Vue from 'vue'
import Router from "vue-router"

// 避免路由中点击路径重复
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

import routes from '@/common/config/router'

Vue.use(Router)

export default new Router({
    routes
})