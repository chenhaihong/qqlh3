<template>
  <div style="height: 100%;">
    <div class="titleBox">
      <TTab :title="[{ value: 0, name: '站点分析' }]" />
      <TTab
        v-model="isTruckAndBus"
        :type="2"
        :title="[
          { value: 1, name: '货/客' },
          { value: 0, name: '出/入' }
        ]"
        style="float: left; margin-top: 15px; margin-left: 20px;"
      />
      <TSwitcher
        v-model="isDay"
        :data="[
          { value: 1, name: '当日' },
          { value: 0, name: '当月' }
        ]"
      />
    </div>
    <div class="contentBox">
      <TEcharts
        ref="techarts"
        :option="optionStationAnalysis"
        :loading="loading"
        :resize="true"
        style="height: 100%;"
      ></TEcharts>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getStationAnalysisData } from "@/api/dataView";

import TTab from "@/views/DataView/components/TTab";
import TSwitcher from "@/views/DataView/components/TSwitcher";

export default {
  name: "StationAnalysis",
  data: () => ({
    loading: true,
    isTruckAndBus: 0,
    isDay: 0,

    xAxis: [],

    truckThisDay: [],
    busThisDay: [],

    truckThisMonth: [],
    busThisMonth: [],

    inThisDay: [],
    outThisDay: [],

    inThisMonth: [],
    outThisMonth: []
  }),
  props: [],
  components: { TTab, TSwitcher },
  computed: {
    ...mapState("leftMenu", ["show", "fixed"]),
    optionStationAnalysis() {
      let aName = "";
      let bName = "";
      let aData = [];
      let bData = [];

      if (this.isTruckAndBus) {
        if (this.isDay) {
          aName = "今日货车";
          bName = "今日客车";
          aData = this.truckThisDay;
          bData = this.busThisDay;
        } else {
          aName = "本月货车";
          bName = "本月客车";
          aData = this.truckThisMonth;
          bData = this.busThisMonth;
        }
      } else {
        if (this.isDay) {
          aName = "今日入站";
          bName = "今日出站";
          aData = this.inThisDay;
          bData = this.outThisDay;
        } else {
          aName = "本月入站";
          bName = "本月出站";
          aData = this.inThisMonth;
          bData = this.outThisMonth;
        }
      }

      return {
        title: {
          show: false
        },
        tooltip: {
          trigger: "axis",
          // backgroundColor: 'rgba(200,200,200,0.9)',
          axisPointer: {
            type: "shadow"
          }
        },
        toolbox: {
          showTitle: false,
          show: true,
          feature: {
            dataView: { readOnly: false },
            saveAsImage: {}
          },
          left: "right",
          top: "bottom"
        },
        legend: {
          left: "center",
          bottom: "20px",
          data: [aName, bName]
        },
        grid: {
          show: false,
          top: "20px",
          left: "20px",
          right: "40px",
          bottom: "60px",
          containLabel: true,
          borderColor: "red"
        },
        yAxis: {
          type: "category",
          boundaryGap: true,
          axisLine: {
            lineStyle: {
              color: "#CCD6EB",
              width: 1
            }
          },
          axisTick: {
            interval: 0,
            inside: true,
            lineStyle: {
              color: "#CCD6EB"
            }
          },
          axisLabel: {
            textStyle: {
              color: "#727272"
            }
          },
          splitArea: {
            interval: 0,
            show: true,
            areaStyle: {
              color: ["rgba(255,255,255,0.3)", "rgba(200,200,200,0.3)"]
            }
          },
          data: this.xAxis,
          z: 2
        },
        xAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#CCD6EB",
              width: 1
            }
          },
          // axisTick: {
          //     interval: 0,
          //     inside: true,
          //     lineStyle: {
          //         color: '#CCD6EB'
          //     }
          // },
          axisLabel: {
            textStyle: {
              color: "#727272"
            }
          },
          splitLine: {
            lineStyle: {
              color: "#eee",
              width: 1
            }
          }
        },
        dataZoom: [
          {
            type: "slider",
            handleSize: "100%",
            yAxisIndex: [0],
            startValue: 0,
            endValue: 4,
            filterMode: "empty",
            width: 15,
            right: "20px"
          },
          {
            type: "inside",
            yAxisIndex: 0,
            startValue: 0,
            endValue: 4
          }
        ],
        series: [
          {
            name: aName,
            type: "bar",
            data: aData
          },
          {
            name: bName,
            type: "bar",
            // barGap: '-100%',
            barCategoryGap: "40%",
            data: bData
          }
        ]
        // animation: false,
        // blendMode: 'lighter',
      };
    }
  },
  methods: {},
  watch: {
    show() {
      this.$refs.techarts.resizeHandler();
    },
    fixed() {
      this.$refs.techarts.resizeHandler();
    }
  },
  async created() {
    const [err, data] = await getStationAnalysisData();
    if (!err) {
      this.xAxis = data.stations;

      this.truckThisDay = data.truckThisDay;
      this.truckThisMonth = data.truckThisMonth;

      this.busThisDay = data.busThisDay;
      this.busThisMonth = data.busThisMonth;

      this.inThisDay = data.inThisDay;
      this.inThisMonth = data.inThisMonth;

      this.outThisDay = data.outThisDay;
      this.outThisMonth = data.outThisMonth;

      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped></style>
