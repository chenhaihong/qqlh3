<template>
  <div class="left-menu">
    <NavMenu :data="visibledAddressableRoutes" :defaultActive="defaultActive" />
    <div class="wrapper--pin" :class="{ withFixedLeftMenu: fixed }" @click="toggleFixed">
      <SvgIcon class="icon--pin" iconClass="pin" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import NavMenu from "./cell/NavMenu.vue";

function useLeftMenu() {
  const store = useStore();
  const visibledAddressableRoutes = computed(() => {
    return store.state.leftMenu.visibledAddressableRoutes;
  });
  const fixed = computed(() => {
    return store.state.leftMenu.fixed;
  });
  const toggleFixed = () => {
    store.commit("leftMenu/toggleFixed");
  };
  return { visibledAddressableRoutes, fixed, toggleFixed };
}
function useStaticDefaultActive() {
  const route = useRoute();
  const defaultActive = route.path;
  return { defaultActive };
}

export default defineComponent({
  name: "LeftMenu",
  components: { NavMenu },
  setup() {
    return {
      ...useLeftMenu(),
      ...useStaticDefaultActive(),
    };
  },
});
</script>

<style lang="less" scoped>
.left-menu {
  // padding-bottom: @leftMenu-pin-height;
  ::v-deep(.el-menu) {
    border-right: none;
    background: none;

    // 一级菜单、二级菜单、二级菜单标题，统一高度
    .el-menu-item,
    .el-submenu-item,
    .el-submenu__title {
      padding-top: 0;
      padding-bottom: 0;
      height: @leftMenu-menu-height;
      line-height: @leftMenu-menu-height;
      color: @leftMenu-menu-color;
      font-size: @leftMenu-menu-font-size;
      background: none;
    }

    // 一级菜单
    & > .el-menu-item {
      &:hover,
      &.is-active {
        color: @leftMenu-menu-active-color;
        background: @leftMenu-menu-active-background-color;
      }
    }

    // 二级菜单
    .el-submenu {
      color: @leftMenu-submenu-color;

      // 二级菜单标题
      // 和一级菜单样式一样
      .el-submenu__title {
        &:hover,
        &.is-active {
          color: @leftMenu-menu-active-color;
          background: @leftMenu-menu-active-background-color;
        }
      }
      &.is-active .el-submenu__title {
        color: @leftMenu-menu-active-color;
        background: @leftMenu-menu-active-background-color;
      }

      // 菜单
      .el-menu {
        background: @leftMenu-submenu-background-color;

        .el-menu-item {
          &:hover,
          &.is-active {
            color: @leftMenu-submenu-active-color;
            background: none;
          }
        }
      }
    }
  }

  .wrapper--pin {
    position: fixed;
    bottom: 0;
    width: @leftMenu-width;
    text-align: center;
    height: @leftMenu-pin-height;
    line-height: @leftMenu-pin-height;
    background: @leftMenu-pin-background-color;
    font-size: @leftMenu-pin-font-size;
    cursor: pointer;

    .icon--pin {
      color: @leftMenu-pin-active-color;
    }
    &.withFixedLeftMenu {
      .icon--pin {
        color: @leftMenu-pin-color;
      }
    }
  }
}
</style>
