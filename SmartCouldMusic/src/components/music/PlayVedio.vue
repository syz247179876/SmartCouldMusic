<template>
  <div id="PlayVedio">
    {{ $route.params }}
    <div class="background">
      <img class="center" src="../../../static/img/disc-ip6.png" />
      <button @click="startRadio">播放</button>
      <video :src="mp3Src" class="play-icon" :id="id"></video>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayVedio",
  data() {
    return {
      id: "",
      mp3Src: "",
      status: false,
    };
  },
  created() {
    this.id = this.$route.params.id; // 拿去route中的音乐id
    // this.requestMusic();
  },
  watch: {
    id() {
      this.$http
        .get("/music-play/song/media/outer/url?id=" + this.id)
        .then((res) => {
          this.mp3Src = res.request.responseURL; // 获取响应的mp3 src
        })
        .catch((err) => {
          console.log("请求错误");
        });
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

<style>
.background {
  background-color: gray;
  height: 700px;
  z-index: 995;
}
.center {
  z-index: 996;
  width: 330px;
}
</style>