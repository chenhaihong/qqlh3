<template>
  <div class="Error500">
    <h1>500</h1>
    <p>服务器内部错误！</p>
    <p>
      {{ remaining }}秒后自动返回首页，
      <router-link to="/">立即返回</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import useCountdown from "@/hooks/useCountdown";

export default defineComponent({
  name: "Error500",
  setup() {
    const router = useRouter();
    const [remaining] = useCountdown(10, () => {
      router.push("/");
    });
    return { remaining };
  },
});
</script>

<style scoped style="less">
.Error500 {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  text-align: center;
  transform: translate(-50%, -60%);
}

h1 {
  font-size: 100px;
  line-height: 1.4;
}

p {
  font-size: 20px;
  line-height: 2;
}

a {
  color: #03aaf4;
}
</style>
