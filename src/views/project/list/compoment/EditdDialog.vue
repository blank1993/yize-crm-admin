<template>
  <el-dialog v-if="form.visible" class="project-dialog" :visible.sync="form.visible" :title="form.title" width="1100px">
    <el-form v-loading="form.loading" size="medium" label-width="120px">
      <el-row :gutter="2">
        <el-col :span="8">
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
        <el-col :span="8">
          <el-form-item label=" 项目编号 ">
            <el-input v-model="form.data.projectcCode" @change="projectChange" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label=" 接收日期 ">
            <el-date-picker
              v-model="form.data.recTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label=" 项目名称 ">
            <el-input v-model="form.data.projectName" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label=" 联系人 ">
            <el-input v-model="form.data.contact" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label=" 负责人 ">
            <el-input v-model="form.data.director" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label=" 提资 ">
            <el-select v-model="form.data.raiseCapital" placeholder="请选择">
              <el-option
                v-for="item in raiseCapitalList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label=" 设计深度 ">
            <el-select v-model="form.data.designDepth" placeholder="请选择">
              <el-option
                v-for="item in designDepthList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="计划完成日期">
            <el-date-picker v-model="form.data.finish" type="date" />
            <el-radio-group style="margin-left: 10px">
              <el-radio>上午</el-radio>
              <el-radio>下午</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="是否完成">
            <el-select v-model="form.data.finish" style="width: 100%" placeholder="请选择">
              <el-option
                v-for="item in tOrfList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="是否需要审核">
            <el-select v-model="form.data.examine" style="width: 100%" placeholder="请选择">
              <el-option
                v-for="item in tOrfList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label=" 给水估时 ">
            <el-input-number v-model="form.data.geishuiTime" size="small" :step="0.1" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label=" 排水估时 ">
            <el-input-number v-model="form.data.paishuiTime" size="small" :step="0.1" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label=" 电气估时 ">
            <el-input-number v-model="form.data.electricTime" size="small" :step="0.1" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label=" 水景估时 ">
            <el-input-number v-model="form.data.waterscapeTime" size="small" :step="0.1" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label=" 给水设计 ">
            <el-input v-model="form.data.geishuiDesign" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label=" 排水设计 ">
            <el-input v-model="form.data.paishuiDesign" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label=" 电气设计 ">
            <el-input v-model="form.data.electricDesign" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label=" 水景设计 ">
            <el-input v-model="form.data.waterscapeDesign" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label=" 给水评分 ">
            <el-select v-model="form.data.geishuiPoint" placeholder="请选择">
              <el-option
                v-for="item in pointList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label=" 排水评分 ">
            <el-select v-model="form.data.paishuiPoint" placeholder="请选择">
              <el-option
                v-for="item in pointList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label=" 电气评分 ">
            <el-select v-model="form.data.electricPoint" placeholder="请选择">
              <el-option
                v-for="item in pointList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label=" 水景评分 ">
            <el-select v-model="form.data.waterscapePoint" placeholder="请选择">
              <el-option
                v-for="item in pointList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>


        <el-col :span="16">
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

        <el-col :span="8">
          <el-form-item label=" 是否有结构设计 ">
            <el-select v-model="form.data.structure" placeholder="请选择">
              <el-option
                v-for="item in tOrfList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="项目批注">
            <el-input v-model="form.data.comments" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label=" 给水实际用时 ">
            <el-input-number v-model="form.data.geishuiActulTime" size="small" :step="0.1" :min="0" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label=" 排水实际用时 ">
            <el-input-number v-model="form.data.paishuiActulTime" size="small" :step="0.1" :min="0" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label=" 电气实际用时 ">
            <el-input-number v-model="form.data.electricActulTime" size="small" :step="0.1" :min="0" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label=" 水景实际用时 ">
            <el-input-number v-model="form.data.waterscapeActulTime" size="small" :step="0.1" :min="0" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="本次水泵数量">
            <el-input-number v-model="form.data.pumps" size="small" :min="0" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="水泵总数">
            <el-input-number v-model="form.data.pumpsTotal" size="small" :min="0" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="审核人">
            <el-input v-model="form.data.examineUser" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="审核日期">
            <el-date-picker v-model="form.data.examineTime" type="date" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="审核意见单">
            <el-button v-if="form.data.examineOpinion" size="small" type="text" @click="openInstruction(form.data.examineOpinion)">查看</el-button>
            <el-button v-if="form.data.examineOpinion" type="danger" size="small" @click="form.data.examineOpinion=null">删除</el-button>
            <el-button v-else type="primary" size="small" @click="handleUpload">上传文件</el-button>
          </el-form-item>
        </el-col>


        <el-col :span="8">
          <el-form-item label="难度系数">
            <el-input v-model="form.data.degreeDifficulty" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="设计费用（万）">
            <el-input v-model="form.data.designCost" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="合同编号">
            <el-input v-model="form.data.contract" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="结构设计">
            <el-input v-model="form.data.structuralDesign" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="结构单价A3(元)">
            <el-input v-model="form.data.structurePrice" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="合同信息">
            <el-button type="primary" size="small" @click="viewContract">查看</el-button>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="图纸张数A3">
            <el-input-number v-model="form.data.drawingNum" size="small" :min="0" />
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
import { mapGetters } from 'vuex';
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
      raiseCapitalList: [{ label: '全', value: '全' }, { label: '不全', value: '不全' }],
      pointList: [{ label: '-2', value: '-2' },
        { label: '-1', value: '-1' },
        { label: '0', value: '0' },
        { label: '1', value: '1' },
        { label: '2', value: '2' }],
      tOrfList: [{ label: '是', value: '是' }, { label: '否', value: '否' }],
      projectTypes: [{ label: '修', value: 1 }, { label: '新', value: 2 }, { label: '增', value: 3 }],
      projectCategorys: [{ label: '商业地产', value: 1 },
        { label: '售楼处', value: 2 },
        { label: '示范区', value: 3 },
        { label: '样板区', value: 4 },
        { label: '展示区住宅公共绿地别墅', value: 5 },
        { label: '其他', value: 6 }],
      designDepthList: [{ label: '施工', value: '施工' },
        { label: '扩初', value: '扩初' },
        { label: '绿建', value: '绿建' },
        { label: '报建', value: '报建' },
        { label: '方案', value: '方案' }],
    };
  },
  computed: {
    ...mapGetters([
      'name',
    ]),
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
          this.form.data = {
            director: this.name,
          };
        }
      }
    },
  },
  methods: {
    openInstruction(url) {
      window.location.href = process.env.VUE_APP_BASE_URL + url;
    },
    viewContract() {
      this.$notify.warning({ title: '警告', message: '还未有合同模块', duration: 2500 });
    },
    async projectChange() {
      if (!this.form.data.id) {
        const { data } = await ProjectService.listByCode(this.form.data.projectcCode);
        if (data) {
          this.form.data.pumpsTotal = data.pumpsTotal;
          this.form.data.contract = data.contract;
          this.form.data.projectName = data.projectName;
          this.form.data.contact = data.contact;
          this.form.data.geishuiDesign = data.geishuiDesign;
          this.form.data.paishuiDesign = data.paishuiDesign;
          this.form.data.electricDesign = data.electricDesign;
          this.form.data.waterscapeDesign = data.waterscapeDesign;
        }
      }
    },
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
      this.form.data.examineOpinion = data.url;
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
