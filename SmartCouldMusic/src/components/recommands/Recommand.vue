<template>
  <div id="Recommand">
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
  </div>
</template>

<script>
const HeaderLine = () => import("../common/HeaderLine");
const HeaderTab = () => import("../common/HeaderTab");
const Swipe = () => import("../common/Swipe");
const LastestMusic = () => import("../music/LastestMusic");
const RecommandRadio = () => import("../recommands/RecommandRadio");
const RecommandMV = () => import("../recommands/RecommandMV");
const RecommandSong = () => import("../recommands/RecommandSong");
export default {
  name: "Recommand",
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