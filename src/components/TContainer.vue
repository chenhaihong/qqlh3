<template>
  <section class="chilView__container" :class="computedClass">
    <section v-if="$slots.head" class="chilView__container__head">
      <slot name="head"></slot>
    </section>
    <section class="chilView__container__body">
      <slot></slot>
    </section>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "TContainer",
  props: {
    type: { default: "medium", type: String },
  },
  setup(props) {
    const computedClass = computed(() => {
      if (["large", "medium", "small"].includes(props.type)) {
        return `chilView__container--${props.type}`;
      }
      return "";
    });
    return { computedClass };
  },
});
</script>

<style lang="less" scoped>
@ctn: chilView__container;
.@{ctn} {
  margin: @childView-container-margin;
  padding-bottom: 1px;
  line-height: 1.4;
  word-break: break-all;
  &.@{ctn}--large {
    font-size: @childView-container-font-size--large;
  }
  &.@{ctn}--medium {
    font-size: @childView-container-font-size--medium;
  }
  &.@{ctn}--small {
    font-size: @childView-container-font-size--small;
  }
}
.@{ctn}__head {
  margin-bottom: @childView-container-gap;
  padding: @childView-container-padding;
  background-color: white;
  box-shadow: @childView-container-box-shadow;
}
.@{ctn}__body {
  padding: @childView-container-padding;
  background-color: white;
  overflow-x: auto;
  box-shadow: @childView-container-box-shadow;
}
</style>
