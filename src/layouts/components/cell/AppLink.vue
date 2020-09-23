<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <router-link v-else v-bind="$attrs" :to="to" :class="activeClass">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "AppLink",
  props: {
    to: String,
    activeClass: String,
  },
  computed: {
    isExternalLink(): boolean {
      return typeof this.to === "string" && this.to.startsWith("http");
    },
  },
});
</script>