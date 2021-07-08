<template>
  <div class="index-page">
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in totalList" :key="item.id">
        <el-card shadow="hover">
          <div class="card-item" style="background-color: #fff">
            <div :class="[item.icon, 'icon-font']" :style="{'background-color' : item.color}"></div>
            <div class="desc-right">
              <div class="item-num">{{item.num}}</div>
              <div class="item-desc">{{item.desc}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="middle-card" :gutter="20">
      <el-col :span="12">
        <el-card class="card-top" v-for="item in proOrderList" :key="item.id">
          <div class="card-header" slot="header">
            <span>{{item.tips}}</span>
            <el-button type="text">{{item.title}}</el-button>
          </div>
          <div class="car-item">
            <el-button class="flex-width" type="info" plain v-for="item in item.descList" :key="item.id">
              <div class="tips-num">{{item.num}}</div>
              <div class="tips-title">{{item.desc}}</div>
            </el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div ref="myChart" class="echart-container"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="table-content">
      <el-col :span="12">
        <el-card>
          <div class="card-header" slot="header">
            <span>销售情况统计</span>
            <el-button type="text">按周期统计商家店铺的订单量和订单金额</el-button>
          </div>
          <div v-for="item in saleList" :key="item.id">
            <div class="sale-box">
              <div class="sale-bgc">{{item.title}}</div>
              <div class="sale-right">
                <div class="sale-line">订单金额(元)&nbsp;{{item.orderMoney}}</div>
                <div class="sale-order">订单量(件)&nbsp;{{item.oderNum}}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div class="card-header" slot="header">
            <span>单品销售排名</span>
            <el-button type="text">按周期统计商家店铺的订单量和订单金额</el-button>
          </div>
          <el-table :data="tableData" border height="185" style="width: 100%">
            <el-table-column type="index" label="#" width="100" align="center"></el-table-column>
            <el-table-column prop="goodsInfo" label="商品信息" align="center"></el-table-column>
            <el-table-column prop="saleNum" label="销量" width="120" align="center"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Index",
  data() {
    return {
      totalList: [
        {
          id: 0,
          num: "30",
          desc: "关注人数(个)",
          color: "#409EFF",
          icon: "el-icon-user-solid",
        },
        {
          id: 1,
          num: "120",
          desc: "订单总数(笔)",
          color: "#28a745",
          icon: "el-icon-s-finance",
        },
        {
          id: 2,
          num: "4183.80",
          desc: "今日订单总金额(元)",
          color: "#dc3545",
          icon: "el-icon-s-order",
        },
        {
          id: 3,
          num: "100",
          desc: "本月销量(笔)",
          color: "#ffc107",
          icon: "el-icon-s-data",
        },
      ],
      proOrderList: [
        {
          id: 0,
          tips: "店铺及商品提示",
          title: "需要关注的店铺信息及待处理事项",
          descList: [
            {
              id: 0,
              num: 64,
              desc: "出售中",
            },
            {
              id: 1,
              num: 10,
              desc: "待回复",
            },
            {
              id: 2,
              num: 0,
              desc: "库存预警",
            },
            {
              id: 3,
              num: 3,
              desc: "仓库中",
            },
          ],
        },
        {
          id: 1,
          tips: "交易提示",
          title: "需要立即处理的交易订单",
          descList: [
            {
              id: 0,
              num: 0,
              desc: "待付款",
            },
            {
              id: 1,
              num: 10,
              desc: "待发货",
            },
            {
              id: 2,
              num: 0,
              desc: "已发货",
            },
            {
              id: 3,
              num: 3,
              desc: "已收货",
            },
            {
              id: 4,
              num: 3,
              desc: "退款中",
            },
            {
              id: 5,
              num: 3,
              desc: "待售后",
            },
          ],
        },
      ],
      saleList: [
        {
          id: 0,
          title: "昨日销量",
          orderMoney: "12",
          oderNum: "12",
        },
        {
          id: 1,
          title: "本月销量",
          orderMoney: "12",
          oderNum: "12",
        },
      ],
      tableData: [
        {
          goodsInfo: "小天鹅（LittleSwan）滚筒洗衣机...",
          saleNum: "9",
        },
        {
          goodsInfo: "小天鹅（LittleSwan）滚筒洗衣机...",
          saleNum: "9",
        },
        {
          goodsInfo: "小天鹅（LittleSwan）滚筒洗衣机...",
          saleNum: "9",
        },
        {
          goodsInfo: "小天鹅（LittleSwan）滚筒洗衣机...",
          saleNum: "9",
        },
        {
          goodsInfo: "小天鹅（LittleSwan）滚筒洗衣机...",
          saleNum: "9",
        },
        {
          goodsInfo: "小天鹅（LittleSwan）滚筒洗衣机...",
          saleNum: "9",
        },
      ],
      option: {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
    };
  },

  // dom渲染完毕
  mounted() {
    // 画统计图
    this.drawLine();
  },

  methods: {
    drawLine() {
      let myChart = echarts.init(this.$refs.myChart);
      myChart.setOption(this.option);
    },
  },
};
</script>

<style scoped>
.index-page {
  padding-bottom: 60px;
}
.card-item {
  padding: 5px;
  display: flex;
  align-items: center;
}

.icon-font {
  width: 40px;
  height: 40px;
  color: #fff;
  font-size: 25px;
  text-align: center;
  line-height: 40px;
}

.desc-right {
  margin-left: 20px;
}

.item-num {
  font-size: 22px;
  font-weight: 700;
}

.item-desc {
  color: #6c757d;
  font-size: 14px;
}

.middle-card {
  margin: 20px 0;
}

.card-top {
  margin-bottom: 20px;
}

.card-header {
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.car-item {
  display: flex;
}

.flex-width {
  flex: 1;
}

.tips-num {
  font-size: 24px;
  margin-bottom: 10px;
}

.tips-title {
  font-size: 12px;
}

.echart-container {
  width: 100%;
  height: 340px;
}

.table-content {
  margin-top: -20px;
}

.sale-box {
  display: flex;
  align-items: center;
  border: 1px solid #ebeef5;
  margin-bottom: 10px;
}

.sale-bgc {
  width: 120px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  background-color: #ebeef5;
}

.sale-right {
  width: 100%;
}

.sale-line {
  padding-left: 15px;
  line-height: 40px;
  border-bottom: 1px solid #ebeef5;
}

.sale-order {
  padding-left: 15px;
  line-height: 40px;
}
</style>