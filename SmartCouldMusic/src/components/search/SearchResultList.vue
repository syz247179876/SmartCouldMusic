<template>
  <div id="SearchResultIndexBar">
    <div v-if="hasData">
      <!-- 音乐项 -->
      <van-cell v-for="(music, index) in searchResultList" :key="index">
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
      rank_first: "rank-1",
      rank_second: "rank-2",
      rank_third: "rank-3",
      rank_others: "rank-others",
    };
  },
  watch: {
    // 监听数组,将其中的关键字高亮, 显示是否搜索到数据
    searchResultList() {
      if (this.searchResultList.length > 0) {
        this.hasData = true;
        this.searchResultList.forEach((element) => {
          this.keywordscolorful(this.searchValue, element.matchWord);
          element.matchWord = this.NewTitle;
        });
      } else this.hasData = false;
    },
  },
  methods: {
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