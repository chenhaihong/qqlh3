<template>
  <TContainer>
    <template v-slot:head>
      <h1>使用了饿了么UI</h1>
    </template>
    <template v-slot:default>
      文档地址：
      <a
        target="_blank"
        href="https://element.eleme.cn/#/zh-CN"
      >https://element.eleme.cn/#/zh-CN</a>
    </template>
  </TContainer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DocElement",
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>