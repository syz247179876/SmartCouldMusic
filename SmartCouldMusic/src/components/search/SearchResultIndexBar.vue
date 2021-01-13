<template>
  <div id="SearchResultIndexBar">
    <div v-if="hasData">
      <p
        v-for="(item, index) in searchResultList"
        :key="index"
        v-html="item.matchWord"
      >
        {{ item.matchWord }}
      </p>
    </div>
    <div v-else>抱歉,没有搜索到任何数据</div>
  </div>
</template>

<script>
export default {
  name: "SearchResultIndexBar",
  data() {
    return {
      NewTitle: "",
      hasData: true,
    };
  },
  watch: {
    // 监听数组,将其中的关键字高亮, 显示是否搜索到数据
    searchResultList() {
      if (this.searchResultList.length > 0) {
        this.hasData = true;
        this.searchResultList.forEach((element) => {
          this.keywordscolorful(this.searchValue, element.matchWord);
          element.matchWord = this.NewTitle;
        });
      } else this.hasData = false;
    },
  },
  methods: {
    // 匹配最长公共字串
    keywordscolorful(keyword, title) {
      var keywords = keyword
        .replace(/\+/g, "")
        .replace("$kw:", "")
        .replace(/\d+/g, "")
        .trim()
        .split(" ");
      //replace(/\+/g, '')
      //replace("$kw:", '')
      //.trim()
      //split(" ")
      let re = "";
      for (let i = 0; i < keywords.length; i++) {
        if (i == keywords.length - 1) {
          if (keywords[i].length > 0) {
            re += keywords[i];
          }
        } else {
          if (keywords[i].length > 0) {
            re += keywords[i] + "|";
          }
        }
        //利用RegExp动态生成正则表示式
        let r = new RegExp(keywords[i], "ig");
        //用title与其对比
        if (r.test(title)) {
          if (keywords[i].length > 0) {
            title = title.replace(
              r,
              "<font color='red'>" + keywords[i] + "</font>"
            );
          }
          this.NewTitle = title; //得到标红的新标题
        } else {
          this.NewTitle = title;
        }
      }
    },
  },
  props: ["searchResultList", "searchValue"],
};
</script>

<style>
</style>