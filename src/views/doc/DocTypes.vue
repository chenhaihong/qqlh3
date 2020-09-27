<template>
  <div>
    <h1>doc types</h1>
    <div>
      <router-link to="/home">
        <button>前往 Home</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DocTypes",
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>