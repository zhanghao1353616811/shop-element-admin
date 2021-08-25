import $Util from '@/common/util.js'
export default {
    state: {
        name: "", // 活动名称
        category: "", // 商品分类
        desc: "", // 商品描述
        unit: "", // 商品单位
        stock: 0, // 总库存
        stockWarn: 0, // 库存预警
        stockShow: 1, // 库存显示 0隐藏 1显示
        status: 1, // 是否上架 0仓库 1上架
        express: "", // 运费模板

        skuType: 0, // sku类型 0单一 1多规格 
        markPrice: 0, // 市场价格
        salePrice: 0, // 销售价格
        costPrice: 0, // 成本价格
        weight: 0, // 商品重量
        volume: 0, // 商品体积
        // 规格卡片
        skuCard: [{
            name: '颜色', // 规格名称
            type: 0, // 规格类型 0无 1颜色 2图片
            // 规格属性列表
            list: [
                {
                    id: 0,
                    name: '黑色',
                    image: '',
                    color: '',
                    isCheck: false
                },
                {
                    id: 1,
                    name: '红色',
                    image: '',
                    color: '',
                    isCheck: false
                }
            ]
        },
        {
            name: '尺寸', // 规格名称
            type: 0, // 规格类型 0无 1颜色 2图片
            // 规格属性列表
            list: [
                {
                    id: 2,
                    name: 'XL',
                    image: '',
                    color: '',
                    isCheck: false
                },
                {
                    id: 3,
                    name: 'XXL',
                    image: '',
                    color: '',
                    isCheck: false
                }]
        }],
        // 表头
        ths: [
            { name: "商品规格", rowspan: 1, width: "60" },
            { name: "sku图片", rowspan: 2, width: "60" },
            { name: "销售价", rowspan: 2, width: "100" },
            { name: "市场价", rowspan: 2, width: "100" },
            { name: "成本价", rowspan: 2, width: "100" },
            { name: "库存", rowspan: 2, width: "100" },
            { name: "体积", rowspan: 2, width: "100" },
            { name: "重量", rowspan: 2, width: "100" },
            { name: "编码", rowspan: 2, width: "100" },
        ],
    },
    mutations: {
        // 修改state
        vModelState(state, { key, value }) {
            state[key] = value
        },
        // 增加规格卡片
        addSkuCard(state) {
            state.skuCard.push({
                name: '',
                type: 0,
                list: []
            })
        },
        // 删除规格图片
        delSkuCard(state, index) {
            state.skuCard.splice(index, 1)
        },
        // 修改规格图片
        vModelSkuCard(state, { key, index, value }) {
            state.skuCard[index][key] = value
        },
        // 排序规格图片
        sortSkuCard(state, { action, index }) {
            $Util[action](state.skuCard, index)
        },
        // 增加指定规格卡片的规格属性
        addSkuListVal(state, index) {
            state.skuCard[index].list.push({
                name: '规格名称',
                image: '',
                color: ''
            })
        },
        // 删除指定规格卡片的规格属性
        delSkuListVal(state, { cardIndex, valIndex }) {
            state.skuCard[cardIndex].list.splice(valIndex, 1)
        },
        // 修改指定规格卡片的规格属性
        updateSkuListVal(state, { cardIndex, valIndex, key, value }) {
            state.skuCard[cardIndex].list[valIndex][key] = value
        },
        // 排序指定规格卡片的规格属性
        sortSkuCardList(state, { index, value }) {
            state.skuCard[index].list = value
        }
    },
    actions: {

    },
    getters: {
        tableSku(state) {
            return state.skuCard.filter(item => {
                return item.list.length > 0
            })
        },
        // 获取表头
        tableThs(state, getters) {
            let length = getters.tableSku.length
            state.ths[0].colspan = length
            state.ths[0].rowspan = length > 0 ? 1 : 2
            return state.ths
        },
        // 获取表格数据
        tableData(state) {
            // 判断是否有规格卡片
            if (state.skuCard.length === 0) {
                return []
            }
            let sku_list = []
            for (let i = 0; i < state.skuCard.length; i++) {
                if (state.skuCard[i].list.length > 0) {
                    sku_list.push(state.skuCard[i].list)
                }
            }
            // 没有自由组合
            if (sku_list.length === 0) {
                return []
            }
            // 进行自由组合
            let arr = $Util.cartesianProductOf(...sku_list)
            return arr.map(item => {
                let obj = {
                    skus: [], // 排序组合
                    image: '', // sku图片
                    salePrice: 0, // 销售价格
                    markPrice: 0, // 市场价格
                    costPrice: 0, // 成本价格
                    stock: 0, // 总库存
                    volume: 0, // 商品体积
                    weight: 0, // 商品重量
                    code: '编码', // 编码
                }
                obj.skus = item
                return obj
            })
        }
    }
}