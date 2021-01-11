<template>
  <div id="Detail">
      
    <p>作者:{{ author }}</p>
    <p>歌曲名:{{ song_name }}</p>
    <img :src="picture" alt="" />
  </div>
</template>

<script>
import HelloWorld from '../HelloWorld.vue';
export default {
  components: { HelloWorld },
  name: "Detail",
  created() {
    // 发送请求
    this.$http
      .get("https://api.imjad.cn/cloudmusic/?type=detail&id=28012031&br=128015")
      // 成功回调
      .then((res) => {
        this.picture = res.data.songs[0].al.picUrl; // 图片
        this.author = res.data.songs[0].ar[0].name; // 作者名
        this.song_name = res.data.songs[0].alia[0]; // 作曲名
      })
      // 失败的回调
      .catch((err) => {
        Toast.err(res.data);
      });
  },
  data() {
    return {
      picture: "",
      author: "",
      song_name: "",
    };
  },
};
</script>

<style>
</style>