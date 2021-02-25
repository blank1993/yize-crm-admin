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
      :table-props="calc('270px')"
      :data="tableData.list"
      :total="tableData.total"
      :loading="tableData.loading"
      @query-change="tableChange"
    >
      <el-table-column
        align="center"
        label="ID"
        prop="id"
        width="180"
      />

      <el-table-column
        prop="name"
        label="角色名"
        width="180"
      />

      <el-table-column
        label="创建时间"
        width="220"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="remark"
        label="描述"
        min-width="200"
      />

      <el-table-column label="操作" fixed="right" class-name="divider-handle" width="220">
        <template slot-scope="scope">
          <el-button
            v-has="'role:list:edit'"
            type="text"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑
          </el-button>
          <el-button
            v-has="'role:list:setPermission'"
            type="text"
            @click="handleSetPermission(scope.$index, scope.row)"
          >设置权限
          </el-button>
          <el-button
            v-has="'role:list:delete'"
            type="text"
            @click="handleRemove(scope.$index, scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </data-tables-server>

    <!-- 权限分配弹出框 -->
    <el-dialog
      title="权限分配"
      :visible.sync="setPermissionForm.visible"
      @open="openHandler"
      @close="closeHandler"
    >
      <el-tree
        ref="tree"
        style="max-height:450px;overflow-y:auto"
        :data="setPermissionForm.permissionTree"
        show-checkbox
        :expand-on-click-node="false"
        check-on-click-node
        node-key="id"
        default-expand-all
        :props="setPermissionForm.defaultProps"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="setPermissionForm.visible = false">取 消</el-button>
        <el-button type="primary" @click="updatePermission">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑或新建 -->
    <edit-dialog :form-data="roleForm" />
  </div>
</template>

<script>
import RoleService from '@/services/role';
import PermissionService from '@/services/permission';
import EditDialog from './compoment/EditdDialog.vue';

export default {
  name: 'RoleList',
  components: {
    EditDialog,
  },
  data() {
    return {
      setPermissionForm: {
        // 权限树
        permissionTree: [],
        // 角色权限数据
        data: {},
        visible: false,
        // parse 显示字段
        defaultProps: {
          label: 'name',
        },
        // 当前选中角色
        nowSelectedRoleId: '',
      },
      roleForm: {
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
        keyWord: null,
      },
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    tableChange(queryInfo) {
      this.tableData.page = queryInfo.page;
      this.tableData.pageSize = queryInfo.pageSize;
      this.fetchData();
    },
    /**
       * 表格分页查询
       */
    async fetchData() {
      this.tableData.loading = true;
      const { data } = await RoleService.list(
        this.tableData.page,
        this.tableData.pageSize,
        this.tableData.keyWord,
      );
      const { records, total } = data;
      this.tableData.list = records;
      this.tableData.total = total;
      this.tableData.loading = false;
    },
    /**
       * 初始化数据
       */
    async initData() {
      const { data } = await PermissionService.tree();
      this.setPermissionForm.permissionTree = data;
    },
    async handleRemove(index, row) {
      try {
        await this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });
        await RoleService.remove(row.id);
        this.$notify.success({ title: '成功', message: '删除成功', duration: 2500 });
        await this.fetchData();
      } catch (e) {
        this.$notify.info('已取消删除');
      }
    },
    handleAdd() {
      this.roleForm.data.id = null;
      this.roleForm.visible = true;
    },
    handleEdit(index, row) {
      this.roleForm.data.id = row.id;
      this.roleForm.visible = true;
    },
    // 处理权限设置
    async handleSetPermission(index, row) {
      const { data } = await RoleService.findByRoleId(row.id);
      this.setPermissionForm.visible = true;
      this.setPermissionForm.data = data;
      this.setPermissionForm.nowSelectedRoleId = row.id;
    },
    // 权限设置弹窗开启自动勾选
    openHandler() {
      setTimeout(() => {
        for (let i = 0; i < this.setPermissionForm.data.length; i += 1) {
          this.$refs.tree.setChecked(this.setPermissionForm.data[i], true);
        }
      }, 0);
    },
    // 关闭取消勾选全部
    closeHandler() {
      this.$refs.tree.setCheckedKeys([]);
    },
    async updatePermission() {
      await RoleService
        .updateRolePermission(
          this.setPermissionForm.nowSelectedRoleId,
          this.$refs.tree.getCheckedNodes()
            .concat(this.$refs.tree.getHalfCheckedNodes()),
        );
      this.setPermissionForm.visible = false;
      this.$notify.success({ title: '成功', message: '更新成功', duration: 2500 });
    },
  },
};
</script>
