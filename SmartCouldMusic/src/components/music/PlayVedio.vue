<template>
  <div id="PlayVedio">
    <button class="back" @click="onBack">返回</button>

    <div class="cd">
      <div>
        <img
          :class="[
            'midpic',
            { 'cd-animation1': status },
            { 'cd-stop1': !status },
          ]"
          :src="$route.query.pic"
          width="188px"
        />
        <video
          :src="mp3Src"
          :id="id"
          class="play-icon"
          @click="startRadio"
        ></video>
      </div>
    </div>
    <div class="lrc-div">
      <div
        class="lrc-content"
        :style="{ transform: 'translateY(' + offset + 'px)' }"
      >
        <p>歌手名-作者名</p>
        <p v-for="(item, index) in lyricDict" :key="index">
          <span :class="[{ helight: index == lyricList[currentLyc] }]">
            {{ item }}
          </span>
        </p>
      </div>
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
      lyricDict: {}, // 时间歌词键值对
      lyricList: [], // 存储时间列表
      offset: -1,
      lrcHegiht: 10,
      currentLyc: 0, // 对应第几句歌词
    };
  },
  created() {
    this.id = this.$route.params.id; // 拿去route中的音乐id
  },
  watch: {
    // 一拿到id就发送请求获取mp3
    id() {
      this.requestMusicText(); // 请求歌词
      this.requestMusic();
    },
  },
  methods: {
    // 回到上一页
    onBack() {
      this.$router.push(this.$route.query.next);
    },
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
          this.transLrc(res.data.lrc.lyric); // 歌词
        })
        .catch((err) => {
          Toast.fail("请求超时,请再次重试");
        });
    },
    // 播放/暂停音乐+状态切换
    startRadio() {
      let vedio = document.getElementById(this.id);
      // let video = this.$refs.video;
      if (!this.status) {
        this.status = true;
        this.transState(vedio); // 切换状态
        vedio.play();
        vedio.ontimeupdate = () => {
          if (parseInt(vedio.currentTime) in this.lyricDict) {
            this.currentLyc = this.lyricList.indexOf(
              parseInt(vedio.currentTime)
            );
            this.offset -= this.lrcHegiht;
          }
        };
      } else {
        this.status = false;
        this.transState(vedio); // 切换状态
        vedio.pause();
      }
    },
    // 将字符串转为字典
    transLrc(lyric) {
      let regex = /\[(.*)](.*)/g;
      lyric.replace(regex, (whole, first, second) => {
        // {time: lrc}  时间:歌词键值对
        first = this.computeTime(first.slice(0, 5));
        this.lyricDict[first] = second;
        this.lyricList.push(first);
      });
      console.log(this.lyricDict);
    },
    // 计算时间 --> 秒
    computeTime(timeString) {
      let min = timeString.slice(0, 2); // 切出分钟
      let sec = timeString.slice(3, 5); // 切出秒钟
      return parseInt(min) * 60 + parseInt(sec);
    },
    // // 请求歌单详细信息
    // requestSongDetail() {
    //   this.$http
    //     .get("/api/song/detail" + this.id)
    //     .then((res) => {
    //       // 获取数据
    //     })
    //     .catch((res) => {
    //       Toast.fail("请求歌曲详细信息失败");
    //     });
    // },

    // 切换播放按钮状态
    transState(vedio) {
      if (this.status) vedio.style.backgroundPositionY = "-46px";
      // 改变图标
      else vedio.style.backgroundPositionY = "4px";
    },
  },
};
</script>

<style scoped>
/* 回到上一页 */
/* html {
  background-color: grey;
} */
#PlayVedio {
  height: 100vh;
  background-color: grey;
}
.back {
  float: left;
  margin: 5px 0px 0px 5px;
}

.lrc-div {
  width: 85%;
  height: 450px;
  padding: 10px;
  overflow: hidden; /* 超出部分隐藏 */
  margin: 0 auto;
}
.lrc-content {
  width: 90%;
  height: 2000px;
  margin: 0 auto;
  color: white;
  transform: translateY(0px); /* 水平转换 */
}
.cd {
  width: 300px;
  height: 300px;
  background-image: url("../../../static/img/disc-ip6.png");
  background-size: cover;
  margin: 0 auto;
}

/* 线性动画 */
.cd-animation1 {
  animation: 8s animation1 infinite linear; /* 线性动画*/
  transform: rotate(0deg);
}

/* 动画暂停 */
.cd-stop1 {
  animation: 8s animation1 infinite linear;
  animation-play-state: paused; /* 暂停 */
}

@keyframes animation1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.midpic {
  display: block;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  top: 55px;
}

/* 高亮当前句子 */

.helight {
  color: aqua;
}

/* 播放按钮 */
.play-icon {
  position: relative;
  display: block;
  margin: 0 auto;
  top: -66px;
  width: 49px;
  height: 51px;
  background-image: url("../../../static/img/list_sprite.png");
  background-position-x: -47px;
  background-position-y: 4px;
}
</style>