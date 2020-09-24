<template>
  <div>
    <h1>doc idnex</h1>
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
  name: "DocIndex",
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>