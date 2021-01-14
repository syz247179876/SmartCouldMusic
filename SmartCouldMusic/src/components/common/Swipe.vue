<template>
  <div id="Swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="(swipe, index) in swipeList"
        :key="index"
        @click="accessDetail(swipe)"
      >
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
      swipeNumber: 5, // 轮播图最大个数
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
            let songId = banners[i].song.id;
            this.swipeList.push({
              pic: pic,
              bannerId: bannerId,
              songId: songId,
            });
          }
        })
        // 失败的回调
        .catch((err) => {
          // Toast.err(res.data);
        });
    },
    // 计算取数据的区间
    computeRetrieve() {
      // this.rand = Math.ceil(Math.random() * 2); // 生成0-3之间的随机数
      // this.start = this.rand; // 生成随机start
      this.start = 0;
      this.end = this.start + this.swipeNumber;
    },
    // 进入详情页
    accessDetail(swipe) {
      this.$router.push(
        "/api/detail?pic=" +
          swipe.pic +
          "&bid=" +
          swipe.bannerId +
          "&sid=" +
          swipe.songId
      );
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