<template>
  <div id="Title" class="title-style">
    <span class="line"></span>
    <span>
      {{ name }}
    </span>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: ["name"],
};
</script>

<style>
.line{
  line-height: 20px;
  border-left: 2px red solid;
  padding-left: 10px;
}
.title-style {
  margin-left: 0px;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>