<template>
  <div id="HeaderLine">
    <van-nav-bar :class="nav_bar" left-text="返回" right-text="按钮" left-arrow>
      <template #left>
        <p :class="title">时尚云音乐</p>
      </template>
      <template #right>
        <van-button round type="info" color="white" :class="download"
          >下载App</van-button
        >
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "HeaderLine",
  data() {
    return {
      nav_bar: "nav-bar",
      title: "title",
      download: "download",
    };
  },
};
</script>

<style>
.van-nav-bar__content {
  height: 100px;
  background-color: #e66838;
}
.title {
  color: wheat;
  font-size: 26px;
}
.download {
  color: orangered !important;
  font-size: 20px;
}
</style>