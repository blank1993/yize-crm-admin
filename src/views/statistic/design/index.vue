<template>
  <div class="app-container">
    <el-row>
      计划完成时间：
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd"
      />
      <el-button type="primary" style="margin-left: 15px;margin-bottom: 10px" @click="fetchData">查询</el-button>
      <el-button type="primary" @click="exportExcel">导出</el-button>
    </el-row>
    <el-table
      :data="geishui"
      :border="true"
      :span-method="objectSpanMethod1"
    >
      <el-table-column
        align="center"
        label=""
        width="100"
      >给水设计
      </el-table-column>
      <el-table-column
        align="center"
        label="姓名"
        prop="design"
        width="100"
      />
      <el-table-column
        align="center"
        label="项目积分"
        prop="point"
        width="60"
      />
      <el-table-column
        align="center"
        label="新项目量"
        prop="newSum"
        width="60"
      />
      <el-table-column
        align="center"
        label="增项目量"
        prop="addSum"
        width="60"
      />
      <el-table-column
        align="center"
        label="修改项目"
        prop="fixSum"
        width="60"
      />

      <el-table-column
        align="center"
        label="平均准确度"
        prop="avgPoint"
        width="80"
      />
      <el-table-column
        align="center"
        label="设计总用时"
        prop="actulTimeSum"
        width="100"
      />
      <el-table-column
        align="center"
        label="预计总用时"
        prop="planTimeSum"
        width="100"
      />
      <el-table-column
        align="center"
        label="效率"
        prop="efficiency"
        width="80"
      />
      <el-table-column
        align="center"
        label="产值"
        prop="degreeDifficultySumText"
        width="80"
      />
      <el-table-column
        align="center"
        label="日报"
        prop="journal"
      />
    </el-table>
    <el-table
      v-if="paishui.length>0"
      :data="paishui"
      :border="true"
      :show-header="false"
      :span-method="objectSpanMethod2"
    >
      <el-table-column
        align="center"
        label=""
        width="100"
      >排水设计
      </el-table-column>
      <el-table-column
        align="center"
        label="姓名"
        prop="design"
        width="100"
      />
      <el-table-column
        align="center"
        label="项目积分"
        prop="point"
        width="60"
      />
      <el-table-column
        align="center"
        label="新项目量"
        prop="newSum"
        width="60"
      />
      <el-table-column
        align="center"
        label="增项目量"
        prop="addSum"
        width="60"
      />
      <el-table-column
        align="center"
        label="修改项目"
        prop="fixSum"
        width="60"
      />

      <el-table-column
        align="center"
        label="平均准确度"
        prop="avgPoint"
        width="80"
      />
      <el-table-column
        align="center"
        label="设计总用时"
        prop="actulTimeSum"
        width="100"
      />
      <el-table-column
        align="center"
        label="预计总用时"
        prop="planTimeSum"
        width="100"
      />
      <el-table-column
        align="center"
        label="效率"
        prop="efficiency"
        width="80"
      />
      <el-table-column
        align="center"
        label="产值"
        prop="degreeDifficultySumText"
        width="80"
      />
      <el-table-column
        align="center"
        label="日报"
        prop="journal"
      />
    </el-table>

    <el-table
      v-if="electric.length>0"
      :data="electric"
      :border="true"
      :show-header="false"
      :span-method="objectSpanMethod3"
    >
      <el-table-column
        align="center"
        label=""
        width="100"
      >电气设计
      </el-table-column>
      <el-table-column
        align="center"
        label="姓名"
        prop="design"
        width="100"
      />
      <el-table-column
        align="center"
        label="项目积分"
        prop="point"
        width="60"
      />
      <el-table-column
        align="center"
        label="新项目量"
        prop="newSum"
        width="60"
      />
      <el-table-column
        align="center"
        label="增项目量"
        prop="addSum"
        width="60"
      />
      <el-table-column
        align="center"
        label="修改项目"
        prop="fixSum"
        width="60"
      />

      <el-table-column
        align="center"
        label="平均准确度"
        prop="avgPoint"
        width="80"
      />
      <el-table-column
        align="center"
        label="设计总用时"
        prop="actulTimeSum"
        width="100"
      />
      <el-table-column
        align="center"
        label="预计总用时"
        prop="planTimeSum"
        width="100"
      />
      <el-table-column
        align="center"
        label="效率"
        prop="efficiency"
        width="80"
      />
      <el-table-column
        align="center"
        label="产值"
        prop="degreeDifficultySumText"
        width="80"
      />
      <el-table-column
        align="center"
        label="日报"
        prop="journal"
      />
    </el-table>

    <el-table
      v-if="waterscape.length>0"
      :data="waterscape"
      :border="true"
      :show-header="false"
      :span-method="objectSpanMethod4"
    >
      <el-table-column
        align="center"
        label=""
        width="100"
      >水景设计
      </el-table-column>
      <el-table-column
        align="center"
        label="姓名"
        prop="design"
        width="100"
      />
      <el-table-column
        align="center"
        label="项目积分"
        prop="point"
        width="60"
      />
      <el-table-column
        align="center"
        label="新项目量"
        prop="newSum"
        width="60"
      />
      <el-table-column
        align="center"
        label="增项目量"
        prop="addSum"
        width="60"
      />
      <el-table-column
        align="center"
        label="修改项目"
        prop="fixSum"
        width="60"
      />

      <el-table-column
        align="center"
        label="平均准确度"
        prop="avgPoint"
        width="80"
      />
      <el-table-column
        align="center"
        label="设计总用时"
        prop="actulTimeSum"
        width="100"
      />
      <el-table-column
        align="center"
        label="预计总用时"
        prop="planTimeSum"
        width="100"
      />
      <el-table-column
        align="center"
        label="效率"
        prop="efficiency"
        width="80"
      />
      <el-table-column
        align="center"
        label="产值"
        prop="degreeDifficultySumText"
        width="80"
      />
      <el-table-column
        align="center"
        label="日报"
        prop="journal"
      />
    </el-table>

    <el-table
      v-if="sum.length>0"
      :data="sum"
      :border="true"
      :show-header="false"
      :span-method="objectSpanMethod5"
    >
      <el-table-column
        align="center"
        label=""
        width="100"
      >汇总
      </el-table-column>
      <el-table-column
        align="center"
        label="姓名"
        prop="design"
        width="100"
      />
      <el-table-column
        align="center"
        label="项目积分"
        prop="point"
        width="60"
      />
      <el-table-column
        align="center"
        label="新项目量"
        prop="newSum"
        width="60"
      />
      <el-table-column
        align="center"
        label="增项目量"
        prop="addSum"
        width="60"
      />
      <el-table-column
        align="center"
        label="修改项目"
        prop="fixSum"
        width="60"
      />

      <el-table-column
        align="center"
        label="平均准确度"
        prop="avgPoint"
        width="80"
      />
      <el-table-column
        align="center"
        label="设计总用时"
        prop="actulTimeSum"
        width="100"
      />
      <el-table-column
        align="center"
        label="预计总用时"
        prop="planTimeSum"
        width="100"
      />
      <el-table-column
        align="center"
        label="效率"
        prop="efficiency"
        width="80"
      />
      <el-table-column
        align="center"
        label="产值"
        prop="degreeDifficultySumText"
        width="80"
      />
      <el-table-column
        align="center"
        label="日报"
        prop="journal"
      />
    </el-table>
  </div>
