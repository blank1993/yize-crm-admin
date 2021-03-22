<template>
  <el-dialog :visible.sync="form.visible" :title="form.title" width="40%">
    <el-form v-loading="form.loading">
      <el-form-item label="用户名">
        <el-input v-model="form.data.username" />
      </el-form-item>

      <el-form-item label="机器标识">
        <el-input v-model="form.data.machineCode" />
      </el-form-item>
      <el-form-item label="机器标识备用">
        <el-input v-model="form.data.machineCode2" />
      </el-form-item>
      <el-form-item label="权限级别">
        <el-select
          v-model="form.data.power"
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in powers"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
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
import UserService from '@/services/user';

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
      powers: [{ label: '项目负责人', value: '1' }, { label: '末端设计人员', value: '2' }, { label: '超级管理员', value: '3' }, { label: '行政人员', value: '4' }],
      form: this.formData,
    };
  },
  watch: {
    'form.visible': async function (val) {
      if (val) {
        if (this.form.data.id) {
          this.form.loading = true;
          const { data } = await UserService.get(this.form.data.id);
          this.form.title = '编辑';
          this.form.data = data;
          this.form.visible = true;
          this.form.loading = false;
        } else {
          this.form.title = '新增';
          this.form.data = {};
        }
      }
    },
  },
  methods:
      {
        async save() {
          if (this.form.data.id) {
            await UserService.update(this.form.data);
            this.$notify.success({ title: '成功', message: '保存成功', duration: 2500 });
            await this.$parent.fetchData();
            this.form.visible = false;
          } else {
            await UserService.add(this.form.data);
            this.$notify.success({ title: '成功', message: '保存成功', duration: 2500 });
            await this.$parent.fetchData();
            this.form.visible = false;
          }
        },
      },
};
</script>

<style scoped>

</style>
