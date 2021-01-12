<template>
  <div id="Recommand">
    <p>推荐歌单</p>
    <van-grid :column-num="3">
      <van-grid-item
        v-for="(item, index) in RecommandSongList"
        :key="index"
        :to="item.detail_url"
        @click="intoDetail(item.url)"
      >
        <div>
          <van-image :src="item.picture_url" />
          <p :class="intorduce">{{ item.text }}</p>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "Recommand",
  data() {
    return {
      RecommandSongList: [
        {
          picture_url: "https://img.yzcdn.cn/vant/apple-2.jpg",
          text: "好曲子好曲子好曲子好曲子好曲子好曲子好曲子好曲子",
          detail_url: "/detail",
        },
        {
          picture_url: "https://img.yzcdn.cn/vant/apple-2.jpg",
          text: "好曲子",
          detail_url: "",
        },
        {
          picture_url: "https://img.yzcdn.cn/vant/apple-2.jpg",
          text: "好曲子",
          detail_url: "",
        },
        {
          picture_url: "https://img.yzcdn.cn/vant/apple-2.jpg",
          text: "好曲子",
          detail_url: "",
        },
        {
          picture_url: "https://img.yzcdn.cn/vant/apple-2.jpg",
          text: "好曲子",
          detail_url: "",
        },
        {
          picture_url: "https://img.yzcdn.cn/vant/apple-2.jpg",
          text: "好曲子",
          detail_url: "",
        },
      ],
      intorduce: "intorduce",
    };
  },
  created() {
    this.$http
      .get("http://localhost:3000/banner/recommend/resource")
      .then((res) => {
      })
      .catch((err) => {
        // Toast.err(res.data);
      });
  },
};
</script>

<style>
.intorduce {
  font-size: 16px;
}
</style>