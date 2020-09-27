<template>
  <TContainer>
    <template v-slot:head>
      <section>
        <h1>项目使用指南</h1>
        <br />
        <p>
          代码地址：
          <a
            class="link"
            href="https://github.com/chenhaihong/qqlh3"
            target="_blank"
          >https://github.com/chenhaihong/qqlh3</a>。
        </p>
        <br />
        <p>使用了 vue 全家桶，</p>
        <ol>
          <li>
            - vue
            <a class="link" href="https://v3.cn.vuejs.org/" target="_blank">[zh]</a>
            <span>、</span>
            <a class="link" href="https://v3.vuejs.org/" target="_blank">[en]</a>
          </li>
          <li>
            -
            <a class="link" href="https://vuex.vuejs.org/zh/" target="_blank">vuex</a>
          </li>
          <li>
            -
            <a class="link" href="https://next.router.vuejs.org/" target="_blank">vue-router</a>
          </li>
        </ol>
        <br />
        <p>
          同时，项目使用了 vue-cli，详细的配置信息可以阅读
          <a
            class="link"
            href="https://cli.vuejs.org/zh/"
            target="_blank"
          >vue-cli官网</a>。
        </p>
      </section>
    </template>
    <template v-slot:default>
      <section>
        <p>这里几个常用的命令，</p>
        <pre class="pre">
        <code class="bash" v-hljs>{{code}}</code>
      </pre>
        <p>
          <a class="link" href="https://qqlh3.tiiit.cn/report.html" target="_blank">打包分析</a>
        </p>
      </section>
    </template>
  </TContainer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DocIndex",
  setup() {
    const code = `
# 1 安装依赖
yarn install


# 2 本地开发
yarn serve


# 3 构建
yarn build --report


# 4 Lints and fixes files
yarn lint


# 5 预览
yarn preview
    `;
    return { code };
  },
});
</script>

<style scoped>
</style>