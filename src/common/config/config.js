export default {
    logo: 'SHOP-ADMIN',
    navBar: {
        active: '0', // 默认为零
        list: [{
                id: 0,
                name: '首页',
                subActive: '0', // 默认都为零
                subMenu: [{
                        id: 0,
                        icon: 'el-icon-s-home',
                        asideName: '后台首页',
                        pathName: 'index'
                    },
                    {
                        id: 1,
                        icon: 'el-icon-picture',
                        asideName: '相册管理',
                        pathName: 'image'
                    },
                    {
                        id: 2,
                        icon: 'el-icon-s-claim',
                        asideName: '商品列表',
                        pathName: 'shop_goods_list'
                    }
                ]
            },
            {
                id: 1,
                name: '商品',
                subActive: '0', // 默认都为零
                subMenu: [{
                    id: 1,
                    icon: 'el-icon-s-claim',
                    asideName: '商品列表',
                    pathName: 'shop_goods_list'
                }]
            },
            {
                id: 2,
                name: '订单'
            },
            {
                id: 3,
                name: '会员'
            },
            {
                id: 4,
                name: '设置'
            },
            {
                id: 5,
                name: '商家'
            },
        ]
    }
}