export default {
    logo: 'SHOP-ADMIN',
    navBar: {
        active: '0', // 默认为零
        list: [{
                name: '首页',
                subActive: '0', // 默认都为零
                subMenu: [{
                        icon: 'el-icon-s-home',
                        asideName: '后台首页',
                        pathName: 'index'
                    },
                    {
                        icon: 'el-icon-picture',
                        asideName: '相册管理',
                        pathName: 'image'
                    },
                ]
            },
            {
                name: '商品',
                subActive: '0', // 默认都为零
                subMenu: [{
                    icon: 'el-icon-s-claim',
                    asideName: '商品列表',
                    pathName: 'shop_goods_list'
                }]
            },
            {
                name: '订单'
            },
            {
                name: '会员'
            },
            {
                name: '设置'
            },
            {
                name: '商家'
            },
        ]
    }
}