<template>
  <div class="home">
    <h1>Home</h1>
    <button @click="toggle">Toggle</button>
    <ul class="list" ref="ul">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "DataView",
  setup() {
    const ul = ref<HTMLUListElement>();
    let show = true;
    onMounted(() => {
      const dom = ul.value as HTMLUListElement;
      const h = dom.scrollHeight;
      dom.style.height = h + "px";
    });
    const toggle = () => {
      const dom = ul.value as HTMLUListElement;
      if (show) {
        dom.style.height = "0px";
      } else {
        const h = dom.scrollHeight;
        dom.style.height = h + "px";
      }
      show = !show;
    };
    return { ul, toggle };
  },
});
</script>

<style lang="less" scoped>
.home {
  margin: 20px;
  font-size: 20px;
  line-height: 1.4;
  h1 {
    font-size: 80px;
  }

  .list {
    overflow: hidden;
    transition: height 0.1s ease 0s;
  }
}
</style>