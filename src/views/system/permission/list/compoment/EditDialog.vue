<template>
  <el-dialog :visible.sync="form.visible" :title="form.title" width="40%">
    <el-form v-loading="form.loading" label-width="80px">
      <el-form-item label="上级ID">
        <el-input v-model="form.data.pid" readonly />
      </el-form-item>

      <el-form-item label="权限名">
        <el-input v-model="form.data.name" />
      </el-form-item>
      <el-form-item label="权限编码">
        <el-input v-model="form.data.authority" />
      </el-form-item>

      <el-form-item label="权限类型">
        <el-select v-model="form.data.type" placeholder="请选择活动区域">
          <el-option label="菜单" value="menu" />
          <el-option label="按钮" value="button" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="form.visible = false">取 消</el-button>
      <el-button type="primary" @click="save()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import PermissionService from '@/services/permission';

export default {
  name: 'EditDialog',
  props: {
    formData: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  data() {
    return {
      form: this.formData,
    };
  },
  watch: {
    'form.visible': async function (val) {
      if (val) {
        if (this.form.data.id) {
          this.form.loading = true;
          const { data } = await PermissionService.get(this.form.data.id);
          this.form.title = '编辑';
          this.form.data = data;
          this.form.visible = true;
          this.form.loading = false;
        } else {
          this.form.title = '新增';
          this.form.data.type = 'menu';
          this.form.data = {};
          this.form.data.pid = this.form.pid;
        }
      }
    },
  },
  methods:
      {
        async save() {
          if (this.form.data.id) {
            await PermissionService.update(this.form.data);
            this.$notify.success({ title: '成功', message: '保存成功', duration: 2500 });
            await this.$parent.initData();
            this.form.visible = false;
          } else {
            await PermissionService.add(this.form.data);
            this.$notify.success({ title: '成功', message: '保存成功', duration: 2500 });
            await this.$parent.initData();
            this.form.visible = false;
          }
        },
      },
};
</script>

<style scoped>

</style>
