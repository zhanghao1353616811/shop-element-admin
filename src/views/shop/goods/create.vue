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
            <el-radio-group :value="skuType" @input="vModel('skuType', $event)">
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
              <sku-card v-for="(item, index) in skuCard" :key="index" :item="item" :index="index" :skuCardLength="skuCardLength"></sku-card>
              <el-button type="success" size="mini" @click="addSkuCard">添加规格</el-button>
            </el-form-item>
          </el-form>
          <el-form label-width="70px">
            <el-form-item label="批量设置">
              <template v-if="!setSkuAllStatus">
                <el-button type="text" v-for="(item,index) in setSkuList" :key="index" @click="openSetSkus(item)">{{item.name}}</el-button>
              </template>
              <template v-else>
                <el-input-number class="ipt-number" v-model="setSkusVal" size="small" controls-position="right" :placeholder="placeholderName"></el-input-number>
                <el-button class="set-btn" size="small" @click="setSkuStatus">设置</el-button>
                <el-button size="small" @click="cancelSetStatus">取消</el-button>
              </template>
            </el-form-item>
            <el-form-item label="规格设置">
              <sku-table ref="skusTable"></sku-table>
            </el-form-item>
          </el-form>
        </template>
      </el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="媒体设置">媒体设置</el-tab-pane>
      <el-tab-pane label="商品详情">
        <tinymce ref="editor" v-model="content" @onClick="onClick" />
      </el-tab-pane>
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
import baseCreate from "@/components/shop/create/base-create.vue";
import singleAttrs from "@/components/shop/create/single-attrs.vue";
import skuCard from "@/components/shop/create/sku/sku-card.vue";
import skuTable from "@/components/shop/create/sku-table.vue";
import tinymce from "@/components/common/tinymce.vue";

export default {
  components: {
    baseCreate,
    singleAttrs,
    skuCard,
    skuTable,
    tinymce,
  },
  data() {
    return {
      activeIndex: 0,
      content: "",
      setSkusKey: "",
      placeholderName: "",
      setSkusVal: "",
      setSkuAllStatus: false,
      setSkuList: [
        {
          name: "销售价",
          key: "salePrice",
        },
        {
          name: "市场价",
          key: "markPrice",
        },
        {
          name: "成本价",
          key: "costPrice",
        },
        {
          name: "库存",
          key: "stock",
        },
        {
          name: "体积",
          key: "volume",
        },
        {
          name: "重量",
          key: "weight",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      skuType: (state) => state.goods_create.skuType, // 统一规格或多规格
      skuCard: (state) => state.goods_create.skuCard,
    }),
    skuCardLength() {
      return this.skuCard.length;
    },
  },
  methods: {
    ...mapMutations(["vModelState", "addSkuCard"]),
    // 修改表单的值
    vModel(key, value) {
      this.vModelState({ key, value });
    },
    // 鼠标单击的事件 富文本编辑器
    onClick(e, editor) {
      console.log("Element clicked");
      console.log(e);
      console.log(editor);
    },

    openSetSkus(item) {
      this.setSkuAllStatus = true;
      this.setSkusKey = item.key;
      this.placeholderName = item.name;
    },

    setSkuStatus() {
      this.$refs.skusTable.tableList.forEach((item) => {
        item[this.setSkusKey] = this.setSkusVal;
      });
      this.cancelSetStatus();
    },

    cancelSetStatus() {
      this.setSkuAllStatus = false;
      this.setSkusVal = "";
    },
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
.ipt-number {
  width: 132px;
}
.set-btn {
  margin-left: 10px;
}
</style>