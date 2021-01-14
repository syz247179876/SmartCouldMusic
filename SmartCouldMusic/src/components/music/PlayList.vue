<template>
  <div id="PlayList">
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item>
        <div
          class="background"
          :style="{
            backgroundImage: 'url(' + coverImgUrl + ')',
          }"
        >
          <img :src="coverImgUrl" class="picture" />
          <span class="describe">{{ describe }}</span>
        </div>
      </van-swipe-item>
    </van-swipe>

    <!-- 通用音乐排行列表 -->
    <RankMusicList :musicList="musicList" :status="status"></RankMusicList>
  </div>
</template>
<script>
const RankMusicList = () => import("@/components/music/RankMusicList");
export default {
  name: "PlayList",
  components: { RankMusicList },
  data() {
    return {
      id: "", // 歌单id
      musicList: [], // 歌单信息列表
      coverImgUrl: "", // 歌单图片
      displayList: [],
      status: [],
      describe: "", // 歌单介绍
    };
  },
  created() {
    this.id = this.$route.params.id; // 设置歌单id
    this.requestPlayList();
  },
  watch: {
    coverImgUrl() {
      console.log(this.coverImgUrl);
    },
  },
  methods: {
    // 请求歌单id
    requestPlayList() {
      this.$http
        .get("/api/playlist/detail?id=" + this.id)
        .then((res) => {
          let playList = res.data.playlist;
          let tracks = playList.tracks; // 歌单列表
          this.describe = playList.name; // 歌单介绍
          this.coverImgUrl = playList.coverImgUrl; // 歌单图片
          tracks.forEach((element) => {
            let artists = element.ar; // 歌手名数组
            let id = element.id; // 歌曲id
            let name = element.name; // 歌曲名
            this.musicList.push({
              artists: artists,
              id: id,
              name: name,
            });
            this.status.push(false);
          });
        })
        .catch((err) => {});
    },
  },
};
</script>

<style>
.picture {
  width: 150px;
  z-index: 965;
  left: 20px;
  right: 200px;
  opacity: 1 !important;
  top:20px;
  margin:40px 0px 40px 20px;
}
.describe {
  float: right;
  margin:50px 40px 40px 20px;
  color: white;
  opacity: 1 !important;
  z-index: 997;
}
.background {
  background-position-y: "-349px";
  opacity: 0.8;
  height: 250px;
}
</style>