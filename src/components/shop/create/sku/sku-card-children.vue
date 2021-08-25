<template>
  <div class="sku-bottom">
    <div class="sku-tag">
      <div class="tag-left" v-if="type !=0">
        <!-- 颜色选择器 -->
        <el-color-picker v-if="type === 1" size="mini" :value="item.color" @change="colorChange"></el-color-picker>
        <!-- 图片上传 -->
        <template v-else>
          <div class="sku-upload" v-if="!item.image" @click="chooseImage">
            <i class="el-icon-plus"></i>
          </div>
          <img class="sku-img" v-else :src="item.image" @click="chooseImage">
        </template>
      </div>
      <el-input :class="[isShowBoder ? 'sku-input' : 'sku-ipt']" size="small" :value="item.name" @input="inputChange" @focus="isShowBoder = true" @blur="isShowBoder = false"></el-input>
    </div>
    <i class="el-icon-circle-close sku-icon" @click="delSkuListVal({cardIndex: cardIndex, valIndex: listIndex})"></i>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  inject: ["app"],
  props: {
    type: {
      type: Number,
      default: 0,
    },
    item: {
      type: Object,
      default: () => {},
    },
    listIndex: {
      type: Number,
      default: 0,
    },
    cardIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isShowBoder: false,
      imgSrc: "",
    };
  },
  methods: {
    ...mapMutations(["delSkuListVal", "updateSkuListVal"]),
    vModel(key, value) {
      this.updateSkuListVal({
        cardIndex: this.cardIndex,
        valIndex: this.listIndex,
        key,
        value,
      });
    },
    inputChange(e) {
      this.vModel("name", e);
    },
    chooseImage() {
      // 传递一个函数过去
      this.app.chooseImg((res) => {
        this.vModel("image", res[0].src);
      }, 1);
    },

    // 监听颜色选择器
    colorChange(e) {
      this.vModel("color", e);
    },
  },
};
</script>

<style scoped lang="less">
.sku-bottom {
  margin-left: 18px;
  position: relative;
}
.sku-tag {
  margin-top: 10px;
  width: 150px;
  height: 45px;
  line-height: 44px;
  padding: 0 5px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  .tag-left {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .sku-upload {
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px dashed #ccc;
      margin-right: 5px;
    }
    .sku-img {
      width: 40px;
      height: 40px;
      margin-right: 5px;
    }
  }
  .sku-ipt {
    width: 110px;
    font-size: 14px;
    /deep/ .el-input__inner {
      border: none;
      text-align: center;
    }
  }
  .sku-input {
    width: 110px;
    font-size: 14px;
    /deep/ .el-input__inner {
      border: 3px solid rgba(190, 222, 254);
      text-align: center;
    }
  }
}
.sku-icon {
  font-size: 18px;
  position: absolute;
  right: -7px;
  top: 4px;
}
</style>