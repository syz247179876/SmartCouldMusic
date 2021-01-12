<template>
  <div id="Details">
      <p>详情列表</p>
      <!-- 用于获取路由匹配的位置参数 -->
      <p>{{$route.params}}</p>
      <!-- 获取查询参数 -->
      <p>{{$route.query}}</p>
       
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {};
  },
};
</script>

<style>
</style>