<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "app",
    components: {},
  };
</script>

<style>
  /* 实现elementui的el-container布满全屏 =>  找到html标签、body标签，和挂载的app都给他们统一设置样式 */
  .el-container,
  html,
  body,
  #app {
    padding: 0px;
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  }

  /* 滚动条样式 */
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, .1);
    border-radius: 0;
  }

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    cursor: pointer;
    border-radius: 5px;
    background: rgba(0, 0, 0, .25);
    transition: color .2s ease;
  }
</style>