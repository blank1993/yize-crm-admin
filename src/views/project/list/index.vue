<template>
  <div class="app-container">
    <el-row type="flex" justify="space-between" style="margin-bottom: 10px">
      <el-col>
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

      <el-select v-model="dateRange" style="margin-right: 10px" placeholder="请选择">
        <el-option
          v-for="item in dateOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-col :span="8">
        <el-input v-model="tableData.keyWord" placeholder="请输入项目名">
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
        align="center"
        label=" 项目类型 "
        prop="projectTypeText"
        width="80"
      />
      <el-table-column
        align="center"
        label=" 项目编号 "
        prop="projectcCode"
        width="140"
      />
      <el-table-column
        align="center"
        label=" 项目名称 "
        prop="projectName"
        width="220"
      />
      <el-table-column
        align="center"
        label=" 联系人 "
        prop="contact"
        width="95"
      />
      <el-table-column
        align="center"
        label=" 接收日期 "
        prop="recTime"
        width="95"
      />
      <el-table-column
        align="center"
        label=" 提资 "
        prop="raiseCapital"
        width="95"
      />
      <el-table-column
        align="center"
        label=" 负责人 "
        prop="director"
        width="95"
      />
      <el-table-column
        align="center"
        label=" 设计深度 "
        prop="designDepth"
        width="95"
      />
      <el-table-column
        align="center"
        label=" 给水估时 "
        prop="geishuiTime"
        width="95"
      />
      <el-table-column
        align="center"
        label=" 排水估时 "
        prop="paishuiTime"
        width="95"
      />
      <el-table-column
        align="center"
        label=" 电气估时 "
        prop="electricTime"
        width="95"
      />
      <el-table-column
        align="center"
        label=" 水景估时 "
        prop="waterscapeTime"
        width="95"
      />
      <el-table-column
        align="center"
        label=" 给水设计 "
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
        align="center"
        label=" 给水实际用时 "
        prop="geishuiActulTime"
        width="110"
      />
      <el-table-column
        align="center"
        label=" 给水评分 "
        prop="geishuiPoint"
        width="95"
      />
      <el-table-column
        align="center"
        label=" 排水设计 "
        prop="paishuiDesign"
        width="95"
      />
      <el-table-column
        align="center"
        label=" 排水实际用时 "
        prop="paishuiActulTime"
        width="110"
      />
      <el-table-column
        align="center"
        label=" 排水评分 "
        prop="paishuiPoint"
        width="95"
      />
      <el-table-column
        align="center"
        label=" 电气设计 "
        prop="electricDesign"
        width="95"
      />
      <el-table-column
        align="center"
        label=" 电气实际用时 "
        prop="electricActulTime"
        width="110"
      />
      <el-table-column
        align="center"
        label=" 电气评分 "
        prop="electricPoint"
        width="95"
      />
      <el-table-column
        align="center"
        label=" 水景设计 "
        prop="waterscapeDesign"
        width="95"
      />
      <el-table-column
        align="center"
        label=" 水景实际用时 "
        prop="waterscapeActulTime"
        width="110"
      />
      <el-table-column
        align="center"
        label=" 水景评分 "
        prop="waterscapePoint"
        width="95"
      />
      <el-table-column
        align="center"
        label=" 本次水泵数量 "
        prop="pumps"
        width="110"
      />
      <el-table-column
        align="center"
        label=" 项目类别 "
        prop="projectCategoryText"
        width="95"
      />
      <el-table-column
        align="center"
        label=" 难度系数 "
        prop="degreeDifficulty"
        width="95"
      />
      <el-table-column
        align="center"
        label=" 水泵总数 "
        prop="pumpsTotal"
        width="95"
      />
      <el-table-column
        align="center"
        label="审核意见单"
        width="95"
      >
        <template slot-scope="{row}">
          <el-button v-if="row.examineOpinion" type="text" @click="openInstruction(row.examineOpinion)">打开</el-button>
        </template>
      </el-table-column>
      <el-table-column
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
      dateRange: '1',
      projectForm: {
        data: {},
        visible: false,
      },
      // 表格数据
      tableData: {
        list: [],
        loading: false,
      },
      nowSelect: null,
      dateOption: [{ label: '当前周', value: '1' },
        { label: '当前月', value: '2' },
        { label: '当前年', value: '3' },
        { label: '上一周', value: '4' },
        { label: '上一月', value: '5' },
        { label: '上一年', value: '6' }],
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
      return '';
    },
    /**
     * 表格分页查询
     */
    async fetchData() {
      this.tableData.loading = true;
      const { data } = await ProjectService
        .list(
          this.tableData.keyWord,
        );
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
