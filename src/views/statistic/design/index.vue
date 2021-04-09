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
      :data="sumArr"
      :border="true"
      :span-method="objectSpanMethod"
    >
      <el-table-column
        align="center"
        label=""
        prop="type"
        width="100"
      />
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
      sumArr: [],
      orderIndexArr: [],
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
      const { data } = await ReportService.design({
        startDate: this.dateRange[0],
        endDate: this.dateRange[1],
      });
      this.sumArr = data;
      this.getOrderNumber();
    },
    getOrderNumber() {
      const orderObj = {};
      this.sumArr.forEach((item, index) => {
        item.rowIndex = index;
        if (orderObj[item.type]) {
          orderObj[item.type].push(index);
        } else {
          orderObj[item.type] = [];
          orderObj[item.type].push(index);
        }
      });
      // 将数组长度大于1的值 存储到this.orderIndexArr（也就是需要合并的项）
      Object.keys(orderObj).forEach((key) => {
        if (orderObj[key].length > 1) {
          this.orderIndexArr.push(orderObj[key]);
        }
      });
    },
    // eslint-disable-next-line consistent-return
    objectSpanMethod({
      rowIndex, columnIndex,
    }) {
      if (columnIndex === 0) {
        for (let i = 0; i < this.orderIndexArr.length; i += 1) {
          const element = this.orderIndexArr[i];
          for (let j = 0; j < element.length; j += 1) {
            const item = element[j];
            if (rowIndex === item) {
              if (j === 0) {
                return {
                  rowspan: element.length,
                  colspan: 1,
                };
              }
              if (j !== 0) {
                return {
                  rowspan: 0,
                  colspan: 0,
                };
              }
            }
          }
        }
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
