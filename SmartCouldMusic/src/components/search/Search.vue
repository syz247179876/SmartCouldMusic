<template>
  <div id="Search">
    <van-search
      v-model="search_value"
      placeholder="请输入搜索关键词"
      input-align="center"
      shape="round"
      maxlength="30"
      show-action
      ><template #action>
        <div @click="onSearch">搜索</div>
      </template></van-search
    >
    <!-- 热词云图 -->
    <WordCloudChart
      :id="cloudWordId"
      :title="cloudWordTitle"
      :data="heatSongList"
      :category="cloudWordCategory"
    ></WordCloudChart>
  </div>
</template>

<script>
import WordCloudChart from "@/components/echarts/WordCloudChart";
export default {
  name: "Search",
  components: { WordCloudChart },
  data() {
    return {
      cloudWordCategory: "wordCloud",
      search_value: "",
      heatSongList: [],
      cloudWordId: "search-cloudword",
      cloudWordTitle: "热搜榜",
    };
  },
  methods: {
    // 获取搜索关键词
    getKeyword() {
      this.$http
        .get("/search/hot/detail")
        .then((res) => {
          let data = res.data.data; // 结果集
          data.forEach((element) => {
            this.heatSongList.push({
              name: element.searchWord,
              value: element.score,
            });
          });
        })
        .catch((err) => {});
    },
    // 搜索关键词
    onSearch() {},
  },

  created() {
    this.getKeyword();
  },
};
</script>

<style>
/* 搜索栏样式 */
.van-search--show-action {
  padding-right: 60px;
  padding-left: 60px;
}
</style>