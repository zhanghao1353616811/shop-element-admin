<template>
  <el-container>
    <el-tabs v-model="activeIndex" @tab-click="handleClick">
      <el-tab-pane :label="item.name" v-for="(item, index) in tabsList" :key="index"></el-tab-pane>
    </el-tabs>
    <search-button ref="searchButton" placeholder="要搜索的商品名称" @search="searchEvent">
      <template #left>
        <el-button type="success" size="mini">发布商品</el-button>
        <el-button type="danger" size="mini">批量删除</el-button>
      </template>
      <template #form>
        <el-form class="for-item" :inline="true" ref="form" :model="searchForm">
          <el-form-item class="for-item" label="商品名称">
            <el-input v-model="searchForm.name" placeholder="商品名称" size="mini"></el-input>
          </el-form-item>
          <el-form-item class="for-item" label="商品分类">
            <el-select class="search-select" v-model="searchForm.category" placeholder="请选择商品分类" size="mini">
              <el-option label="区域1" value="'1'"></el-option>
              <el-option label="区域2" value="'2'"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
            <el-button size="mini" @click="clearSearch">清空搜索条件</el-button>
          </el-form-item>
        </el-form>
      </template>
    </search-button>
    <el-table class="table-content" :data="tableData[this.activeIndex].list" border>
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <el-table-column label="商品" align="center" width="430">
        <template slot-scope="scope">
          <div class="goods-info">
            <el-image class="goods-img" :src="scope.row.url"></el-image>
            <div class="goods-right">
              <div class="goods-name">{{scope.row.title}}</div>
              <div class="goods-type">分类:{{scope.row.type}}</div>
              <div class="goods-date">时间:{{scope.row.date}}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品类型" align="center" prop="type"></el-table-column>
      <el-table-column label="实际销量" align="center" prop="sale"></el-table-column>
      <el-table-column label="商品排序" align="center" prop="order"></el-table-column>
      <el-table-column label="商品状态" align="center" width="120">
        <template slot-scope="scope">
          <el-button type="success" class="status-btn" size="mini" plain @click="scope.row.isCheck === 1">审核通过</el-button>
          <el-button class="status-fail status-btn" type="danger" size="mini" plain @click="scope.row.isCheck === 2">审核不通过</el-button>
          <!-- <el-button :type="scope.row.status ? 'success': 'danger'" size="mini" plain @click="changeStatus(scope.row)">{{scope.row.status ? '上架' : '下架'}}</el-button> -->
        </template>
      </el-table-column>
      <el-table-column label="总库存" align="center" prop="stock"></el-table-column>
      <el-table-column label="价格(元)" align="center" prop="price"></el-table-column>
      <el-table-column label="操作" align="center" prop="id" width="130">
        <template slot-scope="scope">
          <el-button-group class="crud-btn">
            <el-button type="success" size="mini" plain @click="editTableItem(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" plain @click="delTableItem(scope.$index)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-footer class="footer-content">
      <div class="foot-pag">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100,200,300,400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import searchButton from "@/components/common/search-button.vue";
export default {
  components: {
    searchButton,
  },
  data() {
    return {
      activeIndex: 0,
      isShowSearch: false,
      tableData: [],
      currentPage: 1,
      tabsList: [
        {
          name: "全部",
        },
        {
          name: "审核中",
        },
        {
          name: "出售中",
        },
        {
          name: "已下架",
        },
        {
          name: "库存预警",
        },
        {
          name: "回收站",
        },
      ],
      searchForm: {
        name: "",
        category: "",
      },
    };
  },
  created() {
    this.initTableData();
  },
  methods: {
    handleClick(tab, event) {
      let { index } = tab;
      this.activeIndex = index;
    },
    // 搜索事件
    searchEvent(e) {
      // 简单搜索
      if (typeof e === "string") {
        return console.log("简单搜索");
      }
      // 高级搜索
      console.log("高级搜索");
    },
    // 清空搜索条件
    clearSearch() {
      this.searchForm = {
        name: "",
        category: "",
      };
      // 调用子组件点击的收起关闭方法
      this.$refs.searchButton.closeSuperSearch();
    },
    initTableData() {
      for (let i = 0; i < this.tabsList.length; i++) {
        this.tableData.push({
          currentPage: 1,
          list: [],
        });

        for (let j = 0; j < 7; j++) {
          this.tableData[i].list.push({
            id: j,
            title: `荣耀 V10全网通 标配版 4GB+64GB 魅丽红${i}-${j}`,
            url: "http://static.yoshop.xany6.com/2018071718294208f086786.jpg",
            category: "手机",
            date: "2019-07-17 18:34:14",
            type: "普通商品",
            sale: "20",
            order: "100",
            status: 1,
            stock: "200",
            price: "1000",
            isCheck: 1,
          });
        }
      }
    },
    changeStatus(row) {
      row.status = row.status === 1 ? 0 : 1
      console.log(row);
    },
    editTableItem(row) {
      console.log(row);
    },
    delTableItem(index) {
      this.tableData[this.activeIndex].list.splice(index, 1)
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

<style scoped lang="less">
.for-item {
  display: flex;
  align-items: center;
}
.search-select {
  width: 160px;
}

.table-content {
  width: 100%;
  margin: 20px 0 60px 0;
  .goods-info {
    display: flex;
    justify-content: space-around;
    .goods-img {
      width: 100px;
      height: 100px;
    }
    .goods-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: start;
    }
  }
  .status-fail {
    margin-left: 0;
    margin-top: 2px;
  }
  .status-btn {
    width: 80px;
  }
  .crud-btn {
    display: flex;
    justify-content: center;
  }
}

.footer-content {
  display: flex;
  align-items: center; // 基线对齐 分页 垂直居中
  line-height: 60px;
  border-top: 1px solid #ccc;
  position: fixed;
  left: 200px;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 1;
}

.foot-pag {
  line-height: 0px;
}
</style>