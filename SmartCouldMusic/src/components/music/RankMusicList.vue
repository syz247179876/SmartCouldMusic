<template>
  <div id="RankMusicList">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :finished_text="finished_text"
      @load="onLoad"
    >
      <!-- 音乐项 -->
      <van-cell v-for="(music, index) in displayList" :key="index">
        <template #default>
          <span v-if="index === 0">
            <span :class="rank_first">{{ index + 1 }}</span>
          </span>
          <span v-if="index === 1">
            <span :class="rank_second">{{ index + 1 }}</span>
          </span>
          <span v-if="index === 2">
            <span :class="rank_third">{{ index + 1 }}</span>
          </span>
          <span v-if="index > 2">
            <span :class="rank_others">{{ index + 1 }}</span>
          </span>
          <span class="song-name">
            {{ music.name }}
            <!-- 播放图标 -->
            <video
              :src="mp3Src"
              class="play-icon"
              :id="index"
              @click="startRadio(music, index)"
            ></video>
          </span>
          <p class="artist">
            {{ artistStringList[index] }}
          </p>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "RankMusicList",
  data() {
    return {
      finished_text: "正在拼命加载...",
      finished: false,
      loading: false,
      rank_first: "rank-1",
      rank_second: "rank-2",
      rank_third: "rank-3",
      rank_others: "rank-others",
      artistStringList: [], // 作者集数组,存放每一首歌曲的作者们
      displayList: [], // 允许显示的
      maxLength: 0,
      mp3Src: "",
      playStatus: false,
      videos: null, //空video
    };
  },
  props: ["musicList", "status"],
  created() {
    // this.parseArtist();  // 这里异步的可能来不及获取到数据
  },
  watch: {
    // 当数据传递过来时再解析
    musicList() {
      this.parseArtist();
    },
  },
  methods: {
    // 流加载, 类似动态规划思想
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.displayList = [];
          this.refreshing = false;
        }
        let startIndex = this.displayList.length;
        for (let i = startIndex; i < startIndex + 10; i++) {
          this.displayList.push(this.musicList[i]);
        }

        this.loading = false; // 暂停刷新

        if (this.displayList.length >= this.maxLength) this.finished = true; // 完成刷新
      }, 1000);
    },
    // 解析作者
    parseArtist() {
      this.musicList.forEach((element) => {
        let artistList = [];
        element.artists.forEach((element) => {
          artistList.push(element.name);
        });
        console;
        this.artistStringList.push(artistList.toString());
      });
      this.maxLength = this.musicList.length;
    },
    // 播放音乐, 动态修改图标
    startRadio(music, index) {
      let video = document.getElementById(index); // 获取播放dom元素
      if (this.status[index] == false) {
        for (let i = 0; i < this.displayList.length; i++) {
          // 停止所有的歌曲
          this.status[i] = false;
          document.getElementById(i).style.backgroundPositionY = "4px"; // 改变图标
          video.pause(); // 暂停播放
        }
        video.style.backgroundPositionY = "-46px"; // 切换播放图标
        this.status[index] = true; // 设置正在播放
        this.requestMusic(this.musicList[index].id, video, this.status[index]); // 播放音乐
      } else {
        video.style.backgroundPositionY = "4px";
        this.status[index] = false; // 设置停止播放
        this.requestMusic(this.musicList[index].id, video, this.status[index]); // 暂停音乐
      }
    },
    // 请求播放音乐接口
    requestMusic(id, video, status) {
      if (status == true) {
        this.$http
          .get("/music-play/song/media/outer/url?id=" + id)
          .then((res) => {
            console.log(video)
            this.mp3Src = res.request.responseURL; // 获取响应的mp3 src
            video.play(); // 播放
          })
          .catch((err) => {});
      } else {
        video.pause(); // 暂停播放
      }
    },
  },
};
</script>

<style>
.artist {
  font-size: 20px;
  color: #989588;
}
.van-cell {
  padding: 30px;
  font-size: 25px;
}
.song-name {
  margin-left: 10px;
}

/* 排名高亮等级 */
.rank-1 {
  color: red;
  font-size: 35px;
  font-weight: bolder;
}
.rank-2 {
  color: orangered;
  font-size: 30px;
}
.rank-3 {
  color: orange;
  font-size: 25px;
}
.rank-others {
  color: black;
  font-size: 20px;
}

.play-icon {
  float: right;
  display: inline-block;
  width: 50px;
  height: 50px;
  background-image: url(../../../static/img/list_sprite.png);
  background-position-x: -47px;
  background-position-y: 4px;
}
</style>