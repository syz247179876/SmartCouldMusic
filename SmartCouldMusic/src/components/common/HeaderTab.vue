<template>
  <div id="HeaderTab">
    <van-tabs v-model="activeName">
      <van-tab
        v-for="(tab, index) in tabList"
        :key="index"
        :title="tab.title"
        :name="tab.name"
        :class="tab"
        :to="tab.to"
      ></van-tab>
      <!-- <van-tab title="标签 1" name="a">内容 1</van-tab>
      <van-tab title="标签 2" name="b">内容 2</van-tab>
      <van-tab title="标签 3" name="c">内容 3</van-tab> -->
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "HeaderTab",
  data() {
    return {
      tab: "tab",
      activeName: "",
      tabList: [
        {
          title: "推荐",
          name: "推荐",
          to: "/recommand",
        },
        {
          title: "新歌榜",
          name: "新歌榜",
          to: "/heat-song",
        },
        {
          title: "搜索",
          name: "搜索",
          to: "/search",
        },
      ],
    };
  },
  created(){
  }
};
</script>

<style>
.van-tab {
  font-size: 18px !important;
}
</style>