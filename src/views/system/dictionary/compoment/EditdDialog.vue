<template>
  <el-dialog :visible.sync="form.visible" :title="form.title" width="40%">
    <el-form v-loading="form.loading">
      <el-form-item v-if="form.data.pid!==0" label="字典名">
        <el-input v-model="form.data.name" />
      </el-form-item>
      <el-form-item v-if="form.data.pid!==0" label="字典值">
        <el-input v-model="form.data.value" />
      </el-form-item>
      <el-form-item v-if="form.data.pid===0" label="分类名">
        <el-input v-model="form.data.name" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="form.visible = false">取 消</el-button>
      <el-button type="primary" @click="save()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import DictionaryService from '@/services/dictionary';

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
          const { data } = await DictionaryService.get(this.form.data.id);
          this.form.title = '编辑';
          this.form.data = data;
          this.form.visible = true;
          this.form.loading = false;
        } else {
          // 新增分类
          const { pid } = this.form.data;
          if (this.form.data.pid === 0) {
            this.form.title = '新增分类';
          } else {
            this.form.title = '新增';
          }
          this.form.data = {};
          this.form.data.pid = pid;
        }
      }
    },
  },
  methods: {
    async save() {
      if (this.form.data.id) {
        await DictionaryService.update(this.form.data);
        this.$notify.success({ title: '成功', message: '保存成功', duration: 2500 });
        await this.$parent.fetchData();
        this.form.visible = false;
      } else {
        await DictionaryService.add(this.form.data);
        this.$notify.success({ title: '成功', message: '保存成功', duration: 2500 });
        if (this.form.data.pid === 0) {
          await this.$parent.tabQuery();
        } else {
          await this.$parent.fetchData();
        }
        this.form.visible = false;
      }
    },
  },
};
</script>
