let routes = [{
        path: '/',
        name: 'layout',
        redirect: {
            name: 'index'
        },
        component: 'layout',
        children: [{
                meta: { title: '后台首页' },
                component: 'index/index'
            },
            {   
                meta: { title: '商品列表' },
                component: 'shop/goods/list'
            }
        ]
    },
    {   
        meta: { title: '登录页' },
        component: 'login/index'
    },

    // "重定向" 的意思是，当用户访问 /a 时，URL 将会被替换成 /b，然后匹配路由为 /b
    // /a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样
    // 别名”的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构

    {
        path: '*',
        redirect: {
            name: 'index'
        },
    }
]

// 获取路由信息方法
let getRoutes = () => { 
        createRoute(routes)
        return routes
 }

// 自动生成路由
let createRoute = (routes) => {
    for (let i = 0; i < routes.length; i++) {
        if (!routes[i].component) return

        // 去除index
        let val = getValue(routes[i].component)
        // 生成name
        routes[i].name = routes[i].name || val.replace(/\//g, '_')
        // 生成path
        routes[i].path = routes[i].path || `/${val}`

        let componentFun = import(`@/views/${routes[i].component}.vue`)
        routes[i].component = () => componentFun
        if (routes[i].children && routes[i].children.length > 0) {
            createRoute(routes[i].children) // 递归
        }

    }
}

// 去除 index
let getValue = (str) => {
    // login/index
    // 最后一个 '/' 的位置
   let index = str.lastIndexOf('/') // 查找 '/' 的位置
   let val = str.substring(index+1, str.length)  
   if(val === 'index') {
      return str.substring(index, -1) // -1 下标往前一个位置寻找元素
   }
   return str
}

export default getRoutes()