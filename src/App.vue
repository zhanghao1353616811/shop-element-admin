<template>
  <div id="app">
    <router-view></router-view>
    <image-dialog ref="imgDialog" :imageMax="choosImgMax"></image-dialog>
  </div>
</template>

<script>
import imageDialog from "@/components/image/image-dialog.vue";
export default {
  name: "app",
  provide() {
    return {
      app: this,
    };
  },
  components: {
    imageDialog,
  },
  data() {
    return {
      choosImgMax: 0,
    };
  },
  methods: {
    chooseImg(callBack, max = 9) {
      this.choosImgMax = max;
      this.$refs.imgDialog.chooseImg(callBack);
    },
  },
};
</script>

<style>
/* 全局滚动条样式 */
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
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
  background: rgba(0, 0, 0, 0.25);
  transition: color 0.2s ease;
}
</style>