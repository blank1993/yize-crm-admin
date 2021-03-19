<template>
  <div class="app-container">
    <el-row type="flex" style="margin-bottom: 10px">

      <el-col :span="6">
        <el-button-group>
          <el-button type="primary" @click="handleAdd">新增项目</el-button>
          <el-button
            v-if="nowSelect"
            type="primary"
            @click="handleEdit()"
          >编辑
          </el-button>
          <el-button
            v-if="nowSelect"
            type="danger"
            @click="handleRemove()"
          >删除
          </el-button>
        </el-button-group>
      </el-col>


      <el-col :span="18" style="text-align: right">
        计划完成时间：
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
        />
        项目类型:
        <el-select v-model="tableData.params.projectType" clearable placeholder="" style="width: 70px;margin-right: 8px">
          <el-option
            v-for="item in projectTypeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input v-model="tableData.params.keyWord" style="width: 200px" placeholder="请输入搜索内容">
          <el-button slot="append" icon="el-icon-search" @click="fetchData" />
        </el-input>
      </el-col>
    </el-row>

    <div style="margin-bottom: 5px"><span style="font-weight: bold">项目批注：</span>
      <span v-if="nowSelect!=null">{{ nowSelect.comments }}</span>
    </div>

    <el-table
      :data="tableData.list"
      :border="true"
      :cell-style="cellStyle"
      :height="'calc(100vh - 270px)'"
      highlight-current-row
      :loading="tableData.loading"
      @current-change="selectChange"
    >
      <el-table-column
        :resizable="false"
        align="center"
        label="项目类型"
        prop="projectType"
        width="80"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="项目编号"
        prop="projectcCode"
        width="140"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="项目名称"
        prop="projectName"
        width="220"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="联系人"
        prop="contact"
        width="95"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="接收日期"
        prop="recTime"
        width="95"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="提资"
        prop="raiseCapital"
        width="50"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="负责人"
        prop="director"
        width="95"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="设计深度"
        prop="designDepth"
        width="80"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="计划完成时间"
        prop="designDepth"
        width="130"
      >
        <template slot-scope="{row}">
          {{ row.planTime }}{{ row.planTimeHalf }}
        </template>

      </el-table-column>
      <el-table-column
        :resizable="false"
        align="center"
        label="给水估时"
        prop="geishuiTime"
        width="80"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label=" 排水估时 "
        prop="paishuiTime"
        width="80"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="电气估时"
        prop="electricTime"
        width="80"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="水景估时"
        prop="waterscapeTime"
        width="80"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="给水设计"
        prop="geishuiDesign"
        width="95"
      >
        <template slot-scope="{row}">
          <div>
            {{ row.geishuiDesign }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :resizable="false"
        align="center"
        label="实际用时"
        prop="geishuiActulTime"
        width="80"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="给水评分"
        prop="geishuiPoint"
        width="80"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="排水设计"
        prop="paishuiDesign"
        width="95"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="实际用时"
        prop="paishuiActulTime"
        width="80"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="排水评分"
        prop="paishuiPoint"
        width="80"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="电气设计"
        prop="electricDesign"
        width="95"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="实际用时"
        prop="electricActulTime"
        width="80"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="电气评分"
        prop="electricPoint"
        width="80"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="水景设计"
        prop="waterscapeDesign"
        width="95"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="实际用时"
        prop="waterscapeActulTime"
        width="80"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="水景评分"
        prop="waterscapePoint"
        width="80"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="本次泵数"
        prop="pumps"
        width="80"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="项目类别"
        prop="projectCategory"
        width="95"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="难度系数"
        prop="degreeDifficulty"
        width="95"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="水泵总数"
        prop="pumpsTotal"
        width="95"
      />
      <el-table-column
        :resizable="false"
        align="center"
        label="审核意见单"
        width="95"
      >
        <template slot-scope="{row}">
          <el-button v-if="row.examineOpinion" type="text" @click="openInstruction(row.examineOpinion)">打开</el-button>
        </template>
      </el-table-column>
      <el-table-column
        :resizable="false"
        align="center"
        label="合同编号"
        prop="contract"
        width="95"
      />
    </el-table>

    <!-- 编辑或新建 -->
    <edit-dialog :form-data="projectForm" />
  </div>
</template>

<script>
import ProjectService from '@/services/project';
import EditDialog from './compoment/EditdDialog.vue';

export default {
  components: {
    EditDialog,
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '当前周',
          onClick: (picker) => {
            const end = this.$dayjs().endOf('week').toDate();
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
      projectForm: {
        data: {},
        visible: false,
      },
      dateRange: [this.$dayjs().startOf('week').toDate(),
        this.$dayjs().endOf('week').toDate()],
      // 表格数据
      tableData: {
        params: {
          keyWord: null,
          projectType: null,
        },
        list: [],
        loading: false,
      },
      nowSelect: null,
      projectTypeOption: [{ label: '修', value: '修' },
        { label: '新', value: '新' },
        { label: '增', value: '增' }],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    selectChange(row) {
      this.nowSelect = row;
    },
    openInstruction(url) {
      window.location.href = process.env.VUE_APP_BASE_URL + url;
    },
    checkEmpty(data) {
      return data === null || data === undefined || data === '';
    },
    cellStyle(row) {
      const color = 'rgb(128, 0, 128)';
      if (row.column.property === 'geishuiDesign') {
        if (this.checkEmpty(this.tableData.list[row.rowIndex].geishuiTime) === false
          && this.checkEmpty(this.tableData.list[row.rowIndex].geishuiDesign) === true) { return { background: color }; }
      }

      if (row.column.property === 'geishuiActulTime') {
        if (this.checkEmpty(this.tableData.list[row.rowIndex].geishuiTime) === false
          && this.checkEmpty(this.tableData.list[row.rowIndex].geishuiActulTime) === true) { return { background: color }; }
      }

      if (row.column.property === 'geishuiPoint') {
        if (this.checkEmpty(this.tableData.list[row.rowIndex].geishuiTime) === false
          && this.checkEmpty(this.tableData.list[row.rowIndex].geishuiPoint) === true) { return { background: color }; }
      }

      if (row.column.property === 'paishuiDesign') {
        if (this.checkEmpty(this.tableData.list[row.rowIndex].paishuiTime) === false
          && this.checkEmpty(this.tableData.list[row.rowIndex].paishuiDesign) === true) { return { background: color }; }
      }

      if (row.column.property === 'paishuiActulTime') {
        if (this.checkEmpty(this.tableData.list[row.rowIndex].paishuiTime) === false
          && this.checkEmpty(this.tableData.list[row.rowIndex].paishuiActulTime) === true) { return { background: color }; }
      }

      if (row.column.property === 'paishuiPoint') {
        if (this.checkEmpty(this.tableData.list[row.rowIndex].paishuiTime) === false
          && this.checkEmpty(this.tableData.list[row.rowIndex].paishuiPoint) === true) { return { background: color }; }
      }

      if (row.column.property === 'electricDesign') {
        if (this.checkEmpty(this.tableData.list[row.rowIndex].electricTime) === false
          && this.checkEmpty(this.tableData.list[row.rowIndex].electricDesign) === true) { return { background: color }; }
      }

      if (row.column.property === 'electricActulTime') {
        if (this.checkEmpty(this.tableData.list[row.rowIndex].electricTime) === false
          && this.checkEmpty(this.tableData.list[row.rowIndex].electricActulTime) === true) { return { background: color }; }
      }

      if (row.column.property === 'electricPoint') {
        if (this.checkEmpty(this.tableData.list[row.rowIndex].electricTime) === false
          && this.checkEmpty(this.tableData.list[row.rowIndex].electricPoint) === true) { return { background: color }; }
      }

      if (row.column.property === 'waterscapeDesign') {
        if (this.checkEmpty(this.tableData.list[row.rowIndex].waterscapeTime) === false
          && this.checkEmpty(this.tableData.list[row.rowIndex].waterscapeDesign) === true) { return { background: color }; }
      }
      if (row.column.property === 'waterscapeActulTime') {
        if (this.checkEmpty(this.tableData.list[row.rowIndex].waterscapeTime) === false
          && this.checkEmpty(this.tableData.list[row.rowIndex].waterscapeActulTime) === true) { return { background: color }; }
      }
      if (row.column.property === 'waterscapePoint') {
        if (this.checkEmpty(this.tableData.list[row.rowIndex].waterscapeTime) === false
          && this.checkEmpty(this.tableData.list[row.rowIndex].waterscapePoint) === true) { return { background: color }; }
      }
      if (row.column.property === 'pumps') {
        if (this.checkEmpty(this.tableData.list[row.rowIndex].waterscapeDesign) === false
          && this.checkEmpty(this.tableData.list[row.rowIndex].pumps) === true) { return { background: color }; }
      }
      return '';
    },
    /**
     * 表格分页查询
     */
    async fetchData() {
      this.tableData.loading = true;
      if (this.dateRange === null) this.dateRange = [];
      const { data } = await ProjectService
        .list({
          startDate: this.dateRange[0],
          endDate: this.dateRange[1],
          ...this.tableData.params,
        });
      this.tableData.list = data;
    },
    async handleRemove() {
      try {
        await this.$confirm('此操作将删除该项目数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });
        await ProjectService.remove(this.nowSelect.id);
        this.$notify.success({
          title: '成功',
          message: '删除成功',
          duration: 2500,
        });
        await this.fetchData();
      } catch (e) {
        this.$notify.info('已取消删除');
      }
    },
    handleAdd() {
      this.projectForm.data.id = null;
      this.projectForm.visible = true;
    },
    handleEdit() {
      this.projectForm.data.id = this.nowSelect.id;
      this.projectForm.visible = true;
    },
  },
};
</script>
<style type="text/scss" lang="scss" scoped>
.app-container {
  ::v-deep .el-table td{
    padding: 0;
  }
}
</style>
