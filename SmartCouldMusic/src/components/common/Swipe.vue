<template>
  <div id="Swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="(swipe, index) in swipeList"
        :key="index"
        @click="accessDetail(swipe.url)"
      >
        <img :src="swipe.pic" :class="picture" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Swipe",
  data() {
    return {
      swipeNumber: 6, // 轮播图最大个数
      swipeList: [], // 轮播图列表HelloWorld
      picture: "picture",
    };
  },
  methods: {
    // 请求API
    getSwipe() {
      this.$http
        .get("/api/banner/?type=2")
        // 成功回调
        .then((res) => {
          let banners = res.data.banners;
          for (let i = this.start; i < this.end; i++) {
            let pic = banners[i].pic; // picture的路径
            let bannerId = banners[i].bannerId; // banner的uid
            let url = banners[i].url;
            this.swipeList.push({
              pic: pic,
              bannerId: bannerId,
              url: url,
            });
          }
        })
        // 失败的回调
        .catch((err) => {
          Toast.fail("轮播图请求超时,请再次重试");
        });
    },
    // 计算取数据的区间
    computeRetrieve() {
      // this.rand = Math.ceil(Math.random() * 2); // 生成0-3之间的随机数
      // this.start = this.rand; // 生成随机start
      this.start = 0;
      this.end = this.start + this.swipeNumber;
    },
    // 进入给定地址
    accessDetail(url) {
      window.location.href = url
    },
  },
  created() {
    // 请求获取轮播图
    this.computeRetrieve();
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