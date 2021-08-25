<template>
  <div>
    <div class="search-content">
      <div>
        <!-- 左边 -->
        <slot name="left"></slot>
      </div>
      <div class="search-right" v-if="!isSuperSearch">
        <!-- 右边 -->
        <slot name="right">
          <el-input v-model="keyWords" size="mini" :placeholder="placeholder"></el-input>
          <el-button class="search-btn" type="info" size="mini" @click="$emit('search', keyWords)">搜索</el-button>
          <el-button size="mini" @click="isSuperSearch = true">高级搜索</el-button>
        </slot>
      </div>
    </div>
    <!-- 高级搜索 -->
    <el-card class="search-card" v-show="isSuperSearch">
      <div class="card-header" slot="header">
        <span>高级搜索</span>
        <el-button type="text" @click="closeSuperSearch">收起</el-button>
      </div>
      <div>
        <!-- 表单 -->
        <slot name="form"></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      keyWords: "",
      isSuperSearch: false,
    };
  },
  methods: {
    // 让父组件实例调用子组件关闭方法
    closeSuperSearch() {
      this.isSuperSearch = false;
    },
  },
};
</script>

<style scoped lang="less">
.search-content {
  display: flex;
  justify-content: space-between;
}
.search-right {
  display: flex;
}
.search-btn {
  margin-left: 10px;
}
.search-card {
  margin-top: 20px;
  /deep/ .el-card__header {
    padding: 0;
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
}
</style>