<template>
  <div class="navMenu">
    <NavMenuList :data="data" />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from "vue";
import NavMenuList from "./NavMenuList.vue";

import mitt from "@/helpers/mitt";

function resolveMatchedNames(name: string, list: any[]) {
  const names: string[] = [];
  const tree = { name: undefined, children: list };

  function findNode(node: any) {
    if (node.name === name) {
      names.push(name);
      return true;
    }

    const children = node.children;
    if (children && children.length) {
      for (const childNode of children) {
        const res = findNode(childNode);
        if (res) {
          names.push(node.name);
          return true;
        }
      }
    }
  }
  findNode(tree);
  return names;
}

export default defineComponent({
  name: "NavMenu",
  components: { NavMenuList },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    defaultActive: {
      type: String,
    },
  },
  setup(props) {
    let _default: any[] = [];
    if (props.defaultActive) {
      _default = resolveMatchedNames(props.defaultActive, props.data);
    }
    // 选中的菜单：添加高亮的样式
    const activeNames = ref(_default);
    // 展开的菜单：添加展开的样式
    const openNames = ref(_default);
    const pubsub = mitt();
    provide("rootMenuPubsub", pubsub);
    provide("activeNames", activeNames);
    provide("openNames", openNames);

    pubsub.on("clickItem", ({ item, level }) => {
      const { name, children } = item;

      // 1 当前点中的时c含有hildren的节点
      if (children && children.length) {
        // 1.1 这个节点已经是展开的状态了
        if (openNames.value.includes(name)) {
          openNames.value = openNames.value.filter((item) => item !== name);
        }
        // 1.2 这个节点是闭合的
        else {
          openNames.value.push(name);
        }
      }
      // 2 当前点中的是纯节点，不包含children
      else {
        activeNames.value = resolveMatchedNames(name, props.data);
      }
    });

    return {};
  },
});
</script>

<style lang="less" scoped>
.navMenu {
}
</style>