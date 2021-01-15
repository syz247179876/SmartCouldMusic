<template>
  <div id="PlayVedio">
    <div class="background">
      <img :src="$route.query.pic">
      <i class="fluctuate"></i>
      <img class="center" src="../../../static/img/disc-ip6.png" />

      <!-- <button @click="startRadio">播放</button> -->
      <video :src="mp3Src" :id="id"></video>
      <div>{{ lyric }}</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "PlayVedio",
  data() {
    return {
      id: "",
      mp3Src: "",
      status: false,
      lyric: "", // 所有歌词
    };
  },
  created() {
    this.id = this.$route.params.id; // 拿去route中的音乐id
  },
  watch: {
    // 一拿到id就发送请求获取mp3
    id() {
      this.requestMusic();
      this.requestMusicText(); // 请求歌词
    },
  },
  methods: {
    // 请求播放音乐接口
    requestMusic() {
      this.$http
        .get("/music-play/song/media/outer/url?id=" + this.id)
        .then((res) => {
          this.mp3Src = res.request.responseURL; // 获取响应的mp3 src
        })
        .catch((err) => {
          console.log("请求错误");
        });
    },
    // 获取歌词
    requestMusicText() {
      this.$http
        .get("/api/lyric?id=" + this.id)
        .then((res) => {
          this.lyric = res.data.lrc.lyric; // 歌词
        })
        .catch((err) => {
          Toast.fail("请求超时,请再次重试");
        });
    },
    // 播放音乐
    startRadio() {
      let vedio = document.getElementById(this.id);
      if (!this.status) {
        vedio.play();
        this.status = true;
      } else {
        vedio.pause();
        this.status = false;
      }
    },
  },
};
</script>

<style scoped>
.background {
  background-color: gray;
  z-index: 995;
  background-size: 100%;
  position: fixed;
}

/* 图片播放处 */
.center {
  margin-top: 80px;
  z-index: 996;
  width: 330px;
  vertical-align: middle;
}

/* 头部摆动 */

.fluctuate {
  background-image: url(../../../static/img/needle-ip6.png);
  z-index: 998 !important;
}
</style>