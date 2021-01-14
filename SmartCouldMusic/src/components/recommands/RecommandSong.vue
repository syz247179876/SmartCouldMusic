<template>
  <div id="RecommandSong">
    <Title :name="title"></Title>
    <van-grid :column-num="3">
      <van-grid-item
        v-for="(item, index) in RecommandSongList"
        :key="index"
        :to="item.detail_url"
      >
        <div>
          <van-image :src="item.picture_url" />
          <p :class="introduce">{{ item.text }}</p>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
const Title = () => import("@/components/common/Title");
export default {
  name: "RecommandSong",
  components: { Title },
  data() {
    return {
      title_style: "title-style",
      title: "推荐歌单",
      RecommandSongList: [],
      introduce: "introduce",
      limit: 6,
    };
  },
  created() {
    this.rand = Math.ceil(Math.random() * 6); // 生成0-10之间的随机数
    this.start = this.rand * Math.ceil(this.rand / 2); // 生成随机start
    this.end = this.start + this.limit;
    this.getSong();
  },
  methods: {
    // 获取推荐歌单
    getSong() {
      this.$http
        .get("/api/personalized?limit=" + this.rand * 10)
        .then((res) => {
          let result = res.data.result; // 获取结果列表
          for (let i = this.start; i < this.end; i++) {
            let name = result[i].name; // 获取歌单介绍
            let picUrl = result[i].picUrl; // 获取歌单图片
            this.RecommandSongList.push({ text: name, picture_url: picUrl }); // 加入队列
          }
        })
        .catch((err) => {
          // Toast.err(res.data);
        });
    },
  },
};
</script>

<style>
.introduce {
  font-size: 16px;
  margin:0;
  display: -webkit-box;
  -webkit-line-clamp: 2;   /* 两行 */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;/* 省略号 */
  overflow: hidden;  /* 隐藏额外内容 */
}

</style>