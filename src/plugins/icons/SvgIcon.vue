<template>
  <svg :class="svgClass">
    <!-- https://github.com/vuejs/rfcs/blob/amend-optional-props/active-rfcs/0031-attr-fallthrough.md -->
    <!-- <svg :class="svgClass" v-on="$listeners"> -->
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const iconName = computed(() => {
      return `#icon-${props.iconClass}`;
    });
    const svgClass = computed(() => {
      if (props.className) {
        return "svg-icon " + props.className;
      } else {
        return "svg-icon";
      }
    });
    return { iconName, svgClass };
  },
});
</script>

<style scoped lang="less">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  // 从iconfont拿图标时，如果想使用自己定义的颜色，需要执行批量取色操作，或者自己去掉svg里的fill属性
  fill: currentColor;
  overflow: hidden;
}
</style>
