<template>
  <div class="create-page">
    <router-link class="back-btn" :to="{name: 'shop_goods_list'}">
      <el-button icon="el-icon-arrow-left" size="mini" plain>回到商品列表</el-button>
    </router-link>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="基础设置">
        <base-create></base-create>
      </el-tab-pane>
      <el-tab-pane label="商品规格">
        <el-form label-width="70px">
          <el-form-item label="商品规格">
            <el-radio-group :value="skuType" @input="vModal('skuType', $event)">
              <el-radio-button :label="0">统一规格</el-radio-button>
              <el-radio-button :label="1">多规格</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <!-- 单规格 -->
        <template v-if="skuType === 0">
          <single-attrs></single-attrs>
        </template>
        <!-- 多规格 -->
        <template v-else>
          <el-form label-width="70px">
            <el-form-item label="添加规格">
              <div class="sku-content">
                <div class="sku-header">
                  <div class="sku-left">
                    <div>规格项:</div>
                    <el-input class="form-input" placeholder="请输入规格名称" size="mini">
                      <el-button slot="append" icon="el-icon-more"></el-button>
                    </el-input>
                    <el-radio-group v-model="radio">
                      <el-radio :label="0">无</el-radio>
                      <el-radio :label="1">颜色</el-radio>
                      <el-radio :label="2">图片</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="sku-right">
                    <el-button icon="el-icon-top" size="mini"></el-button>
                    <el-button icon="el-icon-bottom" size="mini"></el-button>
                    <el-button type="text">删除</el-button>
                  </div>
                </div>
                <div class="sku-bottom">
                  <el-button type="text" icon="el-icon-plus" size="mini">增加规格值</el-button>
                </div>
              </div>
              <el-button type="success" size="mini">添加规格</el-button>
            </el-form-item>
            <el-form-item label="批量设置">
              <el-button type="text">销售价</el-button>
              <el-button type="text">市场价</el-button>
              <el-button type="text">成本价</el-button>
              <el-button type="text">库存</el-button>
              <el-button type="text">体积</el-button>
              <el-button type="text">重量</el-button>
            </el-form-item>
            <el-form-item label="规格设置"></el-form-item>
          </el-form>
        </template>
      </el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="媒体设置">媒体设置</el-tab-pane>
      <el-tab-pane label="商品详情">商品详情</el-tab-pane>
      <el-tab-pane label="折扣设置">折扣设置</el-tab-pane>
    </el-tabs>
    <div class="btn-fixed">
      <el-button type="success">保存</el-button>
      <el-button class="btn-cancel" type="info">取消</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import baseCreate from '@/components/shop/create/base-create'
import singleAttrs from '@/components/shop/create/single-attrs'

export default {
  components: {
    baseCreate,
    singleAttrs
  },
  data() {
    return {
      activeIndex: "0",
      radio: "",
    }
  },
  computed: {
    ...mapState({
        skuType: state => state.goods_create.skuType, // 统一规格或多规格
    }),
  },
  methods: {
    ...mapMutations(['vModalState']),
    // 修改表单的值
    vModal(key, value) {
      this.vModalState({ key, value })
    }
  },
};
</script>

<style scoped lang="less">
.create-page {
  padding-bottom: 130px;
}
.crete-page {
  position: relative;
}
.back-btn {
  position: absolute;
  left: 180px;
  top: 13px;
}
.form-input {
  width: 40%;
}
.btn-fixed {
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 0;
  right: 20px;
  .btn-cancel {
    margin: 10px 0px 10px 0;
  }
}
.sku-content {
  border: 1px solid #ccc;
  .sku-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid #ccc;
    .sku-left {
      width: 600px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }
    .sku-right {
      margin-right: 10px;
    }
  }
  .sku-bottom {
    margin-left: 18px;
  }
}
</style>