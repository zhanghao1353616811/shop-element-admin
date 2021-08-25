<template>
  <div>
    <el-dialog title="上传图片" width="80%" :visible.sync="diaUpVisible" :close-on-click-modal="false">
      <el-header class="header-content">
        <div>
          <el-select class="header-select" v-model="search.order" size="mini" placeholder="输入图片排序方式">
            <el-option label="降序" value="desc"></el-option>
            <el-option label="升序" value="asce"></el-option>
          </el-select>
          <el-input class="header-ipt" v-model="search.kewords" placeholder="输入图片名称" size="mini" clearable></el-input>
          <el-button type="success" size="mini">搜索</el-button>
        </div>
      </el-header>
      <el-container class="main-container">
        <el-aside class="aside-content" width="200px">
          <photo-item class="aside-li" v-for="(item, index) in photos" :key="index" :item="item" :index="index" :showOptions="false" :isActive="activeIndex === index" @click="clickPhotosItem" @update="creOrUpPhotos" @del="delPhotos">
          </photo-item>
        </el-aside>
        <el-main class="main-content">
          <div class="flex-width">
            <el-card :class="[imgItem.isCheck ? 'active-img' : '', 'img-flex']" :body-style="{ padding: '0px' }" shadow="hover" v-for="(imgItem, index) in imgList" :key="index">
              <img class="img-src" :src="imgItem.src" @click="chooseImage(imgItem)" />
              <el-tag class="tag-tips" type="danger" size="mini" v-if="imgItem.isCheck">{{ imgItem.checkOrder }}</el-tag>
              <div class="img-name">{{ imgItem.name }}</div>
              <el-button-group class="image-btn">
                <el-button size="mini" icon="el-icon-edit" @click="openImgName(imgItem)"></el-button>
                <el-button size="mini" icon="el-icon-delete" @click="delImg({index})"></el-button>
              </el-button-group>
            </el-card>
          </div>
        </el-main>
      </el-container>
      <el-footer class="footer-content">
        <div class="foot-btn">
          <el-button-group>
            <el-button size="mini" icon="el-icon-top">上一页</el-button>
            <el-button size="mini" icon="el-icon-bottom">下一页</el-button>
          </el-button-group>
        </div>
        <div class="foot-pag">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100,200,300,400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>
        </div>
      </el-footer>
      <span slot="footer">
        <el-button @click="hide()">取消</el-button>
        <el-button type="primary" @click="confirmChooseImg">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import photoItem from "@/components/image/photo-item.vue";
