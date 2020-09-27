<template>
  <div class="mainLayout">
    <Head class="mainLayout__head" />
    <div
      class="mainLayout__body"
      :class="{
        'mainLayout__body--hiddenLeftMenu': !show,
        'mainLayout__body--fixedLeftMenu': fixed
      }"
    >
      <transition name="fade" persisted appear>
        <div v-show="fixed && show" class="mainLayout__body__left-menu-shadow" @click="toggleShow" />
      </transition>
      <transition name="slide" persisted appear>
        <LeftMenu v-show="show" class="mainLayout__body__left-menu" />
      </transition>
      <Breadcrumb class="mainLayout__body__breadcrumb" />
      <div ref="refView" class="mainLayout__body__childView">
        <router-view v-slot="{ Component }">
          <transition name="slide" type="transition" :duration="{enter : 300, leave : 300}" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
        <!-- <router-view v-slot="{ Component }">
          <transition
            name="cv-slide-left"
            type="transition"
            :duration="{enter : 3000, leave : 0}"
          >
            <keep-alive>
              <component v-if="isKeepAlive" :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
        <router-view v-slot="{ Component }">
          <transition name="cv-slide-left" type="transition" :duration="{enter : 300, leave : 0}">
            <component v-if="!isKeepAlive" :is="Component" />
          </transition>
        </router-view> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onUpdated, ref } from "vue";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
import { useStore } from "vuex";

import Head from "./components/Head.vue";
import LeftMenu from "./components/LeftMenu.vue";
import Breadcrumb from "./components/Breadcrumb.vue";

function useTransitionNameOfChildView() {
  const transitionName = ref("cv-slide-left");
  const router = useRouter();
  onBeforeRouteLeave(() => {
    const __routerType__ = router.__routerType__ as string;
    transitionName.value =
      __routerType__ === "forward" ? "cv-slide-left" : "cv-slide-right";
  });
  return transitionName;
}
function useAutoSrollToTopChildView() {
  const refView = ref();
  onUpdated(() => {
    const dom: HTMLDivElement = refView.value;
    dom.scrollLeft = 0;
    dom.scrollTop = 0;
  });
  return refView;
}
function useKeepAliveChildView() {
  const route = useRoute();
  const isKeepAlive = computed(() => !!route.meta.keepAlive);
  return isKeepAlive;
}
function useInverterOfLeftMenu() {
  const store = useStore();
  const show = computed(() => {
    return store.state.leftMenu.show;
  });
  const fixed = computed(() => {
    return store.state.leftMenu.fixed;
  });
  const toggleShow = () => {
    store.commit("leftMenu/toggleShow");
  };
  return { show, fixed, toggleShow };
}

export default defineComponent({
  name: "MainLayout",
  components: { Head, LeftMenu, Breadcrumb },
  setup() {
    const transitionName = useTransitionNameOfChildView();
    const refView = useAutoSrollToTopChildView();
    const isKeepAlive = useKeepAliveChildView();
    const { show, fixed, toggleShow } = useInverterOfLeftMenu();

    return { refView, transitionName, isKeepAlive, show, fixed, toggleShow };
  },
});
</script>

<style lang="less" scoped>
@ctn: mainLayout;
@head: mainLayout__head;
@body: mainLayout__body;

.@{ctn} {
  position: relative;
  box-sizing: border-box;
}
.@{head} {
  z-index: @head-z-index;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: @header-height;
  background-color: @header-background-color;
}
.@{body} {
  z-index: @body-z-index;
  position: fixed;
  top: @header-height;
  bottom: 0;
  left: 0;
  right: 0;

  &.@{body}--hiddenLeftMenu {
    .@{body}__breadcrumb {
      left: 0;
    }
    .@{body}__childView {
      margin-left: 0;
    }
  }
  &.@{body}--fixedLeftMenu {
    .@{body}__left-menu {
      top: @header-height + @breadcrumb-height - 1;
      box-shadow: inset 0px 0px 1px #000;
    }
    .@{body}__breadcrumb {
      left: 0;
    }
    .@{body}__childView {
      margin-left: 0;
    }
  }
}
.@{body}__breadcrumb {
  z-index: @breadcrumb-z-index;
  position: fixed;
  left: @leftMenu-width;
}
.@{body}__left-menu {
  z-index: @leftMenu-z-index;
  position: fixed;
  top: @header-height;
  bottom: 0;
  width: @leftMenu-width;
  background-color: @leftMenu-background-color;
  overflow: hidden auto;
}
.@{body}__left-menu-shadow {
  z-index: @leftMenu-shadow-z-index;
  position: fixed;
  top: @header-height + @breadcrumb-height - 1;
  left: 0;
  right: 0;
  bottom: 0;
  background: @leftMenu-shadow-background-color;
}
.@{body}__childView {
  z-index: @childView-z-index;
  position: absolute;
  margin-left: @leftMenu-width;
  top: @breadcrumb-height;
  left: 0;
  right: 0;
  bottom: 0;
  background: @childView-background-color;
  // scroll-behavior: smooth;
  overflow: auto;
}
</style>
