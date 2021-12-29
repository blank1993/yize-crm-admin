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
          <el-button type="primary" @click="handleAdd">新增项目</el-button>
          <el-button v-if="roles[0]==='3'" type="primary" @click="$refs.uploadContent.click()">导入</el-button>
          <el-button v-if="roles[0]==='3'||roles[0]==='4'" type="primary" @click="exportExcel">导出</el-button>
          <el-button
            v-if="nowSelect"
            type="primary"
            @click="handleEdit()"
          >编辑
          </el-button>
          <el-button
            v-if="nowSelect&&(roles[0]!=='2')"
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

    <div style="margin-bottom: 5px">
      <span style="font-weight: bold">项目总数：</span>
      {{ tableData.list.length }}
      <span style="font-weight: bold;margin-left: 10px">项目批注：</span>
      <span v-if="nowSelect!=null">{{ nowSelect.comments }}</span>
    </div>

    <el-table
      ref="singleTable"
      v-loading="tableData.loading"
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
        width="95"
      />
      <el-table-column
        align="center"
        label="接收日期"
        prop="recTime"
        width="80"
      />
      <el-table-column
        align="center"
        label="负责人"
        prop="inCharge"
        width="60"
      />
      <el-table-column
        align="center"
        label="计划完成时间"
        prop="planTime"
        width="110"
      >
        <template slot-scope="{row}">
          <div :style="{color:row.finish==='否'?'red':''}">{{ row.planTime }}{{ row.planTimeHalf }}</div>
        </template>

      </el-table-column>
      <el-table-column
        align="center"
        label="方案设计"
        prop="design"
        width="95"
      />
      <el-table-column
        align="center"
        label="概念方案"
        prop="programme"
        width="95"
      />
      <el-table-column
        align="center"
        label="模型测试"
        prop="test"
        width="95"
      />
      <el-table-column
        align="center"
        label="仿真模拟"
        prop="simulation"
        width="95"
      />
      <el-table-column
        align="center"
        label="动画"
        prop="animation"
        width="95"
      />
      <el-table-column
        align="center"
        label=" CAD图纸 "
        prop="drawing"
        width="95"
      />
      <el-table-column
        align="center"
        label="施工验收"
        prop="acceptance"
        width="95"
      />
      <el-table-column
        v-if="roles[0]==='3'||roles[0]==='4'"
        align="center"
        label="总价万"
        prop="totalPrice"
        width="95"
      />
      <el-table-column
        v-if="roles[0]==='3'||roles[0]==='4'"
        align="center"
        label="合同进度"
        prop="progress"
      >
        <template slot-scope="{row}">
          <div :style="{color:row.progress!=='已签订'?'red':''}">
            {{ row.progress }}
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑或新建 -->
    <edit-dialog :form-data="specialDesignForm" />

    <div id="menu">
      <div v-for="(item,index) in menus" :key="index" class="menu" @click.stop="infoClick(index)">{{ item }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SpecialDesignService from '@/services/specialDesign';
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
      specialDesignForm: {
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
    infoClick(index) {
      if (index === 0) window.location.reload();
      if (index === 1) this.handleEdit();
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
    async exportExcel() {
      const { data } = await SpecialDesignService.exportExcel({
        startDate: this.dateRange[0],
        endDate: this.dateRange[1],
        ...this.tableData.params,
      });
      this.download(data, '导出.xls');
    },
    async uploadChange(e) {
      const file = e.target.files[0];
      if (file == null) return;
      const { data } = await SpecialDesignService.importSpecialDesign(file);
      window.confirm(data);
      this.$refs.uploadContent.value = '';
    },
    selectChange(row) {
      this.nowSelect = row;
    },
    tableChange(queryInfo) {
      this.tableData.sort = queryInfo.sort;
      this.tableData.page = queryInfo.page;
      this.tableData.pageSize = queryInfo.pageSize;
      this.fetchData();
    },
    /**
       * 表格分页查询
       */
    async fetchData() {
      this.tableData.loading = true;
      if (this.dateRange === null) this.dateRange = [];
      const { data } = await SpecialDesignService
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
        await this.$confirm('此操作将删除该专项设计, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });
        await SpecialDesignService.remove(this.nowSelect.id);
        this.$notify.success({ title: '成功', message: '删除成功', duration: 2500 });
        await this.fetchData();
      } catch (e) {
        this.$notify.info('已取消删除');
      }
    },
    handleAdd() {
      this.specialDesignForm.data.id = null;
      this.specialDesignForm.visible = true;
    },
    handleEdit() {
      this.specialDesignForm.data.id = this.nowSelect.id;
      this.specialDesignForm.visible = true;
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
  },
};
</script>
<style type="text/scss" lang="scss" scoped>
.app-container {
  background: $--background-color-base;

  ::v-deep .el-table td {
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
