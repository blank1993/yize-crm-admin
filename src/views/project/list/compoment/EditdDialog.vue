<template>
  <el-dialog class="project-dialog" :visible.sync="form.visible" :title="form.title" width="70%">
    <el-form v-loading="form.loading" label-width="120px">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label=" 项目类型 ">
            <el-select v-model="form.data.projectType" style="width: 100%" placeholder="请选择">
              <el-option
                v-for="item in projectTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 项目编号 ">
            <el-input v-model="form.data.projectcCode" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 项目名称 ">
            <el-input v-model="form.data.projectName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 联系人 ">
            <el-input v-model="form.data.contact" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 接收日期 ">
            <el-date-picker
              v-model="form.data.recTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 提资 ">
            <el-input v-model="form.data.raiseCapital" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 负责人 ">
            <el-input v-model="form.data.director" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 设计深度 ">
            <el-input v-model="form.data.designDepth" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 给水估时 ">
            <el-input-number v-model="form.data.geishuiTime" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 排水估时 ">
            <el-input-number v-model="form.data.paishuiTime" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 电气估时 ">
            <el-input-number v-model="form.data.electricTime" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 水景估时 ">
            <el-input-number v-model="form.data.waterscapeTime" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label=" 给水设计 ">
            <el-input v-model="form.data.geishuiDesign" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label=" 给水实际用时 ">
            <el-input-number v-model="form.data.geishuiActulTime" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label=" 给水评分 ">
            <el-rate v-model="form.data.geishuiPoint" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label=" 排水设计 ">
            <el-input v-model="form.data.paishuiDesign" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label=" 排水实际用时 ">
            <el-input-number v-model="form.data.paishuiActulTime" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label=" 排水评分 ">
            <el-rate v-model="form.data.paishuiPoint" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label=" 电气设计 ">
            <el-input v-model="form.data.electricDesign" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label=" 电气实际用时 ">
            <el-input-number v-model="form.data.electricActulTime" :min="0" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label=" 电气评分 ">
            <el-rate v-model="form.data.electricPoint" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label=" 水景设计 ">
            <el-input v-model="form.data.waterscapeDesign" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label=" 水景实际用时 ">
            <el-input-number v-model="form.data.waterscapeActulTime" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label=" 水景评分 ">
            <el-rate v-model="form.data.waterscapePoint" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 本次水泵数量 ">
            <el-input-number v-model="form.data.pumps" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 项目类别 ">
            <el-select v-model="form.data.projectCategory" style="width: 100%" placeholder="请选择">
              <el-option
                v-for="item in projectCategorys"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 难度系数 ">
            <el-input v-model="form.data.degreeDifficulty" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 水泵总数 ">
            <el-input-number v-model="form.data.pumpsTotal" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="指令单">
            <el-button type="primary" size="small" @click="handleUpload">上传文件</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同编号">
            <el-input v-model="form.data.contract" />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="form.visible = false">取 消</el-button>
      <el-button type="primary" @click="save()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ProjectService from '@/services/project';
import FileService from '@/services/file';

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
      projectTypes: [{ label: '修', value: 1 }, { label: '新', value: 2 }, { label: '增', value: 3 }],
      projectCategorys: [{ label: '商业地产、售楼处、示范区、样板区、展示区', value: 1 }, { label: '住宅', value: 2 }, { label: '公共绿地', value: 3 }, { label: '别墅,其他', value: 4 }],
    };
  },
  watch: {
    'form.visible': async function (val) {
      if (val) {
        if (this.form.data.id) {
          this.form.loading = true;
          const { data } = await ProjectService.get(this.form.data.id);
          this.form.title = '编辑';
          // eslint-disable-next-line guard-for-in
          for (const i in data) {
            if (data[i] === null) data[i] = undefined;
          }
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
  methods: {
    handleUpload() {
      const inputObj = document.createElement('input');
      inputObj.setAttribute('id', 'file');
      inputObj.setAttribute('type', 'file');
      inputObj.setAttribute('name', 'file');
      inputObj.setAttribute('style', 'visibility:hidden');
      inputObj.onchange = this.upload;
      document.body.appendChild(inputObj);
      inputObj.click();
    },
    async upload(e) {
      const { data } = await FileService.upload(e.target.files[0]);
      this.form.data.instruction = data.url;
      this.$notify.success({ title: '成功', message: '上传成功', duration: 2500 });
    },
    async save() {
      if (this.form.data.id) {
        await ProjectService.update(this.form.data);
        this.$notify.success({ title: '成功', message: '保存成功', duration: 2500 });
        await this.$parent.fetchData();
        this.form.visible = false;
      } else {
        await ProjectService.add(this.form.data);
        this.$notify.success({ title: '成功', message: '保存成功', duration: 2500 });
        await this.$parent.fetchData();
        this.form.visible = false;
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.project-dialog {
::v-deep .el-rate{
  margin-top: 8px;
}
}
</style>
