<template>
  <div id="Heat">
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item>
        <img src="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Heat",
  data(){
    return {
      heatSongList:[]
    }
  },
  components: {},
  methods: {
    getHeat() {
      
    },
  },
  created() {
    // 获取热搜榜
    this.getHeat();
  },
};
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 250px;
  text-align: center;
  background-color: #39a9ed;
}
</style>