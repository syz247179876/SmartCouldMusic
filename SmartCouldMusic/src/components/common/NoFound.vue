<template>
  <div id="NoFound">
    <h2>{{ message }}</h2>
    <span>将自动跳转到主页,剩余跳转时间<van-count-down :time="time" @finish="finish" format="ss"/></span>
    <!-- 声明式导航 -->
    <router-link to="/">点击此进行跳转</router-link>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "NoFound",
  data() {
    return {
      message: "页面找不到了!",
      time: 6 * 1000,
    };
  },
  methods: {
    // 编程式导航
    finish() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>