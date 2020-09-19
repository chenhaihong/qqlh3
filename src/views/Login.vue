<template>
  <div class="login">
    <div class="wrapper">
      <img class="login-logo" :src="loginLogo" :alt="name" />
      <p class="slogan">
        {{ name }}
        <br />
        {{ slogan }}
      </p>
      <input
        class="input"
        type="text"
        placeholder="用户名"
        v-model="loginState.username"
        @keyup.enter="login"
      />
      <input
        class="input"
        type="password"
        placeholder="密码"
        v-model="loginState.password"
        @keyup.enter="login"
      />
      <button class="btn" :class="{ disabled: disabled }" @click="login">
        <template v-if="loginState.isLoading">
          <i class="el-icon-loading"></i> 登陆中
        </template>
        <template v-else>登录</template>
      </button>
    </div>
    <div class="copyright">
      {{ copyright }}
      <br />
      <a v-if="icpCode" :href="icpLink" target="_blank" rel="noopener noreferrer">{{ icpCode }}</a>
      <template v-if="icpCode && beianCode">
        <span>|</span>
      </template>
      <a
        v-if="beianCode"
        :href="beianLink"
        target="_blank"
        rel="noopener noreferrer"
      >{{ beianCode }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import setting from "@/setting";

function useStaticSetting() {
  const {
    name,
    copyright,
    loginLogo,
    slogan,
    icpCode,
    icpLink,
    beianCode,
    beianLink,
  } = setting;
  return {
    name,
    copyright,
    loginLogo,
    slogan,
    icpCode,
    icpLink,
    beianCode,
    beianLink,
  };
}

export default defineComponent({
  name: "Login",
  setup() {
    const staticSetting = useStaticSetting();
    const loginState = reactive({
      isLoading: false,
      username: "haihong",
      password: "123123",
    });
    const disabled = computed(
      () => loginState.isLoading || !loginState.username || !loginState.password
    );
    const login = (): void => {
      if (loginState.isLoading) return;
      loginState.isLoading = true;
    };

    return {
      ...staticSetting,
      loginState,
      disabled,
      login,
    };
  },
});
</script>

<style lang="less" scoped>
.login {
  @mgb: 20px;
  @glay: #ccc;

  position: relative;
  margin: 80px auto 0 auto;
  padding-bottom: 1px;
  width: 500px;
  max-width: 100%;

  .wrapper {
    margin: auto;
    width: 300px;
    max-width: 90%;
    text-align: center;
  }

  .login-logo {
    margin-bottom: 20px;
    height: 120px;
  }

  .slogan {
    margin-bottom: @mgb;
    font-size: 14px;
    line-height: 1.6;
    color: @glay;
  }

  .input {
    display: block;
    margin-bottom: 20px;
    width: 300px;
    max-width: 100%;
    height: 46px;
    line-height: 46px;
    font-size: 14px;
    text-indent: 12px;
    border: solid 1px #d9d9d9;
    border-radius: 3px;
    outline: none;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:focus {
      border-color: #20a0ff;
    }
  }

  .btn {
    display: block;
    margin-bottom: 40px;
    width: 300px;
    max-width: 100%;
    height: 46px;
    line-height: 46px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    border: none;
    background: #03aaf4;
    border-radius: 3px;
    cursor: pointer;

    &.disabled {
      background: #cccccc;
      cursor: default;
    }
  }

  .copyright {
    margin-bottom: 30px;
    width: 100%;
    font-size: 12px;
    color: @glay;
    text-align: center;
    line-height: 22px;
    a {
      color: @glay;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
