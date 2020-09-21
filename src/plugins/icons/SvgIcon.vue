<template>
  <svg :class="svgClass">
    <!-- <svg :class="svgClass" v-on="$listeners"> -->
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  // By setting the inheritAttrs option to false,
  // this gives you access to the component's $attrs property,
  // which includes all attributes not included to component props
  // and emits properties (e.g., class, style, v-on listeners, etc.).
  // https://www.josephxia.com/guide/component-attrs.html#disabling-attribute-inheritance
  // inheritAttrs: false,
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
