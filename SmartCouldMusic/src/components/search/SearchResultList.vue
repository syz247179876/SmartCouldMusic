<template>
  <div id="SearchResultIndexBar">
    <div v-if="hasData">
      <!-- 音乐项 -->
      <van-cell
        v-for="(music, index) in searchResultList"
        :key="index"
        @click="toPlayVedio(music.id, music.picUrl)"
      >
        <template #default>
          <span
            :class="[
              { 'rank-first': index == 0 },
              { 'rank-second': index == 1 },
              { 'rank-third': index == 2 },
              { 'rank-others': index > 2 },
            ]"
            >{{ index + 1 }}</span
          >
          <span class="song-name" v-html="music.matchWord">
            {{ music.matchWord }}
            <!-- 播放图标 -->
          </span>
          <p class="artist">
            {{ music.artistName }}
          </p>
        </template>
      </van-cell>
    </div>
    <div v-else>正在搜索...抱歉,没有搜索到任何数据</div>
  </div>
</template>

<script>
export default {
  name: "SearchResultIndexBar",
  data() {
    return {
      NewTitle: "",
      hasData: true,
    };
  },
  watch: {
    // 监听数组,将其中的关键字高亮, 显示是否搜索到数据
    searchResultList() {
      if (this.searchResultList.length > 0) {
        // 如果存在数据
        this.hasData = true;
        this.searchResultList.forEach((element) => {
          this.keywordscolorful(this.searchValue, element.matchWord); // 标红关键字
          element.matchWord = this.NewTitle;
        });
      } else this.hasData = false;
    },
  },
  methods: {
    // 进入歌曲详情界面
    toPlayVedio(id, picUrl) {
      this.$router.push("/vedio-play/" + id + "?pic=" + picUrl);
    },
    // 匹配最长公共字串
    keywordscolorful(keyword, title) {
      var keywords = keyword
        .replace(/\+/g, "")
        .replace("$kw:", "")
        .replace(/\d+/g, "")
        .trim()
        .split(" ");
      let re = "";
      for (let i = 0; i < keywords.length; i++) {
        if (i == keywords.length - 1) {
          if (keywords[i].length > 0) {
            re += keywords[i];
          }
        } else {
          if (keywords[i].length > 0) {
            re += keywords[i] + "|";
          }
        }
        //利用RegExp动态生成正则表示式
        let r = new RegExp(keywords[i], "ig");
        //用title与其对比
        if (r.test(title)) {
          if (keywords[i].length > 0) {
            title = title.replace(
              r,
              "<font color='red'>" + keywords[i] + "</font>"
            );
          }
          this.NewTitle = title; //得到标红的新标题
        } else {
          this.NewTitle = title;
        }
      }
    },
  },
  props: ["searchResultList", "searchValue"],
};
</script>

<style scoped>
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
.rank-first {
  color: red;
  font-size: 35px;
  font-weight: bolder;
}
.rank-second {
  color: orangered;
  font-size: 30px;
}
.rank-third {
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

.sq-icon {
  display: inline-block;
  width: 20px;
  height: 10px;
  background-image: url("../../../static/img/index_icon_2x.png");
  background-position-x: -3px;
  background-position-y: -3px;
}
</style>