export default {
  components: {
    photoItem,
  },
  props: {
    imageMax: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      diaUpVisible: false,
      activeIndex: 0,
      photos: [],
      dialogFormVisible: false,
      isUpdateIndex: -1, // 修改相册
      diaPreVisible: false,
      preImgSrc: "",
      imgList: [],
      chooseImgList: [],
      currentPage: 1,
      callback: false,
      search: [
        {
          order: "desc",
          kewords: "",
        },
      ],
      photoData: {
        name: "",
        order: "",
      },
    };
  },
  created() {
    this.initPhotos();
    this.initImgList();
  },
  methods: {
    confirmChooseImg() {
      if (this.chooseImgList.length === 0) {
        return this.$message({
          message: "至少选中一张图片上传",
          type: "warning",
        });
      }
      if (typeof this.callback === "function") {
        // 解决vue的{__ob__: observer}取值问题
        let chooseImgList = JSON.parse(JSON.stringify(this.chooseImgList));
        // 接收一个函数在传递参数过去
        this.callback(chooseImgList);
      }
      this.hide();
    },

    // 打开弹出层
    chooseImgDialog(callback) {
      this.callback = callback;
      this.diaUpVisible = true;
    },

    // 关闭弹出层
    hide() {
      this.callback = false;
      this.diaUpVisible = false;
      this.cancelChoose();
    },

    initPhotos() {
      for (let i = 0; i < 7; i++) {
        this.photos.push({
          name: "相册" + i,
          num: Math.floor(Math.random() * 100),
          order: 0,
        });
      }
    },

    initImgList() {
      for (let i = 0; i < 30; i++) {
        this.imgList.push({
          id: i,
          name: "图片" + i,
          src: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/27.jpg",
          isCheck: false,
          checkOrder: 0, // 序号
        });
      }
    },

    clickPhotosItem(index) {
      this.activeIndex = index;
    },

    creOrUpPhotos(Obj) {
      // 修改相册
      if (Obj) {
        let { item, index } = Obj;
        // 初始化相册
        this.photoData.name = item.name;
        this.photoData.order = item.order;
        this.isUpdateIndex = index;
        return (this.dialogFormVisible = true);
      }
      // 创建相册
      this.photoData = {
        name: "",
        order: 0,
      };
      this.isUpdateIndex = -1;
      this.dialogFormVisible = true;
    },

    // 删除相册
    delPhotos(index) {
      this.$confirm("是否确定删除相册", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false, // 是否可通过点击遮罩层关闭 MessageBox
      })
        .then(() => {
          this.photos.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 修改图片
    openImgName(Obj) {
      this.$prompt("请输入新名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: Obj.name,
        closeOnClickModal: false,
        inputValidator(val) {
          if (val === "") {
            return "图片名称不能为空";
          }
        },
      })
        .then(({ value }) => {
          Obj.name = value;
          this.$message({
            type: "success",
            message: "修改成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },

    // 删除图片
    delImg(Obj) {
      this.$confirm(Obj.all ? "是否删除选中图片?" : "是否删除该图片?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (Obj.all) {
            let list = this.imgList.filter((item) => {
              return !this.chooseImgList.some((v) => v.id === item.id);
            });
            this.imgList = list;
            this.chooseImgList = [];
          } else {
            this.imgList.splice(Obj.index, 1);
          }
          this.$message({
            type: "success",
            message: "删除成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },

    // 选中图片
    chooseImage(item) {
      // 最多选中图片数量
      if (!item.isCheck) {
        if (this.chooseImgList.length >= this.imageMax) {
          return this.$message({
            message: "最多可选" + this.imageMax + "张图片",
            type: "warning",
          });
        }
        // 加入选中
        this.chooseImgList.push({
          id: item.id,
          src: item.src,
        });
        // 计算序号
        item.checkOrder = this.chooseImgList.length;
        // 修改状态
        item.isCheck = true;
        return; // 若还做另一种判断则使用 return 中断
      }
      // 取消单个选中
      let index = this.chooseImgList.findIndex((img) => img.id === item.id);
      if (index === -1) return;
      let length = this.chooseImgList.length;
      // 删除最后一个的前面任意一个 => 后面的重新计算imgList选中序号
      if (index + 1 < length) {
        for (let j = index; j < length; j++) {
          let i = this.imgList.findIndex(
            (img) => img.id === this.chooseImgList[j].id
          );
          if (i > -1) {
            this.imgList[i].checkOrder--;
          }
        }
      }
      // 找到chooseImgList的索引 删除
      this.chooseImgList.splice(index, 1);
      // 修改状态
      item.isCheck = false;
      // 重置序号
      this.checkOrder = 0;
    },

    // 取消所有选中
    cancelChoose() {
      this.imgList.forEach((item) => {
        // 找到所有选中的图片
        let index = this.chooseImgList.findIndex((v) => {
          return v.id === item.id;
        });
        if (index > -1) {
          // 取消选中样式 选中排序归零
          item.isCheck = false;
          item.checkOrder = 0;
          // 从chooseList中移除
          this.chooseImgList.splice(index, 1);
        }
      });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style  scoped lang="less">
/deep/ .el-dialog__body {
  padding: 0 20px;
}
.header-content {
  line-height: 60px;
  margin-left: -20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}

.header-select {
  width: 150px;
}

.header-ipt {
  margin: 0 10px;
  width: 200px;
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
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
}

.drop-down {
  width: 50px;
  height: 25px;
  line-height: 25px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #ccc;
}

.main-content {
  position: absolute;
  top: 0;
  left: 200px;
  right: 0;
  bottom: 0;
}

.flex-width {
  display: flex;
  flex-wrap: wrap;
}

.img-flex {
  /* 换行则子元素为固定像素 */
  margin: 6px 12px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}

.active-img {
  border: 1px solid #dc3545;
}

.img-src {
  width: 100%;
  height: 90px;
  display: block;
}

.tag-tips {
  position: absolute;
  right: 0;
  top: 0;
}

.img-name {
  color: #fff;
  text-align: center;
  opacity: 0.8;
  background: rgba(0, 0, 0, 0.5);
}

.image-btn {
  display: flex;
  justify-content: center;
  margin: 7px 0;
}

.footer-content {
  display: flex;
  align-items: center;
  line-height: 60px;
  border-top: 1px solid #ccc;
}

.foot-btn {
  width: 185px;
  margin-left: -6px;
  border-right: 1px solid #ccc;
}

.foot-pag {
  line-height: 0px;
  margin-left: 34px;
}
</style>