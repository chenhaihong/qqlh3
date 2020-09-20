<template>
  <div class="home">
    <h1>Home</h1>
    <p>{{message}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return { message: "hello world!" };
  },
});
</script>

<style lang="less" scoped>
.home {
  margin: 100px;
  line-height: 1.4;
  h1 {
    font-size: 80px;
  }
  p {
    font-size: 60px;
  }
}
</style>