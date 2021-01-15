<template>
  <div id="New">
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item>
        <img :src="coverImgUrl" class="picture" />
      </van-swipe-item>
      <span class="time">更新时间:{{ dateString }}</span>
    </van-swipe>
    <!-- 通用音乐排行列表 -->
    <RankMusicList :musicList="musicList" :status="status"></RankMusicList>
  </div>
</template>

<script>
const RankMusicList = () => import("@/components/music/RankMusicList");
import { Toast } from "vant";
export default {
  name: "New",
  components: { RankMusicList },
  data() {
    return {
      name: "", // 排行榜名字
      updateTime: 0, // 排行榜更新时间
      coverImgUrl: "", // 排行榜图片
      tracks: [], // 通用歌曲榜单数据数组
      id: "2809577409",
      musicList: [], // 歌曲细节数组(已解析)
      status: [], // 播放状态列表, true表示正在播放,false表示未播放
    };
  },
  methods: {
    getNew() {
      this.$http
        .get("/api/top/list?id=" + this.id)
        .then((res) => {
          let playList = res.data.playlist; // 获取数据
          this.name = playList.name; // 排行榜名字
          this.updateTime = playList.updateTime; // 排行榜更新时间
          this.coverImgUrl = playList.coverImgUrl; // 排行榜图片
          this.tracks = playList.tracks; // 歌曲榜单数组
        })
        .catch((err) => {
          Toast.fail("请求超时,请再次重试");
        });
    },
    // 对时间追加0
    add0(element) {
      return element < 10 ? "0" + element : element;
    },
    // 时间戳 --- >String
    dateTrans() {
      let date = new Date(parseInt(this.updateTime));
      let year = date.getFullYear(); // 获取年份
      let month = date.getMonth() + 1; // 获取月份
      let day = date.getDate(); // 获取日期
      this.dateString = year + "-" + this.add0(month) + "-" + this.add0(day);
    },
    // 解析歌曲细节
  },
  created() {
    // 获取欧美新歌榜
    this.getNew();
    // timestamp ---> String
    this.dateTrans();
  },
  watch: {
    // 监听数据的改变
    tracks() {
      this.tracks.forEach((element) => {
        this.musicList.push({
          name: element.name, // 歌曲名
          id: element.id, // 歌曲id
          artists: element.ar, // 作者们的信息
          publishTime: element.publishTime, // 发布时间
          picUrl:element.al.picUrl,     // 歌曲图片
        });
        this.status.push(false);
      });
    },
  },
};
</script>

<style scoped>
.picture {
  width: 100%;
  height: 280px;
  z-index: 965;
}
.time {
  position: absolute;
  z-index: 996;
  left: 100px;
  bottom: 40px;
  color: wheat;
}
</style>