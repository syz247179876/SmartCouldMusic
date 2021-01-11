<template>
  <div id="app">
    <!-- <router-view/> -->
    <Detail></Detail>
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
