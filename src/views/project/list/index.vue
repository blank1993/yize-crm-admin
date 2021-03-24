<template>
  <div class="app-container" @click="clickTableRow">
    <el-row type="flex" style="margin-bottom: 10px">

      <input
        ref="uploadContent"
        type="file"
        accept=".xls"
        style="display: none"
        @change="uploadChange"
      >
      <el-col :span="7">
        <el-button-group>
          <el-button v-if="roles[0]==='1'||roles[0]==='3'" type="primary" @click="handleAdd">新增项目</el-button>
          <el-button v-if="roles[0]==='3'" type="primary" @click="$refs.uploadContent.click()">导入</el-button>
          <el-button v-if="roles[0]==='3'||roles[0]==='4'" type="primary" @click="exportExcel">导出</el-button>
          <el-button
            v-if="nowSelect"
            type="primary"
            @click="handleEdit()"
          >编辑
          </el-button>
          <el-button
            v-if="nowSelect&&(roles[0]==='1'||roles[0]==='3')"
            type="danger"
            @click="handleRemove()"
          >删除
          </el-button>
        </el-button-group>
      </el-col>

      <el-col :span="17" style="text-align: right">
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
      ref="singleTable"
      v-loading="tableData.loading"
      :cell-style="cellStyle"
      :data="tableData.list"
      :border="true"
      :height="'calc(100vh - 270px)'"
      highlight-current-row
      @row-contextmenu="rightClick"
      @current-change="selectChange"
    >
      <el-table-column

        align="center"
        label="项目类型"
        prop="projectType"
        width="35"
      />
      <el-table-column

        align="center"
        label="项目编号"
        prop="projectcCode"
        width="120"
      />
      <el-table-column

        align="center"
        label="项目名称"
        prop="projectName"
        width="220"
      />
      <el-table-column

        align="center"
        label="联系人"
        prop="contact"
        width="60"
      />
      <el-table-column

        align="center"
        label="接收日期"
        prop="recTime"
        width="80"
      />
      <el-table-column

        align="center"
        label="提资"
        prop="raiseCapital"
        width="35"
      />
      <el-table-column

        align="center"
        label="负责人"
        prop="director"
        width="60"
      />
      <el-table-column

        align="center"
        label="设计深度"
        prop="designDepth"
        width="60"
      />
      <el-table-column
        align="center"
        label="计划完成时间"
        prop="planTime"
        width="110"
      >
        <template slot-scope="{row}">
          {{ row.planTime }}{{ row.planTimeHalf }}
        </template>

      </el-table-column>
      <el-table-column
        v-if="roles[0]!=='2'"
        align="center"
        label="给水估时"
        prop="geishuiTime"
        width="35"
      />
      <el-table-column
        v-if="roles[0]!=='2'"
        align="center"
        label=" 排水估时 "
        prop="paishuiTime"
        width="35"
      />
      <el-table-column
        v-if="roles[0]!=='2'"
        align="center"
        label="电气估时"
        prop="electricTime"
        width="35"
      />
      <el-table-column
        v-if="roles[0]!=='2'"
        align="center"
        label="水景估时"
        prop="waterscapeTime"
        width="35"
      />
      <el-table-column
        align="center"
        label="给水设计"
        prop="geishuiDesign"
        width="80"
      >
        <template slot-scope="{row}">
          <div>
            {{ row.geishuiDesign }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="roles[0]!=='1'"
        align="center"
        label="实际用时"
        prop="geishuiActulTime"
        width="35"
      />
      <el-table-column
        v-if="roles[0]!=='2'"
        align="center"
        label="给水评分"
        prop="geishuiPoint"
        width="35"
      />
      <el-table-column
        align="center"
        label="排水设计"
        prop="paishuiDesign"
        width="80"
      />
      <el-table-column
        v-if="roles[0]!=='1'"
        align="center"
        label="实际用时"
        prop="paishuiActulTime"
        width="35"
      />
      <el-table-column
        v-if="roles[0]!=='2'"
        align="center"
        label="排水评分"
        prop="paishuiPoint"
        width="35"
      />
      <el-table-column
        align="center"
        label="电气设计"
        prop="electricDesign"
        width="80"
      />
      <el-table-column
        v-if="roles[0]!=='1'"
        align="center"
        label="实际用时"
        prop="electricActulTime"
        width="35"
      />
      <el-table-column
        v-if="roles[0]!=='2'"
        align="center"
        label="电气评分"
        prop="electricPoint"
        width="35"
      />
      <el-table-column
        align="center"
        label="水景设计"
        prop="waterscapeDesign"
        width="80"
      />
      <el-table-column
        v-if="roles[0]!=='1'"
        align="center"
        label="实际用时"
        prop="waterscapeActulTime"
        width="35"
      />
      <el-table-column
        v-if="roles[0]!=='2'"
        align="center"
        label="水景评分"
        prop="waterscapePoint"
        width="35"
      />
      <el-table-column
        align="center"
        label="本次泵数"
        prop="pumps"
        width="35"
      />
      <el-table-column
        align="center"
        label="项目类别"
        prop="projectCategory"
        width="80"
      />
      <el-table-column
        v-if="roles[0]==='3'||roles[0]==='4'"
        align="center"
        label="难度系数"
        prop="degreeDifficulty"
        width="35"
      />
      <el-table-column
        align="center"
        label="水泵总数"
        prop="pumpsTotal"
        width="35"
      />
      <el-table-column
        align="center"
        label="审核意见单"
        width="50"
      >
        <template slot-scope="{row}">
          <el-button v-if="row.examineOpinion" type="text" @click="openInstruction(row.examineOpinion)">打开</el-button>
        </template>
      </el-table-column>
      <el-table-column
        v-if="roles[0]==='3'||roles[0]==='4'"
        align="center"
        label="合同编号"
        prop="contract"
        width="80"
      />
    </el-table>
    <!-- 编辑或新建 -->
    <edit-dialog :form-data="projectForm" />
    <div id="menu">
      <div v-for="(item,index) in menus" :key="index" class="menu" @click.stop="infoClick(index)">{{ item }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
      projectForm: {
        data: {},
        visible: false,
      },
      dateRange: [this.$dayjs().startOf('week').toDate(),
        this.$dayjs().add(1, 'month').toDate()],
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
      menus: ['刷新', '编辑'],
      projectTypeOption: [{ label: '修', value: '修' },
        { label: '新', value: '新' },
        { label: '增', value: '增' }],
    };
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
    ]),
  },
  mounted() {
    this.fetchData();
  },
  methods: {
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
    async exportExcel() {
      const { data } = await ProjectService.exportExcel({
        startDate: this.dateRange[0],
        endDate: this.dateRange[1],
        ...this.tableData.params,
      });
      this.download(data, '导出.xls');
    },
    infoClick(index) {
      if (index === 0) window.location.reload();
      if (index === 1) this.handleEdit();
    },
    clickTableRow() {
      const menu = document.querySelector('#menu');
      menu.style.display = 'none';
    },
    rightClick(row, column, event) {
      const menu = document.querySelector('#menu');
      event.ignore = 'true';
      // 根据事件对象中鼠标点击的位置，进行定位
      menu.style.left = `${event.clientX}px`;
      menu.style.top = `${event.clientY}px`;
      // 改变自定义菜单的隐藏与显示
      menu.style.display = 'block';
      // 获取当前右键点击table下标
      // eslint-disable-next-line consistent-return
      this.tableData.list.forEach((item) => {
        if (item.name === row.name) {
          this.$refs.singleTable.setCurrentRow(row);
          return false;
        }
      });
    },
    async uploadChange(e) {
      const file = e.target.files[0];
      if (file == null) return;
      const { data } = await ProjectService.importProject(file);
      window.confirm(data);
      this.$refs.uploadContent.value = '';
    },
    selectChange(row) {
      this.nowSelect = row;
    },
    openInstruction(url) {
      window.location.href = process.env.VUE_APP_BASE_URL + url;
    },
    checkEmpty(data) {
      return data === null || data === undefined || data === '' || data === 0;
    },
    checkEmpty2(data) {
      return data === null || data === undefined || data === '';
    },
    cellStyle(row) {
      const color = 'rgb(128,128, 128)';
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
          && this.checkEmpty2(this.tableData.list[row.rowIndex].geishuiPoint) === true) { return { background: color }; }
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
          && this.checkEmpty2(this.tableData.list[row.rowIndex].paishuiPoint) === true) { return { background: color }; }
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
          && this.checkEmpty2(this.tableData.list[row.rowIndex].electricPoint) === true) { return { background: color }; }
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
          && this.checkEmpty2(this.tableData.list[row.rowIndex].waterscapePoint) === true) { return { background: color }; }
      }
      if (row.column.property === 'pumps') {
        if (this.checkEmpty(this.tableData.list[row.rowIndex].waterscapeDesign) === false
          && this.checkEmpty(this.tableData.list[row.rowIndex].pumps) === true) { return { background: color }; }
      }
      if (row.column.property === 'planTime') {
        if (this.tableData.list[row.rowIndex].finish === '否') { return { color: 'red' }; }
      }
      if (row.column.property === 'projectName') {
        if (this.tableData.list[row.rowIndex].examine === '是') {
          if (this.checkEmpty(this.tableData.list[row.rowIndex].examineTime) === true
            || this.checkEmpty(this.tableData.list[row.rowIndex].examineUser) === true) { return { color: 'red' }; }
        }
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
      this.tableData.loading = false;
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
        console.log(e);
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
  background: $--background-color-base;
  ::v-deep .el-table td{
    padding: 0;
  }

  #menu {
    width: 60px;
    height: 50px;
    overflow: hidden; /*隐藏溢出的元素*/
    box-shadow: 0 1px 1px #888, 1px 0 1px #ccc;
    position: fixed;
    display: none;
    background: #ffffff;
    z-index: 10;
  }

  .menu {
    width: 125px;
    height: 25px;
    line-height: 25px;
    text-indent: 10px;
    cursor: pointer;
  }
}
</style>
