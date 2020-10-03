<template>
  <TContainer>
    <template v-slot:head>
      <h1>声明文件</h1>
      <br />
      <p>
        声明文件放在目录：
        <code>/@types/</code>
      </p>
    </template>
    <template v-slot:default>
      <h2>示例：@types/shim-mitt.d.ts</h2>
      <pre class="pre">
        <code class="typescript" v-hljs>{{code}}</code>
      </pre>
    </template>
  </TContainer>
</template>

<script lang="ts" setup>
export const code = `import 'mitt';

declare module 'mitt' {

  interface Emitter {
    all: EventHandlerMap;
    on<T = any>(type: EventType, handler: Handler<T>): void;
    on(type: '*', handler: WildcardHandler): void;
    once<T = any>(type: EventType, handler: Handler<T>): void; // 拓展Emitter，添加了once方法
    off<T = any>(type: EventType, handler: Handler<T>): void;
    off(type: '*', handler: WildcardHandler): void;
    emit<T = any>(type: EventType, event?: T): void;
    emit(type: '*', event?: any): void;
  }
}
`;
</script>

<style scoped></style>
