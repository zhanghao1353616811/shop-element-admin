<template>
  <div>
    <el-dialog title="商品规格选择" width="80%" :visible.sync="diaUpVisible" :close-on-click-modal="false">
      <el-container class="main-container">
        <el-aside class="aside-content" width="200px">
          <div :class="[activeIndex === index ? 'active-color' : '', 'aside-li']" v-for="(item, index) in tableSku" :key="index" @click="clickSkusItem(index)">{{item.name}}</div>
        </el-aside>
        <el-main class="main-content">
          <div class="main-header">
            <el-button class="header-btn" type="primary" size="mini" @click="chooseAllSku">
              {{isChooseAll ? '取消全选' : '全选'}}
            </el-button>
          </div>
          <div class="flex-width">
            <div :class="[item.isCheck ? 'active-color' : '', 'flex-item']" v-for="(item, index) in skuList" :key="index" @click="chooseSkus(item)">{{item.name}}</div>
          </div>
        </el-main>
      </el-container>
      <span slot="footer">
        <el-button @click="hide()">取消</el-button>
        <el-button type="primary" @click="confirmChooseSkus">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      diaUpVisible: false,
      callback: false,
      activeIndex: 0,
      chooseList: [],
    };
  },
  computed: {
    ...mapGetters(["tableSku"]),
    skuList() {
      return this.tableSku[this.activeIndex]
        ? this.tableSku[this.activeIndex].list.filter((item) => {
            return item.name != "";
          })
        : [];
    },
    isChooseAll() {
      return this.skuList.length === this.chooseList.length;
    },
  },
  methods: {
    confirmChooseSkus() {
      if (typeof this.callback === "function") {
        let item = this.tableSku[this.activeIndex];
        // 接收一个函数在传递参数过去
        this.callback({
          name: item.name,
          type: item.type,
          list: this.chooseList,
        });
      }
      this.hide();
    },

    // 打开弹出层
    chooseSkusDialog(callback) {
      this.callback = callback;
      this.diaUpVisible = true;
      this.clickSkusItem(0); // 打开默认第一项
    },

    // 关闭弹出层
    hide() {
      this.callback = false;
      this.diaUpVisible = false;
    },

    // 切换规格卡片
    clickSkusItem(index) {
      this.activeIndex = index;
      this.cancelChooseAll();
    },

    // 单选
    chooseSkus(item) {
      // 之前未选中
      if (!item.isCheck) {
        // 加入选中列表
        this.chooseList.push(item);
        // 修改选中状态后中断
        return (item.isCheck = true);
      }
      // 之前选中 => 找到当前对象在选中列表中的索引
      let index = this.chooseList.findIndex((skuItm) => {
        return skuItm.id === item.id;
      });
      // 没找到则中断选中状态
      if (index < 0) return;
      // 取消单选状态 => 从列表中移除
      this.chooseList.splice(index, 1);
      // 修改选中状态
      item.isCheck = false;
    },

    // 全选
    chooseAllSku() {
      // 取消全选后中断
      if (this.isChooseAll) {
        return this.cancelChooseAll();
      }
      // 将对象里的isCheck状态设为true => 然后将对象返回出去重新组成新数组 => 在赋值给选中列表
      this.chooseList = this.skuList.map((item) => {
        item.isCheck = true;
        return item;
      });
    },

    // 取消全选
    cancelChooseAll() {
      this.skuList.forEach((item) => {
        item.isCheck = false;
      });
      // 清空选中列表
      return (this.chooseList = []);
    },
  },
};
</script>

<style scoped lang="less">
/deep/ .el-dialog__body {
  padding: 0;
}

.main-container {
  position: relative;
  height: 350px;
}

.aside-content {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #fff;
  border-right: 1px solid #ccc;
}

.aside-li {
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
}
.aside-li:first-child {
  border-top: 1px solid #ccc;
}

.active-color {
  color: #fff;
  background-color: #67c23a;
}

.main-content {
  position: absolute;
  top: 0;
  left: 200px;
  right: 0;
  bottom: 0;
  padding: 0;
  .main-header {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    .header-btn {
      margin: 15px 25px;
    }
  }
  .flex-width {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    .flex-item {
      border: 1px solid #ccc;
      padding: 2px 8px;
      margin: 0 15px 10px 0;
      cursor: pointer;
    }
  }
}
</style>