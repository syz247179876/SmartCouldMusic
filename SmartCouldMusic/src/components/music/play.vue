<template>
  <div class="play">
    <audio
      :src="
        'https://music.163.com/song/media/outer/url?id=' +
        $route.params.id +
        '.mp3'
      "
      ref="audio"
    ></audio>
    <div class="img-div">
      <img
        :class="{ 'play-img': status }"
        src="../../../static/img/needle-ip6.png"
        width="100px"
      />
    </div>
    <div class="cd">
      <img
        v-if="detail.al"
        :class="['midpic', status ? 'cd-animation' : 'cd-stop']"
        :src="detail.al.picUrl"
        width="188px"
        @click="play"
        id="img_cd"
      />
    </div>
    <div class="lrc-div">
      <!-- offsetH滚出页面的高度 -->
      <div
        class="lrc-content"
        :style="{ transform: 'translateY(' + offset + 'px)' }"
      >
        <p v-if="detail.ar">{{ detail.name }}-{{ detail.ar[0].name }}</p>

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
export default {
  data() {
    return {
      finalLrc: {},
      offset: -1,
      nowTime: "00:00",
      lyricDict: {}, // 时间歌词键值对
      lyricList: [], // 存储时间列表
      detail: {},
      currentLyc: 0, // 对应第几句歌词
      status: false,
      lrcHegiht: 11,
    };
  },
  created() {
    this.getLyric(this.$route.params.id);
    this.getDetail(this.$route.params.id);
  },
  methods: {
    // 获取歌词
    getLyric(id) {
      this.$http("api/lyric", { params: { id } })
        .then((res) => {
          let lyric = res.data.lrc.lyric;
          this.transLrc(lyric); // 歌词
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDetail(id) {
      this.$http("api/song/detail", { params: { ids: id } })
        .then((res) => {
          this.detail = res.data.songs[0];
        })
        .catch((err) => {
          console.log(err);
        });
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
    },
    // 计算时间 --> 秒
    computeTime(timeString) {
      let min = timeString.slice(0, 2); // 切出分钟
      let sec = timeString.slice(3, 5); // 切出秒钟
      return parseInt(min) * 60 + parseInt(sec);
    },
    // // 格式化歌词
    // transLrc(lrc) {
    //   let obj = {};
    //   let reg = /\[(.*)](.*)/g;
    //   lrc.replace(reg, (a, b, c) => {
    //     // a是匹配到的内容
    //     // b是时间，精确到秒；是第一个子表达式的内容
    //     b = b.slice(0, 5);
    //     // c是歌词的内容；是第二个子表达式的内容
    //     obj[b] = c;
    //   });
    //   return obj;
    // },

    // 播放/暂停音乐
    play() {
      let oAudio = this.$refs.audio;
      if (!this.status) {
        this.status = true;
        oAudio.play();
        oAudio.ontimeupdate = () => {
          if (parseInt(oAudio.currentTime) in this.lyricDict) {
            this.currentLyc = this.lyricList.indexOf(
              parseInt(oAudio.currentTime)
            );
            this.offset -= this.lrcHegiht;
          }
        };
      } else {
        this.status = false;
        oAudio.pause();
      }
      // if (oAudio.paused) {
      //   oAudio.play();
      //   this.isPlaying = true;
      //   oAudio.ontimeupdate = () => {
      //     // 转换时间格式  100s => 1min40s
      //     this.nowTime = this.tranTime(oAudio.currentTime);
      //     if (this.nowTime in this.finalLrc) {
      //       this.offsetH -= 10;
      //     }
      //   };
      // } else {
      //   oAudio.pause();
      //   this.isPlaying = false;
      // }
    },
    // // 转换时间格式  100s => 1min40s
    // tranTime(time) {
    //   // 分钟
    //   // padStart字符串的方法，补位。第一个参数是总共几位，第二个参数是用什么内容来补
    //   let min = (Math.floor(time / 60) + "").padStart(2, "0");
    //   // 秒数
    //   let sec = (Math.floor(time % 60) + "").padStart(2, "0");
    //   return `${min}:${sec}`;
    // },
    // 播放结束
  },
  watch: {
    currentLyc() {
      console.log(this.currentLyc >= this.lyricList.length - 1);
      if (this.currentLyc >= this.lyricList.length - 1) {
        let img_cd = document.getElementById("img_cd");
        img_cd.classList.remove("cd-animation");
        setInterval(function () {
          this.status = false;
        }, 6000);
      }
    },
  },
};
</script>

<style>
.play {
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
.lrc-div {
  width: 85%;
  height: 200px;
  margin: 60px auto 0;
  padding: 10px;
  overflow: hidden;
}
.lrc-content {
  width: 90%;
  height: 2000px;
  margin: 0 auto;
  color: white;
}
.current {
  color: #66cd00 !important;
}
.cd {
  width: 300px;
  height: 300px;
  background-image: url("../../../static/img/disc-ip6.png");
  background-size: cover;
  margin: 0 auto;
  position: relative;
  top: 40px;
}
.cd-animation {
  animation: 8s animation1 infinite linear;
  transform: rotate(0deg);
}
/* 动画暂停的效果 */
.cd-stop {
  animation: 8s animation1 infinite linear;
  animation-play-state: paused;
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
  margin: auto;
  position: relative;
  top: 57px;
}
.img-div {
  position: relative;
}
.img-div img {
  position: fixed;
  left: 48%;
  top: 0;
  transform: rotate(-15deg);
  transform-origin: 0 0;
  transition: transform 1s linear;
  z-index: 999;
}
/* 播放音乐时触针的动画 */
.img-div img.play-img {
  transform: rotate(0deg);
}

.helight {
  color: aqua;
}
</style>