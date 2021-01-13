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
      <van-cell v-for="(music, index) in musicList" :key="index">
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

            <!-- <i
              class="play-icon"
              :id="index"
              @click="startRadio(music, index)"
            ></i> -->
          </span>
          <p class="artist"></p>

          <!-- <i class="sq-icon"></i> -->
          <!-- <span class="artist"
            >{{ music.artistName }}-{{ music.songName }}</span
          > -->
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
      artistString: "", // 作者集String
    };
  },
  props: ["musicList"],
  created(){
      console.log(this.musicList)
      this.parseArtist()
  },
//   watch: {
//     // 当数据传递过来时解析
//     musicList() {
//       this.parseArtist();
//     },
//   },
  methods: {
    onLoad() {},
    // 解析作者
    parseArtist() {
      let artistList = [];
      console.log(this.musicList.artists)
      this.musicList.artists.forEach((element) => {
        artistList.push(element.name);
      });
      console.log(2312321)
      console.log(artistList);
      this.artistString = artistList.join("-");
      console.log(this.artistString);
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
</style>