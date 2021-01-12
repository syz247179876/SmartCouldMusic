<template>
  <div id="Lastest">
    <p>最新音乐</p>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(music, index) in musicList"
        :key="index"
        :title="music.title"
      />
    </van-list>
  </div>
</template>

<script>
export default {
  name: "Lastest",
  data() {
    return {
      musicList: [],
      finished: false,
      loading: false,
      perLength: 10, // 每次请求获取的数据长度
    };
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
      });
    },
  },
  created() {
    this.$http
      .get("http://localhost:3000/personalized/newsong")
      .then((res) => {
        let result = res.data.result; // 数据列表
      })
      .catch((err) => {});
  },
};
</script>

<style>
</style>