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