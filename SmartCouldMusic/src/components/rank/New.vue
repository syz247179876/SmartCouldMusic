<template>
  <div id="New">
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item>
        <img :src="coverImgUrl" class="picture" />
        
      </van-swipe-item>
      <span class="time">更新时间:2020-1-10</span>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "New",
  data() {
    return {
      name: "", // 排行榜名字
      updateTime: "", // 排行榜更新时间
      coverImgUrl: "", // 排行榜图片
      tracks: [], // 歌曲榜单数组
      id: "2809577409",
    };
  },
  methods: {
    getNew() {
      this.$http
        .get("/top/list?id=" + this.id)
        .then((res) => {
          let playList = res.data.playlist; // 获取数据
          this.name = playList.name; // 排行榜名字
          this.updateTime = playList.updateTime; // 排行榜更新时间
          this.coverImgUrl = playList.coverImgUrl; // 排行榜图片
          this.tracks = playList.tracks; // 歌曲榜单数组
        })
        .catch((err) => {});
    },
    dateTrans(){
        
    }
  },
  created() {
    // 获取欧美新歌榜
    this.getNew();
  },
};
</script>

<style scoped>
.picture {
  width: 100%;
  height: 280px;
  z-index: 965;
}
.time{
    position:absolute;
    z-index: 996;
    left: 100px;
    bottom: 40px;
    color: wheat;
}
</style>