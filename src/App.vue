<template>
  <router-view v-slot="{ Component }">
    <transition name="qqlh-fade" type="transition" appear>
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
