<template>
  <div class="ChartPanel">
    <section class="ChartPanel__col">
      <div class="panelTop">
        <earning-traffic />
      </div>
      <div class="panelBottom">
        <time-duration />
      </div>
    </section>
    <section class="ChartPanel__col">
      <div class="panel">
        <district-analysis />
      </div>
    </section>
    <section class="ChartPanel__col">
      <div class="panelTop">
        <station-analysis />
      </div>
      <div class="panelBottom">
        <vehicle-typeNews />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EarningTraffic from "./components/EarningTraffic.vue";
import TimeDuration from "./components/TimeDuration.vue";

import DistrictAnalysis from "./components/DistrictAnalysis.vue";

import StationAnalysis from "./components/StationAnalysis.vue";
import VehicleTypeNews from "./components/VehicleTypeNews.vue";

export default defineComponent({
  name: "ChartPanel",
  components: {
    EarningTraffic,
    TimeDuration,

    DistrictAnalysis,

    StationAnalysis,
    VehicleTypeNews,
  },
});
</script>
<style lang="less" scoped>
@titleBox-height: 50px;
.ChartPanel {
  & {
    display: flex;
    flex-flow: row nowrap;

    margin: 0 -10px;
  }
  ::v-deep(.ChartPanel__col) {
    margin: 0 10px;
    width: 100%;
    height: 100%;
    background: #fff;

    & {
      display: flex;
      height: 100%;
      flex-flow: column nowrap;

      .panel {
        position: relative;
        height: 100%;
        background: #ffffff;
      }

      .panelTop,
      .panelBottom {
        position: relative;
        display: inline-flex;
        flex-flow: column nowrap;
        height: 50%;
        background: #ffffff;
      }

      .titleBox {
        position: relative;
        z-index: 100;
        height: @titleBox-height - 2;
        border-top: 1px solid #e9e8e8;
        border-bottom: 1px solid #e9e8e8;
        flex-shrink: 0;

        .tab-type1 {
          float: left;
          margin: 10px 0;
        }
        .switcher {
          float: right;
          margin: 15px 0;
        }
        .droplist {
          float: right;
          margin-top: 15px;
          margin-right: 30px;
        }
      }

      .contentBox {
        @g: 10px;
        position: absolute;
        top: @titleBox-height + @g;
        bottom: @g;
        left: @g;
        right: @g;

        //position: relative;
        //height: auto;
        //padding: 10px;
        //box-sizing: border-box;
      }
    }
  }
}
</style>
