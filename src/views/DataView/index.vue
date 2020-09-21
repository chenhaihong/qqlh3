<template>
  <div class="home">
    <h1>Home</h1>
    <ul>
      <li>
        <img :src="userinfo.avatar" alt="avatar" />
        <SvgIcon class="icon" iconClass="doc" />
        <SvgIcon class="icon" iconClass="github" />
      </li>
      <li>Uid: {{userinfo.uid}}</li>
      <li>Nickname: {{userinfo.nickname}}</li>
      <li>RoleName: {{userinfo.roleName}}</li>
    </ul>
    <button @click="logout">注销</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'DataView',
  setup() {
    const router = useRouter();
    const store = useStore();
    const userinfo = store.state.auth.userinfo;
    const logout = async () => {
      const [err] = await store.dispatch("auth/logout");
      if (!err) {
        router.push("/login");
      }
    };

    return { message: "hello world!", userinfo, logout };
  },
});
</script>

<style lang="less" scoped>
.home {
  margin: 20px;
  font-size: 20px;
  line-height: 1.4;
  h1 {
    font-size: 80px;
  }
  button {
    margin-top: 20px;
    font-size: 20px;
  }
  .icon {
    color: red;
    font-size: 50px;
  }
}
</style>