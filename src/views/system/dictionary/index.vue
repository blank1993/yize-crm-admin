<template>

  <div class="app-container">
    <el-row type="flex" justify="space-between" style="margin-bottom: 10px">
      <el-col>
        <el-button-group>
          <el-button type="primary" @click="addType">新建分类</el-button>
          <el-button type="primary" @click="handleAdd">新建字典</el-button>
        </el-button-group>
      </el-col>
    </el-row>

    <el-row :gutter="15">
      <el-col :sm="8" :md="6">
        <el-menu
          :style="calc('240px')"
          :default-active="active"
          @select="tabSelect"
        >
          <el-menu-item v-for="(item,index) in types" :key="index" :index="index+''">
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :sm="8" :md="18">
        <el-card class="box-card">
          <data-tables-server
            :table-props="calc('320px')"
            :data="tableData.list"
            :total="tableData.total"
            :loading="tableData.loading"
            @query-change="tableChange"
          >
            <el-table-column
              prop="name"
              label="字典名称"
              width="180"
            />
            <el-table-column
              prop="value"
              label="字典值"
            />
            <el-table-column label="操作" class-name="divider-handle" fixed="right" width="150">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑
                </el-button>
                <el-button
                  type="text"
                  @click="handleRemove(scope.$index, scope.row)"
                >删除
                </el-button>
              </template>
            </el-table-column>
          </data-tables-server>
        </el-card>
      </el-col>
    </el-row>
    <!-- 编辑或新建 -->
    <edit-dialog :form-data="dictionaryForm" />

  </div>
</template>

<script>
import DictionaryService from '@/services/dictionary';
import EditDialog from './compoment/EditdDialog.vue';

export default {
  name: 'Dictionary',
  components: {
    EditDialog,
  },
  data() {
    return {
      active: '',
      selectedTab: '',
      types: [],
      dictionaryForm: {
        data: {},
        visible: false,
      },
      // 表格数据
      tableData: {
        list: [],
        total: null,
        loading: false,
        page: 1,
        pageSize: 20,
      },
    };
  },
  mounted() {
    this.tabQuery();
  },
  methods: {
    addType() {
      this.dictionaryForm.data.id = null;
      this.dictionaryForm.data.pid = 0;
      this.dictionaryForm.visible = true;
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
      const { data } = await DictionaryService.list(
        this.tableData.page,
        this.tableData.pageSize,
        this.tableData.sort,
        this.selectedTab,
      );
      const { records, total } = data;
      this.tableData.list = records;
      this.tableData.total = total;
      this.tableData.loading = false;
    },
    async handleRemove(index, row) {
      try {
        await this.$confirm('此操作将删除该Dictionary, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });
        await DictionaryService.remove(row.id);
        this.$notify.success({ title: '成功', message: '删除成功', duration: 2500 });
        await this.fetchData();
      } catch (e) {
        this.$notify.info('已取消删除');
      }
    },
    handleAdd() {
      this.dictionaryForm.data.pid = this.selectedTab;
      this.dictionaryForm.data.id = null;
      this.dictionaryForm.visible = true;
    },
    handleEdit(index, row) {
      this.dictionaryForm.data.id = row.id;
      this.dictionaryForm.visible = true;
    },
    /**
       * 查询字典分类
       */
    async tabQuery() {
      const { data } = await DictionaryService.listTypes();
      this.types = data;
      if (this.types.length !== 0) {
        this.selectedTab = this.types[0].id;
        this.active = '0';
        await this.fetchData();
      }
    },
    tabSelect(index) {
      this.selectedTab = this.types[index].id;
      this.fetchData();
    },
  },
};
</script>
