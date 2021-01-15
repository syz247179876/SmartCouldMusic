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
      <SearchResultList
        :searchResultList="searchResultList"
        :searchValue="searchValue"
      >
      </SearchResultList>
    </div>
  </div>
</template>

<script>
import WordCloudChart from "@/components/echarts/WordCloudChart";
import SearchResultList from "@/components/search/SearchResultList";
export default {
  name: "Search",
  components: { WordCloudChart, SearchResultList },
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
        .get("/api/search/hot/detail")
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
    // 将歌曲数据集添加到数组中
    appendSongResultList(array) {
      array.forEach((element) => {
        let picUrl = "";
        if (element.artists[0].picUrl != null)
          picUrl = element.artists[0].picUrl;
        else picUrl = element.artists[0].img1v1Url;
        this.searchResultList.push({
          matchWord: element.name, //  匹配唱片
          id: element.id,
          artistName: this.parseArtistName(element.artists), // 作者名字
          picUrl: picUrl, // 背景图片
        });
      });
    },
    // 将唱片添加到数组中
    appendAlbumsResultList(array) {
      array.forEach((element) => {
        this.searchResultList.push({
          matchWord: element.name, //  匹配唱片
          id: element.id,
          artistName: element.artist.name, // 作者名字
          imageUrl: element.img1v1Url, // 背景图片
        });
      });
    },
    // 解析多作者数组
    parseArtistName(array) {
      let tempArtist = [];
      array.forEach((element) => {
        tempArtist.push(element.name);
      });
      return tempArtist.toString();
    },
    // 搜索关键词
    onSearch() {
      this.isShowWordCloud = false;
      this.searchResultList = [];
      this.$http
        .get("/api/search/suggest?keywords=" + this.searchValue)
        .then((res) => {
          if (res.data != null) {
            // 根据api请求不同的类别
            if (res.data.result.songs != null)
              this.appendSongResultList(res.data.result.songs); // 此处只匹配歌曲
            // else if (res.data.result.albums != null)
            //   this.appendAlbumsResultList(res.data.result.albums);
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