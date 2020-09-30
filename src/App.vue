<template>
  <router-view v-slot="{ Component }">
    <transition name="app-fade" type="transition" :duration="300" appear mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
});
</script>

<style lang="less">
.app-fade-enter,
.app-fade-leave-to {
  opacity: 0;
}
.app-fade-enter-active,
.app-fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.app-fade-enter-to,
.app-fade-leave {
  opacity: 1;
}
</style>