<template>
  <div class="dataView">
    <digital-panel />
    <chart-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DigitalPanel from "./DigitalPanel/index.vue";
import ChartPanel from "./ChartPanel/index.vue";

export default defineComponent({
  name: "DataView",
  components: { DigitalPanel, ChartPanel },
});
</script>

<style lang="less" scoped>
.dataView {
  @g: 20px; // 间距
  @h: 100px; // 高度

  & {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    width: 100%;
    height: 100%;
    min-width: 960px;
    min-height: 700px;
    background: #f2f2f2;
  }

  ::v-deep(.DataPanel) {
    position: absolute;
    top: @g;
    left: @g;
    right: @g;
    height: @h;
  }

  ::v-deep(.ChartPanel) {
    position: absolute;
    top: @h + @g * 2;
    right: @g;
    left: @g;
    bottom: @g;
  }
}
</style>