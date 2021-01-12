<template>
  <div id="LastestMusic">
    <Title :name="title"></Title>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :finished_text="finished_text"
      @load="onLoad"
    >
      <!-- 音乐项 -->
      <van-cell v-for="(music, index) in displayList" :key="index">
        <template #default>
          <p>{{ music.songName }}</p>
          <van-icon name="cart-o" color="#ee0a24" />
          <span class="artist">{{ music.artistName }}-{{ music.songName }}</span>
          <hr class="hr">
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
const Title = () => import("@/components/common/Title");

export default {
  name: "LastestMusic",
  components: { Title },
  data() {
    return {
      title: "最新音乐",
      finished_text: "正在拼命加载...",
      musicList: [],
      finished: false,
      loading: false,
      perLength: 10, // 每次显示获取的数据长度
      startLength: 0, // 起始请求下标
      maxLength: 100,
      displayList: [],
    };
  },
  methods: {
    onLoad() {
      setTimeout(() => {

        if (this.refreshing) {
          this.displayList = [];
          this.refreshing = false;
        }
        let startIndex = this.displayList.length;
        for (let i = startIndex; i < startIndex + 10; i++) {
          this.displayList.push(this.musicList[i]);
        }

        this.loading = false;

        if (this.displayList.length >= this.maxLength) this.finished = true;
      }, 1000);
    },
    perRequest() {
      // 懒加载请求
      this.$http
        .get("/mv/first?limit=" + this.maxLength)
        .then((res) => {
          let data = res.data.data; // 数据列表
          for (let i = 0; i < this.maxLength; i++) {
            this.musicList.push({
              id: data[i].id, // 歌曲id
              songName: data[i].name, // 歌曲名
              artistName: data[i].artistName, // 歌曲作者
            });
          }
        })
        .catch((err) => {});
    },
  },
  created() {
    this.perRequest();
  },
};
</script>

<style>
.van-cell {
  text-align: left;
  margin-top: -10px;
  margin-bottom: 1px;
  font-size: 20px;
}
.artist {
  font-size: 15px;
}
.hr{
  border-color: papayawhip;
}
</style>