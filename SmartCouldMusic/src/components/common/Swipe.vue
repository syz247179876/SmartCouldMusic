<template>
  <div id="Swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(swipe, index) in swipeList" :key="index">
        <img :src="swipe.pic" :class="picture" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Swipe",
  data() {
    return {
      swipeNumber: 8, // 轮播图最大个数
      swipeList: [], // 轮播图列表
      picture: "picture",
    };
  },
  methods: {
    getSwipe() {
      this.$http
        .get("http://localhost:3000/banner/?type=2")
        // 成功回调
        .then((res) => {
          let banners = res.data.banners;
          for (let i = 0; i < this.swipeNumber; i++) {
            let pic = banners[i].pic; // picture的路径
            let url = banners[i].pic; // 跳转路由
            this.swipeList.push({ pic: pic, url: url });
          }
        })
        // 失败的回调
        .catch((err) => {
          // Toast.err(res.data);
        });
    },
  },
  created() {
    // 请求获取轮播图
    this.getSwipe();
  },
};
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  text-align: center;
}
.picture {
  height: 220px;
}
</style>