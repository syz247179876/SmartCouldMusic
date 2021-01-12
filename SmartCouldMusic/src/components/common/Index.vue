<template>
  <div id="Index">
    <!-- 头部导航栏 -->
    <HeaderLine></HeaderLine>
    <!-- 头部标签栏 -->
    <HeaderTab></HeaderTab>
    <!-- 轮播图 -->
    <Swipe></Swipe>
    <!-- 推荐歌单 -->
    <RecommandSong></RecommandSong>
    <!-- 推荐电台 -->
    <RecommandMV></RecommandMV>
    <!-- 推荐MV -->
    <RecommandRadio></RecommandRadio>
    <!-- 最新音乐 -->
    <LastestMusic></LastestMusic>

    <!-- <aside>
      <div class="t100"></div>
      <br /> -->
    <!-- 子路由嵌套 -->
    <!-- <router-link to="/index">首页</router-link>
      <br />
      <router-link to="/index/detail">细节</router-link>
      <br />
      <router-link to="/index/666">错误界面</router-link>
    </aside>
    <article>
      <router-view></router-view>
    </article> -->
  </div>
</template>

<script>
import HeaderLine from "./HeaderLine";
import HeaderTab from "./HeaderTab";
import Swipe from "./Swipe";
const LastestMusic = () => import("@/components/music/LastestMusic");
const RecommandRadio = () => import("@/components/music/RecommandRadio");
const RecommandMV = () => import("@/components/music/RecommandMV");
const RecommandSong = () => import("@/components/music/RecommandSong");
export default {
  name: "index",
  data() {
    return {};
  },
  components: {
    HeaderLine,
    HeaderTab,
    Swipe,
    RecommandRadio,
    RecommandMV,
    LastestMusic,
    RecommandSong,
  },
};
</script>

<style>
</style>