<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-button type="primary" style="margin-bottom:15px" @click="handleAdd()">增加顶级权限</el-button>

      <el-tree
        :data="permissionForm.permissionTree"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>
            <i v-if="data.type==='menu'" class="el-icon-menu" />
            <i v-else class="el-icon-news" />
            {{ data.name }}
          </span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => handleAdd(data.id)"
            >
              增加下级
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => handleEdit(data)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)"
            >
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </el-card>

    <!-- 编辑或新建 -->
    <permission-edit-dialog :form-data="permissionForm" />
  </div>

</template>

<script>
import PermissionService from '@/services/permission';
import PermissionEditDialog from './compoment/EditDialog.vue';

export default {
  name: 'PermissionList',
  components: { PermissionEditDialog },
  data() {
    return {
      permissionForm: {
        // 权限树
        permissionTree: [],
        // 角色权限数据
        data: {},
        visible: false,
      },
    };
  },
  created() {
    this.initData();
  },
  methods: {
    /**
       * 初始化数据
       */
    async initData() {
      const { data } = await PermissionService.tree();
      this.permissionForm.permissionTree = data;
    },
    async remove(node, row) {
      try {
        await this.$confirm('此操作将删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });
        await PermissionService.remove(row.id);
        this.$notify.success({ title: '成功', message: '删除成功', duration: 2500 });
        await this.initData();
      } catch (e) {
        this.$notify.info('已取消删除');
      }
    },
    handleAdd(id) {
      if (id) {
        this.permissionForm.pid = id;
      } else {
        this.permissionForm.pid = 0;
      }
      this.permissionForm.data.id = null;
      this.permissionForm.visible = true;
    },
    handleEdit(row) {
      this.permissionForm.data.id = row.id;
      this.permissionForm.visible = true;
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .app-container {
    background-color: $--background-color-base;
  }
</style>
