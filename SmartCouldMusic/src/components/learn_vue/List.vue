<template>
  <div id="List">
      <ul>
          <li v-for="(item,index) in goodsList" :key="index">
              <router-link :to="'/details/'+item.name">
                  {{item.name}}
              </router-link>
          </li>
      </ul>

  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
        goodsList:[
            {name:'小米1', id:"001"},
            {name:'huawei', id:"002"},
            {name:'xiaomi', id:"003"}
        ]
    };
  },
};
</script>

<style>
</style>