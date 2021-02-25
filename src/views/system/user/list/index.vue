<template>
  <div class="app-container">
    <el-row type="flex" justify="space-between" style="margin-bottom: 10px">
      <el-col>
        <el-button-group>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-button-group>
      </el-col>
      <el-col :span="8">
        <el-input v-model="tableData.keyWord" placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search" @click="fetchData" />
        </el-input>
      </el-col>
    </el-row>

    <data-tables-server
      ref="table"
      :table-props="calc('270px')"
      :data="tableData.list"
      :total="tableData.total"
      :loading="tableData.loading"
      @query-change="tableChange"
    >
      <el-table-column
        align="center"
        sortable="custom"
        label="ID"
        prop="id"
        width="180"
      />

      <el-table-column
        prop="username"
        sortable="custom"
        label="用户名"
        width="180"
      />

      <el-table-column
        prop="nickname"
        sortable="custom"
        label="昵称"
        width="180"
      />

      <el-table-column
        prop="createDate"
        sortable="custom"
        label="创建时间"
        min-width="220"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" class-name="divider-handle" width="220">
        <template slot-scope="scope">
          <el-button
            v-has="'user:list:edit'"
            type="text"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑
          </el-button>
          <el-button
            v-has="'user:list:setRole'"
            type="text"
            @click="handleSelectRole(scope.$index, scope.row)"
          >设置角色
          </el-button>
          <el-button
            v-has="'user:list:delete'"
            type="text"
            @click="handleRemove(scope.$index, scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </data-tables-server>

    <!-- 用户角色分配 -->
    <select-role :form-data="selectRoleForm" />

    <!-- 编辑或新建 -->
    <user-edit-dialog :form-data="userForm" />

  </div>
</template>

<script>
import UserService from '@/services/user';
import RoleService from '@/services/role';
import UserEditDialog from './compoment/EditdDialog.vue';
import SelectRole from './compoment/SelectRole.vue';

export default {
  name: 'UserList',
  components: {
    UserEditDialog,
    SelectRole,
  },
  data() {
    return {
      selectRoleForm: {
        // 选择角色下拉
        id: '',
        roleList: [],
        visible: false,
      },
      userForm: {
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
        sort: {},
        keyWord: null,
      },
    };
  },
  activated() {
    this.$refs.table.$refs.elTable.doLayout();
  },
  mounted() {
    this.initData();
  },
  methods: {
    /**
       * 页面或排序改变
       */
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
      const { data } = await UserService
        .list(this.tableData.page,
          this.tableData.pageSize,
          this.tableData.sort,
          this.tableData.keyWord);
      const { records, total } = data;
      this.tableData.list = records;
      this.tableData.total = total;
      this.tableData.loading = false;
    },
    /**
       * 初始化数据
       */
    async initData() {
      const { data } = await RoleService.list();
      this.selectRoleForm.roleList = data.records;
    },
    /**
       * 删除
       */
    async handleRemove(index, row) {
      try {
        await this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });
        await UserService.remove(row.id);
        this.$notify.success({ title: '成功', message: '删除成功', duration: 2500 });
        await this.fetchData();
      } catch (e) {
        this.$notify.info('已取消删除');
      }
    },
    handleEdit(index, row) {
      this.userForm.data.id = row.id;
      this.userForm.visible = true;
    },
    handleAdd() {
      this.userForm.data.id = null;
      this.userForm.visible = true;
    },
    /**
       * 选择角色弹窗
       * @param index
       * @param row
       */
    handleSelectRole(index, row) {
      this.selectRoleForm.id = row.id;
      this.selectRoleForm.visible = true;
    },
  },
};
</script>
