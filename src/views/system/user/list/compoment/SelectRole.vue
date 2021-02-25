<template>
  <el-dialog :visible.sync="form.visible" title="角色分配" width="40%">
    <el-form>
      <el-form-item label="已设置角色" />
      <el-select v-model="form.ids" multiple placeholder="请选择" style="width: 100%">
        <el-option
          v-for="item in form.roleList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="form.visible = false">取 消</el-button>
      <el-button type="primary" @click="updateRole">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import UserService from '@/services/user';

export default {
  name: 'SelectRole',
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
        const { data } = await UserService.getRolesByUserId(this.form.id);
        this.form.ids = data;
        this.form.visible = true;
      }
    },
  },
  methods:
      {
        async updateRole() {
          await UserService.updateUserRole(this.form.id, this.form.ids);
          this.$notify.success({ title: '成功', message: '保存成功', duration: 2500 });
          this.form.visible = false;
        },
      },
};
</script>

<style scoped>

</style>
