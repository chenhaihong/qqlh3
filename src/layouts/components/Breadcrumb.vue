<template>
  <div :class="$style.breadcrumb">
    <i :class="[$style.toggler, show ? 'el-icon-s-fold' : 'el-icon-s-unfold']" @click="toggleShow" />
    <div :class="$style.square"></div>
    <a v-if="$route.name == 'Home'" :class="[$style.link, $style.disabled]">首页</a>
    <template v-else>
      <!-- <router-link :class="$style.link" :to="{ path: '/home' }">首页</router-link> -->
      <template v-for="(item, index) in $route.matched" :key="item.fullPath">
        <div :class="$style.linkSep">
          <span v-if="index > 0" :class="$style.separator">
            {{
            separator
            }}
          </span>
          <router-link
            v-if="index < $route.matched.length - 1"
            :to="{ path: item.path }"
            :class="$style.link"
          >{{ item.meta.title }}</router-link>
          <a v-else :class="[$style.link, $style.disabled]">
            {{
            item.meta.title
            }}
          </a>
        </div>
      </template>
    </template>
  </div>
</template>
<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "Breadcrumb",
  setup() {
    const store = useStore();
    const show = computed(() => {
      return store.state.leftMenu.show;
    });
    const toggleShow = () => {
      store.commit("leftMenu/toggleShow");
    };
    return { separator: "-", show, toggleShow };
  },
});
</script>

<style lang="less" module>
.breadcrumb {
  position: relative;
  width: 100%;
  height: @breadcrumb-height;
  line-height: @breadcrumb-height;
  font-size: @breadcrumb-font-size;
  background: @breadcrumb-background-color;
  border-bottom: 1px solid @breadcrumb-bodero-color;
  box-shadow: @breadcrumb-box-shadow;
  overflow: hidden;
  box-sizing: border-box;

  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  .toggler {
    position: relative;
    margin: 0 12px;
    font-size: @breadcrumb-toggler-font-size;
    color: @breadcrumb-toggler-color;

    cursor: pointer;
    &:hover {
      color: @breadcrumb-toggler-active-color;
    }
    &::after {
      content: "";
      position: absolute;
      top: -10px;
      right: -10px;
      bottom: -10px;
      left: -10px;
      background: red;
    }
  }
  .square {
    display: none;
    @a: 9px;
    margin: 0 12px 0 0;
    width: @a;
    height: @a;
    background: #3ca9f4;
  }
  .linkSep {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  .link {
    font-weight: bold;
    color: @breadcrumb-color;
    &.disabled {
      cursor: default;
      font-weight: normal;
      color: @breadcrumb-disabled-color;
    }
  }
  .separator {
    margin: 0 8px;
    font-weight: bold;
    color: @breadcrumb-disabled-color;
  }
}
</style>
