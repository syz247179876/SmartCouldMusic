<template>
  <div id="WordCloudChart">
    <div
      :id="id"
      :class="className"
      :style="{ height: height, width: width }"
    ></div>
  </div>
</template>

<script>
import "echarts-wordcloud/dist/echarts-wordcloud";  // 1.1.3

export default {
  name: "WordCloudChart",
  // 映射,字典结构
  props: {
    className: {
      type: String,
      default: "chart",
    },
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "400px",
    },
    data: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: "图表",
    },
    category: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  methods: {
    // 初始化图表
    initChart() {
      this.chart = this.$echarts.init(document.getElementById(this.id)); // 获取图表容器
      const option = {
        title: {
          text: this.title,
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
            data: this.data,
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
  mounted() {
    // 模板渲染程html后调用
    this.initChart();
  },
  beforeDestroy() {
    // 在销毁组件前销毁图表
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
};
</script>

<style>
</style>