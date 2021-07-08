<template>
  <el-form label-width="70px">
    <el-form-item label="活动名称">
      <el-input class="form-input" :value="name" @input="vModal('name', $event)" placeholder="请输入商品名称，不能超过60个字符"></el-input>
    </el-form-item>
    <el-form-item label="商品分类">
      <el-cascader :value="category" @input="vModal('category', $event)" :options="options"></el-cascader>
    </el-form-item>
    <el-form-item label="商品描述">
      <el-input class="form-input" type="textarea" :value="desc" @input="vModal('desc', $event)" placeholder="选填，商品卖点简述，例如：此款商品美观大方 性价比较高 不容错过" :rows="3"></el-input>
    </el-form-item>
    <el-form-item label="商品单位">
      <el-input class="form-input" :value="unit" @input="vModal('unit', $event)" placeholder="请输入商品单位"></el-input>
    </el-form-item>
    <el-form-item label="总库存">
      <el-input class="form-input" type="number" :value="stock" @input="vModal('stock', $event)" placeholder="总库存">
        <template slot="append">件</template>
      </el-input>
    </el-form-item>
    <el-form-item label="库存预警">
      <el-input class="form-input" type="number" :value="stockWarn" @input="vModal('stockWarn', $event)" placeholder="库存预警">
        <template slot="append">件</template>
      </el-input>
    </el-form-item>
    <el-form-item label="库存显示">
      <el-radio-group :value="stockShow" @input="vModal('stockShow', $event)">
        <el-radio label="1" border>是</el-radio>
        <el-radio label="0" border>否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否上架">
      <el-radio-group :value="status" @input="vModal('status', $event)">
        <el-radio label="1" border>立刻上架</el-radio>
        <el-radio label="0" border>放入仓库</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="运费模板">
      <el-select :value="express" @input="vModal('express', $event)">
        <el-option v-for="(item, index) in expreOptions" :key="index" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向航",
                },
              ],
            },
          ],
        },
      ],
      expreOptions: [
        {
          value: "选项1",
          label: "区域1",
        },
        {
          value: "选项2",
          label: "区域2",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      name: (state) => state.goods_create.name, // 活动名称
      category: (state) => state.goods_create.category, // 商品分类
      desc: (state) => state.goods_create.desc, // 商品描述
      unit: (state) => state.goods_create.unit, // 商品单位
      stock: (state) => state.goods_create.stock, // 总库存
      stockWarn: (state) => state.goods_create.stockWarn, // 库存预警
      stockShow: (state) => state.goods_create.stockShow, // 库存显示
      status: (state) => state.goods_create.status, // 是否上架
      express: (state) => state.goods_create.express, // 运费模板
    }),
  },
  methods: {
    ...mapMutations(['vModalState']),
    vModal(key, value) {
      this.vModalState({ key, value });
    },
  },
};
</script>

<style lang="less">
.form-input {
  width: 40%;
}
</style>

