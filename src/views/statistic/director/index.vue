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
      ref="singleTable"
      v-loading="tableData.loading"
      :data="tableData.list"
      :border="true"
      :height="'calc(100vh - 270px)'"
      highlight-current-row
      :span-method="objectSpanMethod"
    >
      <el-table-column
        align="center"
        label=""
      >负责人</el-table-column>
      <el-table-column
        align="center"
        label="姓名"
        prop="director"
      />
      <el-table-column
        align="center"
        label="项目积分"
        prop="point"
      />
      <el-table-column
        align="center"
        label="新项目量"
        prop="newSum"
      />
      <el-table-column
        align="center"
        label="增项目量"
        prop="addSum"
      />
      <el-table-column
        align="center"
        label="修改项目"
        prop="fixSum"
      />
      <el-table-column align="center" label="项目负责人预估准确度">
        <el-table-column
          align="center"
          label="给水"
          prop="geishuiSum"
        />
        <el-table-column
          align="center"
          label="排水"
          prop="paishuiSum"
        />
        <el-table-column
          align="center"
          label="电气"
          prop="electricSum"
        />
        <el-table-column
          align="center"
          label="水景"
          prop="waterscapeSum"
        />
      </el-table-column>
      <el-table-column
        align="center"
        label="产值"
        prop="degreeDifficultySum"
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
            const end = this.$dayjs().add(1, 'month').toDate();
            const start = this.$dayjs().startOf('week').toDate();
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '当前月',
          onClick: (picker) => {
            const end = this.$dayjs().endOf('month').toDate();
            const start = this.$dayjs().startOf('month').toDate();
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '当前年',
          onClick: (picker) => {
            const end = this.$dayjs().endOf('year').toDate();
            const start = this.$dayjs().startOf('year').toDate();
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '上一周',
          onClick: (picker) => {
            const end = this.$dayjs().add(-1, 'w').endOf('week').toDate();
            const start = this.$dayjs().add(-1, 'w').startOf('week').toDate();
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '上一月',
          onClick: (picker) => {
            const end = this.$dayjs().add(-1, 'M').endOf('month').toDate();
            const start = this.$dayjs().add(-1, 'M').startOf('month').toDate();
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '上一年',
          onClick: (picker) => {
            const end = this.$dayjs().add(-1, 'y').endOf('year').toDate();
            const start = this.$dayjs().add(-1, 'y').startOf('year').toDate();
            picker.$emit('pick', [start, end]);
          },
        }],
      },
      // 表格数据
      tableData: {
        list: [],
        loading: false,
      },
      dateRange: [this.$dayjs().startOf('week').toDate(),
        this.$dayjs().add(1, 'month').toDate()],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async exportExcel() {
      if (this.dateRange === null) this.dateRange = [];
      const { data } = await ReportService.directorExport({
        startDate: this.dateRange[0],
        endDate: this.dateRange[1],
      });
      this.download(data, '负责人统计导出.xls');
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
      this.tableData.loading = true;
      if (this.dateRange === null) this.dateRange = [];
      const { data } = await ReportService.director({
        startDate: this.dateRange[0],
        endDate: this.dateRange[1],
      });
      this.tableData.list = data;
      this.tableData.loading = false;
    },
    // eslint-disable-next-line consistent-return
    objectSpanMethod({
      rowIndex, columnIndex,
    }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: this.tableData.list.length,
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
