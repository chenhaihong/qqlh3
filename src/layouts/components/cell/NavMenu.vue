<template>
  <div class="navMenu">
    <NavMenuList :data="data" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, provide, ref } from "vue";
import { useRouter, Router } from "vue-router";
import NavMenuList from "./NavMenuList.vue";

import mitt from "@/helpers/mitt";

function resolveMatchedNames(path: string, router: Router) {
  const res = router.resolve(path);
  const matchedNames = res.matched.map((item) => item.name);
  return matchedNames;
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
      default: "",
    },
  },
  setup(props) {
    const router = useRouter();
    const _default: any[] = resolveMatchedNames(props.defaultActive, router);

    // 选中的菜单：添加高亮的样式
    const activeNames = ref(_default);
    // 展开的菜单：添加展开的样式
    const openNames = ref(_default);
    const pubsub = mitt();
    provide("rootMenuPubsub", pubsub);
    provide("activeNames", activeNames);
    provide("openNames", openNames);
    onUnmounted(() => {
      pubsub.all.clear();
    });

    pubsub.on("clickItem", ({ item }) => {
      const { name, children } = item;
      // 0 如果是外链，不控制样式
      if (item.meta && item.meta.link) {
        return;
      }
      // 1 当前点中的节点，含有children
      if (children && children.length) {
        // 1.1 这个节点已经是展开的状态了，将其闭合起来
        if (openNames.value.includes(name)) {
          openNames.value = openNames.value.filter((item) => item !== name);
        }
        // 1.2 这个节点是未展开，将其展开
        else {
          // ! openNames.value.push无法触发Proxy拦截器
          // openNames.value.push(name);
          openNames.value = [...openNames.value, item.name];
        }
      }
      // 2 当前点中的是纯节点，不包含children
      else {
        activeNames.value = resolveMatchedNames(item.path, router);
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