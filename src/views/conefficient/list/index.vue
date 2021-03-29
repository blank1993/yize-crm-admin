<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom: 15px" @click="save">保存修改</el-button>
    <el-row style="margin-bottom: 10px" :gutter="8">
      <el-col :span="2" :offset="2">给水</el-col>
      <el-col :span="2">排水</el-col>
      <el-col :span="2">电气</el-col>
      <el-col :span="2">水景</el-col>
      <el-col :span="2">负责人</el-col>
    </el-row>
    <el-row style="margin-bottom: 10px" :gutter="8">
      <el-col :span="2">新增项目</el-col>
      <el-col :span="2"><el-input v-model="form.新增项目给水" size="small" /></el-col>
      <el-col :span="2"><el-input v-model="form.新增项目排水" size="small" /></el-col>
      <el-col :span="2"><el-input v-model="form.新增项目电气" size="small" /></el-col>
      <el-col :span="2"><el-input v-model="form.新增项目水景" size="small" /></el-col>
      <el-col :span="2"><el-input v-model="form.新增项目负责人" size="small" /></el-col>
    </el-row>
    <el-row style="margin-bottom: 10px" :gutter="8">
      <el-col :span="2">修改项目</el-col>
      <el-col :span="2"><el-input v-model="form.修改项目给水" size="small" /></el-col>
      <el-col :span="2"><el-input v-model="form.修改项目排水" size="small" /></el-col>
      <el-col :span="2"><el-input v-model="form.修改项目电气" size="small" /></el-col>
      <el-col :span="2"><el-input v-model="form.修改项目水景" size="small" /></el-col>
      <el-col :span="2"><el-input v-model="form.修改项目负责人" size="small" /></el-col>
    </el-row>
    <el-row style="margin-bottom: 10px" :gutter="8">
      <el-col :span="2">产值</el-col>
      <el-col :span="2"><el-input v-model="form.产值给水" size="small" /></el-col>
      <el-col :span="2"><el-input v-model="form.产值排水" size="small" /></el-col>
      <el-col :span="2"><el-input v-model="form.产值电气" size="small" /></el-col>
      <el-col :span="2"><el-input v-model="form.产值水景" size="small" /></el-col>
      <el-col :span="2"><el-input v-model="form.产值负责人" size="small" /></el-col>
    </el-row>
  </div>
</template>

<script>
import CoefficientService from '@/services/coefficient';

export default {
  components: {
  },
  data() {
    return {
      form: {
        新增项目给水: 0,
        新增项目排水: 0,
        新增项目电气: 0,
        新增项目水景: 0,
        新增项目负责人: 0,
        修改项目给水: 0,
        修改项目排水: 0,
        修改项目电气: 0,
        修改项目水景: 0,
        修改项目负责人: 0,
        产值给水: 0,
        产值排水: 0,
        产值电气: 0,
        产值水景: 0,
        产值负责人: 0,
      },
    };
  },
  async mounted() {
    const { data } = await CoefficientService.list();
    if (data) this.form = data;
  },
  methods: {
    async save() {
      await CoefficientService.update(this.form);
      this.$notify.success({ title: '成功', message: '保存修改成功', duration: 2500 });
    },
  },
};
</script>
<style type="text/scss" lang="scss" scoped>
.app-container {
  ::v-deep .el-table td{
    padding: 0;
  }
}
</style>
