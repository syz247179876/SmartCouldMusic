<template>
  <div id="Index">
    <!-- 头部导航栏 -->
    <HeaderLine></HeaderLine>
    <!-- 头部标签栏 -->
    <HeaderTab></HeaderTab>
    <router-view />
  </div>
</template>

<script>
const HeaderLine = () => import("../common/HeaderLine");
const HeaderTab = () => import("../common/HeaderTab");
export default {
  name: "index",
  data() {
    return {};
  },
  components: { HeaderTab, HeaderLine },
};
</script>

<style>
</style>