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
      :datas="heatSongList"
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
      testList: [
        {
          name: "Java",
          value: 2300,
        },
        {
          name: "python",
          value: 2000,
        },
      ],
      cloudWordId: "search-cloudword",
      cloudWordTitle: "热搜榜",
    };
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(document.getElementById("test")); // 获取图表容器
      let option = {
        title: {
          text: this.cloudWordTitle,
          x: "center",
        },
        // backgroundColor: "#fff",
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 10,
            //用来调整字的大小范围
            sizeRange: [14, 60],
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            rotationRange: [0, 0],

            //随机生成字体颜色
            textStyle: {
              normal: {
                color: function () {
                  return (
                    "rgb(" +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ")"
                  );
                },
              },
            },
            //位置相关设置
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "200%",
            height: "200%",
            //数据
            data: this.heatSongList,
          },
        ],
      };

      this.chart.setOption(option, true);
    },
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
    // 获取数据
    this.getKeyword();
  },
  watch:{
    heatSongList(){
      // 数据更新后,在dom渲染后,自动执行该函数
      this.$nextTick(()=>{
        this.initChart()
      })
    }
  }
};
</script>

<style>
/* 搜索栏样式 */
.van-search--show-action {
  padding-right: 60px;
  padding-left: 60px;
}
</style>