<template>
  <AppLink
    class="navMenuItem"
    :activeClass="activeClass"
    :to="data.meta.link || data.path"
    @click="click($event, data)"
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
  </AppLink>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { useRouter } from "vue-router";

import AppLink from "./AppLink.vue";

export default defineComponent({
  name: "NavMenuItem",
  components: { AppLink },
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
    const activeClass = computed(() => {
      const name = props.data.name;
      const arr = [];
      activeNames.value.includes(name) && arr.push("active");
      openNames.value.includes(name) && arr.push("open");
      return arr.join(" ");
    });

    const router = useRouter();
    const click = (e: Event, data: any) => {
      if (data.meta && data.meta.link) {
        return;
      }
      e.preventDefault();
      if (!data.children || data.children.length === 0) {
        router.push(data.path);
      }
    };
    return { activeNames, openNames, activeClass, click };
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
  // color: @leftMenu-menu-active-color;
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