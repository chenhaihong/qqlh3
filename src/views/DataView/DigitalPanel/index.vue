<template>
  <div class="DigitalPanel">
    <div class="panel panel--trafficFlowDay">
      <img class="icon" src="/assets/welcome/image/car.png" />
      <div class="numberBox">
        <p class="number">{{ state.trafficFlowDay }}</p>
        <p class="name">今日车流</p>
      </div>
    </div>

    <div class="panel panel--trafficFlowMonth">
      <img class="icon" src="/assets/welcome/image/wheel.png" />
      <div class="numberBox">
        <p class="number">{{ state.trafficFlowMonth }}</p>
        <p class="name">本月车流</p>
      </div>
    </div>

    <div class="panel panel--earning">
      <img class="icon" src="/assets/welcome/image/money.png" />
      <div class="numberBox">
        <p class="number">{{ state.earning }}</p>
        <p class="name">今日增收</p>
      </div>
    </div>

    <div class="panel panel--audit">
      <img class="icon" src="/assets/welcome/image/book.png" />
      <div class="numberBox">
        <p class="number">{{ state.audit }}</p>
        <p class="name">待审核</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from "vue";
import { getDataPanel } from "@/api/dataView";
import formatNumber from "@/helpers/formatNumber";

export default defineComponent({
  name: "DigitalPanel",
  setup() {
    const state = reactive({
      trafficFlowDay: '0',
      trafficFlowMonth: '0',
      earning: '0',
      audit: '0',
    });

    onBeforeMount(async () => {
      const [err, data] = await getDataPanel();
      if (!err) {
        state.trafficFlowDay = formatNumber(data.trafficFlowDay);
        state.trafficFlowMonth = formatNumber(data.trafficFlowMonth);
        state.earning = formatNumber(data.earning);
        state.audit = formatNumber(data.audit);
      }
    });

    return { state };
  },
});
</script>

<style lang="less" scoped>
.DigitalPanel {
  & {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    margin: 20px 10px;
  }

  .panel {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    margin: 0 10px;
    width: 100%;
    height: 100px;
    background-color: #d3dce6;

    .icon {
      flex-shrink: 0;
      margin: 0 20px;
      width: 60px;
    }

    .numberBox {
      display: inline-flex;
      flex-flow: column nowrap;
      justify-content: center;
      width: 100%;
      height: 100px;
      text-align: center;
      color: white;

      .number {
        margin: 0 auto;
        height: 50px;
        line-height: 50px;
        font-size: 45px;
        font-weight: bold;
        transition: font-size ease-in 0.2s;
      }
      .name {
        margin: 0 auto;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
      }
    }

    &.panel--trafficFlowDay {
      background-color: #3496e2;
    }

    &.panel--trafficFlowMonth {
      background: #36a9de;
    }

    &.panel--earning {
      background: #36beda;
    }

    &.panel--audit {
      background: #38ced7;
    }
  }
}

@media (max-width: 1260px) {
  .DigitalPanel .panel .numberBox .number {
    font-size: 30px;
  }
}
</style>
