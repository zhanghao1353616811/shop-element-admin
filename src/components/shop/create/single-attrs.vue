<template>
  <el-form label-width="70px">
    <el-form-item label="市场价格">
      <el-input class="form-input" type="number" :value="markPrice" @input="vModel('markPrice', $event)" placeholder="市场价格">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="销售价格">
      <el-input class="form-input" type="number" :value="salePrice" @input="vModel('salePrice', $event)" placeholder="销售价格">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="成本价格">
      <el-input class="form-input" type="number" :value="costPrice" @input="vModel('costPrice', $event)" placeholder="成本价格">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="商品重量">
      <el-input class="form-input" type="number" :value="weight" @input="vModel('weight', $event)" placeholder="商品重量">
        <template slot="append">公斤</template>
      </el-input>
    </el-form-item>
    <el-form-item label="商品体积">
      <el-input class="form-input" type="number" :value="volume" @input="vModel('volume', $event)" placeholder="商品体积">
        <template slot="append">立方米</template>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      markPrice: (state) => state.goods_create.markPrice, // 市场价格
      salePrice: (state) => state.goods_create.salePrice, // 销售价格
      costPrice: (state) => state.goods_create.costPrice, // 成本价格
      weight: (state) => state.goods_create.weight, // 商品重量
      volume: (state) => state.goods_create.volume, // 商品体积
    }),
  },
  methods: {
      ...mapMutations(['vModelState']),
      vModel(key, value) {
          this.vModelState({key, value})
      }
  },
};
</script>

<style>
</style>