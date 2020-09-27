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
  padding-bottom: @leftMenu-pin-height;

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
