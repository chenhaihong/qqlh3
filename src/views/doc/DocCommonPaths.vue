<template>
  <TContainer>
    <template v-slot:head>
      <h1>白名单页面 —— 无需登录就能访问的页面</h1>
      <br />
      <p>在 /src/router/createBeforeEach.ts 26行处配置。</p>
    </template>
    <template v-slot:default>
      <pre class="pre">
        <code class="typescript" v-hljs>{{code}}</code>
      </pre>
    </template>
  </TContainer>
</template>

<script lang="ts" setup>
export const code = `
const commonPaths = ["/login", "/404", "/403", "/500"]; // 无需鉴权

`;
</script>

<style scoped>
</style>