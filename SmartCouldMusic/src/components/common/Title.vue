<template>
  <div id="Title" :class="title_style">
    <p>
      {{ name }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Title",
  data() {
    return {
      title_style: "title-style",
    };
  },
  props: ["name"],
};
</script>

<style>
.title-style {
  margin-left: 20px;
  text-align: left;
}
</style>