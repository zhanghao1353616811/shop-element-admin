<template>
  <div class="sku-content">
    <div class="sku-header">
      <div class="sku-left">
        <div>规格项:</div>
        <el-input class="form-input" :value="item.name" @input="vModel('name', index, $event)" placeholder="请输入规格名称" size="mini">
          <el-button slot="append" icon="el-icon-more"></el-button>
        </el-input>
        <el-radio-group :value="item.type" @input="vModel('type', index, $event)">
          <el-radio :label="0">无</el-radio>
          <el-radio :label="1">颜色</el-radio>
          <el-radio :label="2">图片</el-radio>
        </el-radio-group>
      </div>
      <div class="sku-right">
        <el-button icon="el-icon-top" size="mini" :disabled="index === 0" @click="sortCard('moveUp',index)"></el-button>
        <el-button icon="el-icon-bottom" size="mini" :disabled="skuCardLength === (index + 1)" @click="sortCard('moveDown',index)"></el-button>
        <el-button type="text" @click="delSkuCard(index)">删除</el-button>
      </div>
    </div>
    <div class="sku-footer">
      <sku-card-children v-for="(listItem, listIndex) in skuCardList" :key="listIndex" v-dragging="{item: listItem, list: skuCardList, group: `skuItem${index}` }" :item="listItem" :listIndex="listIndex" :cardIndex="index" :type="item.type"></sku-card-children>
    </div>
    <!-- 增加规格属性值 -->
    <el-button class="sku-btn" type="text" icon="el-icon-plus" size="mini" @click="addSkuListVal(index)">增加规格值</el-button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import skuCardChildren from "./sku-card-children.vue";

export default {
  components: {
    skuCardChildren,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
    },
    skuCardLength: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      skuCardList: this.item.list,
    };
  },
  mounted() {
    // 拖拽
    this.$dragging.$on("dragend", (e) => {
      if (e.group === `skuItem${this.index}`) {
        this.sortSkuCardList({
          index: this.index,
          value: this.skuCardList,
        });
      }
    });
  },
  methods: {
    ...mapMutations([
      "delSkuCard",
      "vModelSkuCard",
      "sortSkuCard",
      "addSkuListVal",
      "sortSkuCardList",
    ]),
    vModel(key, index, value) {
      this.vModelSkuCard({ key, index, value });
    },
    sortCard(action, index) {
      this.sortSkuCard({ action, index });
    },
  },
};
</script>

<style scoped lang="less">
.form-input {
  width: 40%;
}
.sku-content {
  border: 1px solid #ccc;
  margin-bottom: 20px;
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
  .sku-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }
  .sku-btn {
    font-size: 18px;
    margin-left: 15px;
  }
}
</style>