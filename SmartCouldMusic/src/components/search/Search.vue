<template>
  <div id="Search">
    <van-search
      v-model="searchValue"
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
    <div v-if="isShowWordCloud">
      <WordCloudChart
        :id="cloudWordId"
        :title="cloudWordTitle"
        :datas="heatSongList"
        :category="cloudWordCategory"
      ></WordCloudChart>
    </div>
    <div v-else>
      <SearchResultIndexBar :searchResultList="searchResultList" :searchValue="searchValue">
      </SearchResultIndexBar>
    </div>
  </div>
</template>

<script>
import WordCloudChart from "@/components/echarts/WordCloudChart";
import SearchResultIndexBar from "@/components/search/SearchResultIndexBar";
export default {
  name: "Search",
  components: { WordCloudChart, SearchResultIndexBar },
  data() {
    return {
      isShowWordCloud: true, // 是否显示
      cloudWordCategory: "wordCloud",
      cloudWordId: "search-cloudword",
      cloudWordTitle: "热搜榜",
      searchValue: "", // 关键词
      heatSongList: [], // 热度词数组
      searchResultList: [], // 搜索结果数组
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
    // 将指定数据集添加到数组中
    appendResultList(array) {
      array.forEach((element) => {
        this.searchResultList.push({
          matchWord: element.keyword, //  匹配唱片
        });
      });
    },
    // 搜索关键词
    onSearch() {
      this.isShowWordCloud = false;
      this.searchResultList = []
      this.$http
        .get("search/suggest?keywords=" + this.searchValue+"&type=mobile")
        .then((res) => {
          if (res.data != null) {
            let matchList = res.data.result.allMatch;
            this.appendResultList(matchList);
          }
        });
    },
  },
  created() {
    // 获取数据
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