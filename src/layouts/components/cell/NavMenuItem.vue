<template>
  <component
    :is="data.meta && data.meta.link ? 'a' : 'router-link'"
    :to="data.redirect || data.path"
    :href="data.meta.link"
    class="navMenuItem"
    :class="{
      active: activeNames.includes(data.name),
      open: openNames.includes(data.name)
    }"
  >
    <SvgIcon
      :iconClass="data.meta.icon ? data.meta.icon : ''"
      class="navMenuItem__icon"
      :style="{marginLeft: 8 * (level - 1) + 'px'}"
    />
    <span class="navMenuItem__text">{{data.meta.title || data.name}}</span>
    <SvgIcon
      v-if="data.children && data.children.length > 0"
      iconClass="arrow-down"
      class="navMenuItem__icon navMenuItem__icon--arrow"
    />
  </component>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "NavMenuItem",
  inheritAttrs: false,
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    level: {
      type: Number,
    },
  },
  setup(props) {
    const activeNames: any = inject("activeNames");
    const openNames: any = inject("openNames");
    return { activeNames, openNames };
  },
});
</script>

<style lang="less" scoped>
@item: navMenuItem;

.@{item} {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: @leftMenu-menu-padding;
  cursor: pointer;

  // hover和选中的样式
  &:hover,
  &.active {
    color: @leftMenu-menu-active-color;
    background: @leftMenu-menu-active-background-color;
  }

  // 展开的样式
  &.open {
    & + .subMenu {
      display: block;
    }
    & > .@{item}__icon--arrow {
      transform: rotateZ(180deg);
    }
  }
}
.@{item}__icon {
  flex-shrink: 0;
  margin-right: 10px;
  font-size: @leftMenu-menu-icon-size;

  &.@{item}__icon--arrow {
    margin-right: 0;
    margin-left: 6px;
    transition: transform 0.3s;
  }
}
.@{item}__text {
  width: 100%;
  overflow: hidden;
  word-wrap: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>