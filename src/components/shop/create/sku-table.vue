<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th class="table-box" v-for="(theader, thIndex) in tableThs" :key="thIndex" :rowspan="theader.rowspan" :colspan="theader.colspan">{{theader.name}}</th>
      </tr>
      <tr>
        <!-- 商品规格组合 -->
        <th class="table-box" v-for="(item, index) in tableSku" :key="index">{{item.name}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in tableList" :key="index">
        <th class="table-box" v-for="(skuItem, skuIndex) in item.skus" :key="skuIndex">
          {{skuItem.name}}
        </th>
        <td class="table-box">
          <div class="sku-img" v-if="!item.image" @click="chooseImage(item)">
            <i class="el-icon-plus"></i>
          </div>
          <img class="sku-image" v-else :src="item.image" @click="chooseImage(item)">
        </td>
        <td class="table-box">
          <el-input-number v-model="item.salePrice" size="small" controls-position="right"></el-input-number>
        </td>
        <td class="table-box">
          <el-input-number v-model="item.markPrice" size="small" controls-position="right"></el-input-number>
        </td>
        <td class="table-box">
          <el-input-number v-model="item.costPrice" size="small" controls-position="right"></el-input-number>
        </td>
        <td class="table-box">
          <el-input-number v-model="item.stock" size="small" controls-position="right"></el-input-number>
        </td>
        <td class="table-box">
          <el-input-number v-model="item.volume" size="small" controls-position="right"></el-input-number>
        </td>
        <td class="table-box">
          <el-input-number v-model="item.weight" size="small" controls-position="right"></el-input-number>
        </td>
        <td class="table-box">
          <el-input type="text" size="small" v-model="item.code"></el-input>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  inject: ["app"],
  data() {
    return {
      tableList: [],
    };
  },
  computed: {
    ...mapGetters(["tableThs", "tableData", "tableSku"]),
    ...mapState({
      skuCard: (state) => state.goods_create.skuCard,
    }),
  },
  watch: {
    tableData(newVal, oldVal) {
      this.tableList = newVal;
    },
  },
  mounted() {
    this.tableList = this.tableData;
  },
  methods: {
    chooseImage(item) {
      this.app.chooseImg((res) => {
        item.image = res[0].src;
      }, 1);
    },
  },
};
</script>

<style scoped lang="less">
.table-box {
  width: 100px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  .sku-img {
    width: 50px;
    margin-left: 20px;
    border: 1px dashed #ccc;
  }
  .sku-image {
    width: 100px;
  }
  /deep/ .el-input-number--small {
    width: 105px;
  }
}
</style>