export default {
    state: {
        name: "", // 活动名称
        category: [], // 商品分类
        desc: "", // 商品描述
        unit: "", // 商品单位
        stock: "", // 总库存
        stockWarn: "", // 库存预警
        stockShow: 0, // 库存显示
        status: 0, // 是否上架
        express: "", // 运费模板
        
        skuType: 0, // 统一规格或多规格
        markPrice: "", // 市场价格
        salePrice: "", // 销售价格
        costPrice: "", // 成本价格
        weight: "", // 商品重量
        volume: "", // 商品体积
    },
    mutations: {
        // 修改state
        vModalState(state, { key, value }) {
            state[key] = value
        }
    },
    actions: {

    },
    getters: {

    }
}