</template>

<script>
import ReportService from '@/services/report';

export default {
  components: {},
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '当前周',
          onClick: (picker) => {
            const end = this.$dayjs()
              .add(1, 'month')
              .toDate();
            const start = this.$dayjs()
              .startOf('week')
              .toDate();
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '当前月',
          onClick: (picker) => {
            const end = this.$dayjs()
              .endOf('month')
              .toDate();
            const start = this.$dayjs()
              .startOf('month')
              .toDate();
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '当前年',
          onClick: (picker) => {
            const end = this.$dayjs()
              .endOf('year')
              .toDate();
            const start = this.$dayjs()
              .startOf('year')
              .toDate();
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '上一周',
          onClick: (picker) => {
            const end = this.$dayjs()
              .add(-1, 'w')
              .endOf('week')
              .toDate();
            const start = this.$dayjs()
              .add(-1, 'w')
              .startOf('week')
              .toDate();
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '上一月',
          onClick: (picker) => {
            const end = this.$dayjs()
              .add(-1, 'M')
              .endOf('month')
              .toDate();
            const start = this.$dayjs()
              .add(-1, 'M')
              .startOf('month')
              .toDate();
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '上一年',
          onClick: (picker) => {
            const end = this.$dayjs()
              .add(-1, 'y')
              .endOf('year')
              .toDate();
            const start = this.$dayjs()
              .add(-1, 'y')
              .startOf('year')
              .toDate();
            picker.$emit('pick', [start, end]);
          },
        }],
      },
      dateRange: [this.$dayjs()
        .startOf('week')
        .toDate(),
      this.$dayjs()
        .add(1, 'month')
        .toDate()],
      geishui: [],
      paishui: [],
      electric: [],
      waterscape: [],
      sum: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async exportExcel() {
      const { data } = await ReportService.designExport({
        startDate: this.dateRange[0],
        endDate: this.dateRange[1],
      });
      this.download(data, '设计统计导出.xls');
    },
    download(data, fileName) {
      if (!data) {
        return;
      }
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    },
    async fetchData() {
      if (this.dateRange === null) this.dateRange = [];
      const { data: geishui } = await ReportService.design({
        startDate: this.dateRange[0],
        endDate: this.dateRange[1],
        type: 'geishui',
      });
      const { data: paishui } = await ReportService.design({
        startDate: this.dateRange[0],
        endDate: this.dateRange[1],
        type: 'paishui',
      });
      const { data: electric } = await ReportService.design({
        startDate: this.dateRange[0],
        endDate: this.dateRange[1],
        type: 'electric',
      });
      const { data: waterscape } = await ReportService.design({
        startDate: this.dateRange[0],
        endDate: this.dateRange[1],
        type: 'waterscape',
      });
      this.geishui = geishui;
      this.paishui = paishui;
      this.electric = electric;
      this.waterscape = waterscape;
      const sumArr = [];
      this.geishui.forEach((item) => {
        let flag = false;
        sumArr.forEach((sum) => {
          if (sum.design === item.design) {
            sum.point += item.point;
            sum.avgPoint += item.avgPoint;
            sum.actulTimeSum += item.actulTimeSum;
            sum.planTimeSum += item.planTimeSum;
            sum.efficiency += item.efficiency;
            sum.degreeDifficultySumText += Number(item.degreeDifficultySumText);
            sum.journal += item.journal;
            sum.num += item.num;
            sum.sumPoint += item.sumPoint;

            sum.avgPoint.toFixed(3);
            sum.actulTimeSum.toFixed(3);
            sum.planTimeSum.toFixed(3);
            sum.efficiency.toFixed(3);
            sum.degreeDifficultySumText.toFixed(3);
            flag = true;
          }
        });
        if (flag === false) {
          sumArr.push({
            newSum: '/',
            addSum: '/',
            fixSum: '/',
            design: item.design,
            point: item.point,
            avgPoint: item.avgPoint,
            actulTimeSum: item.actulTimeSum,
            planTimeSum: item.planTimeSum,
            efficiency: item.efficiency,
            degreeDifficultySumText: Number(item.degreeDifficultySumText),
            journal: item.journal,
            num: item.num,
            sumPoint: item.sumPoint,
          });
        }
      });
      this.paishui.forEach((item) => {
        let flag = false;
        sumArr.forEach((sum) => {
          if (sum.design === item.design) {
            sum.point += item.point;
            sum.avgPoint += item.avgPoint;
            sum.actulTimeSum += item.actulTimeSum;
            sum.planTimeSum += item.planTimeSum;
            sum.efficiency += item.efficiency;
            sum.degreeDifficultySumText += Number(item.degreeDifficultySumText);
            sum.journal += item.journal;
            sum.num += item.num;
            sum.sumPoint += item.sumPoint;
            sum.avgPoint.toFixed(3);
            sum.actulTimeSum.toFixed(3);
            sum.planTimeSum.toFixed(3);
            sum.efficiency.toFixed(3);
            sum.degreeDifficultySumText.toFixed(3);
            flag = true;
          }
        });
        if (flag === false) {
          sumArr.push({
            newSum: '/',
            addSum: '/',
            fixSum: '/',
            design: item.design,
            point: item.point,
            avgPoint: item.avgPoint,
            actulTimeSum: item.actulTimeSum,
            planTimeSum: item.planTimeSum,
            efficiency: item.efficiency,
            degreeDifficultySumText: Number(item.degreeDifficultySumText),
            journal: item.journal,
            num: item.num,
            sumPoint: item.sumPoint,
          });
        }
      });
      this.electric.forEach((item) => {
        let flag = false;
        sumArr.forEach((sum) => {
          if (sum.design === item.design) {
            sum.point += item.point;
            sum.avgPoint += item.avgPoint;
            sum.actulTimeSum += item.actulTimeSum;
            sum.planTimeSum += item.planTimeSum;
            sum.efficiency += item.efficiency;
            sum.degreeDifficultySumText += Number(item.degreeDifficultySumText);
            sum.journal += item.journal;
            sum.num += item.num;
            sum.sumPoint += item.sumPoint;
            sum.avgPoint.toFixed(3);
            sum.actulTimeSum.toFixed(3);
            sum.planTimeSum.toFixed(3);
            sum.efficiency.toFixed(3);
            sum.degreeDifficultySumText.toFixed(3);
            flag = true;
          }
        });
        if (flag === false) {
          sumArr.push({
            newSum: '/',
            addSum: '/',
            fixSum: '/',
            design: item.design,
            point: item.point,
            avgPoint: item.avgPoint,
            actulTimeSum: item.actulTimeSum,
            planTimeSum: item.planTimeSum,
            efficiency: item.efficiency,
            degreeDifficultySumText: Number(item.degreeDifficultySumText),
            journal: item.journal,
            num: item.num,
            sumPoint: item.sumPoint,
          });
        }
      });
      this.waterscape.forEach((item) => {
        let flag = false;
        sumArr.forEach((sum) => {
          if (sum.design === item.design) {
            sum.point += item.point;
            sum.avgPoint += item.avgPoint;
            sum.actulTimeSum += item.actulTimeSum;
            sum.planTimeSum += item.planTimeSum;
            sum.efficiency += item.efficiency;
            sum.degreeDifficultySumText += Number(item.degreeDifficultySumText);
            sum.journal += item.journal;
            sum.num += item.num;
            sum.sumPoint += item.sumPoint;
            sum.avgPoint.toFixed(3);
            sum.actulTimeSum.toFixed(3);
            sum.planTimeSum.toFixed(3);
            sum.efficiency.toFixed(3);
            sum.degreeDifficultySumText.toFixed(3);
            flag = true;
          }
        });
        if (flag === false) {
          sumArr.push({
            newSum: '/',
            addSum: '/',
            fixSum: '/',
            design: item.design,
            point: item.point,
            avgPoint: item.avgPoint,
            actulTimeSum: item.actulTimeSum,
            planTimeSum: item.planTimeSum,
            efficiency: item.efficiency,
            degreeDifficultySumText: Number(item.degreeDifficultySumText),
            journal: item.journal,
            num: item.num,
            sumPoint: item.sumPoint,
          });
        }
      });
      sumArr.forEach((sum) => {
        sum.efficiency = (sum.planTimeSum / sum.actulTimeSum).toFixed(3);
        sum.avgPoint = (sum.sumPoint / sum.num).toFixed(3);
      });
      this.sum = sumArr;
    },
    // eslint-disable-next-line consistent-return
    objectSpanMethod1({
      rowIndex, columnIndex,
    }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: this.geishui.length,
            colspan: 1,
          };
        }
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    },
    // eslint-disable-next-line consistent-return
    objectSpanMethod2({
      rowIndex, columnIndex,
    }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: this.paishui.length,
            colspan: 1,
          };
        }
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    },
    // eslint-disable-next-line consistent-return
    objectSpanMethod3({
      rowIndex, columnIndex,
    }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: this.electric.length,
            colspan: 1,
          };
        }
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    },
    // eslint-disable-next-line consistent-return
    objectSpanMethod4({
      rowIndex, columnIndex,
    }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: this.waterscape.length,
            colspan: 1,
          };
        }
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    },
    // eslint-disable-next-line consistent-return
    objectSpanMethod5({
      rowIndex, columnIndex,
    }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: this.sum.length,
            colspan: 1,
          };
        }
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    },
  },
};
</script>
<style type="text/scss" lang="scss" scoped>
.app-container {
  background: $--background-color-base;

  ::v-deep .el-table td {
    padding: 0;
  }
}
</style>
