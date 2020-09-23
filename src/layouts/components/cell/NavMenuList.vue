<template>
  <ul class="navMenuList">
    <li class="navMenuList__item" v-for="item in data" :key="item.path">
      <NavMenuItem :data="item" :level="level" @click="clickItem(item, level)" />
      <NavMenuList
        class="subMenu"
        v-if="item.children && item.children.length > 0"
        v-show="openNames.includes(item.name)"
        :data="item.children"
        :level="level + 1"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { Emitter } from "mitt";

import NavMenuItem from "./NavMenuItem.vue";

export default defineComponent({
  name: "NavMenuList",
  components: { NavMenuItem },
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
    level: {
      type: Number,
      default: 1,
    },
  },
  setup() {
    const pubsub: any = inject<Emitter>("rootMenuPubsub");
    const openNames: any = inject("openNames");
    const clickItem = (item: any, level: number) => {
      pubsub.emit("clickItem", { item, level });
    };
    return { clickItem, openNames };
  },
});
</script>

<style lang="less" scoped>
.navMenuList {
  font-size: @leftMenu-menu-font-size;
  line-height: @leftMenu-menu-height;
  color: @leftMenu-menu-color;

  &.subMenu {
    ::v-deep .navMenuItem {
      color: @leftMenu-submenu-color;
      background: @leftMenu-submenu-background-color;

      &:hover,
      &.active {
        color: @leftMenu-submenu-active-color;
        background: @leftMenu-submenu-active-background-color;
      }
    }
  }
}
</style>
