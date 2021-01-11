<template>
  <div id="app">
    <!-- 路由出口(跳转) -->
    <!-- <router-view /> -->
    <router-view />
  </div>
</template>

<script>
import Detail from "./components/music/Detail";

export default {
  name: "App",
  components: { Detail },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
