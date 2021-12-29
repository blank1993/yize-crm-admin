<template>
  <el-dialog
    v-if="form.visible"
    v-dialogDrag
    :close-on-click-modal="false"
    class="specialDesign-dialog"
    :visible.sync="form.visible"
    :title="form.title"
    width="1100px"
  >
    <el-form v-loading="form.loading" size="medium" label-width="120px">

      <template>
        <el-col :span="8">
          <el-form-item label=" 项目类型 ">
            <el-select
              v-model="form.data.projectType"
              style="width: 100%"
              placeholder="请选择"
            >
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
            <el-input
              v-model="form.data.projectcCode"
              @input="form.data.projectcCode=form.data.projectcCode.toUpperCase()"
              @change="projectChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label=" 接收日期 ">
            <el-date-picker
              v-model="form.data.recTime"
              :editable="false"
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
        <el-col :span="8">
          <el-form-item label=" 联系人 ">
            <el-input v-model="form.data.contact" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="施工图负责人">
            <el-input v-model="form.data.inCharge" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="方案设计">
            <el-input v-model="form.data.design" />
          </el-form-item>
        </el-col>


        <el-col :span="24">
          <el-form-item label="计划完成日期">
            <el-date-picker
              v-model="form.data.planTime"
              :editable="false"
              value-format="yyyy-MM-dd"
              type="date"
              style="width: 140px"
            />
            <el-radio-group
              v-model="form.data.planTimeHalf"
              style="margin-left: 10px"
            >
              <el-radio label="上午">上午</el-radio>
              <el-radio label="下午">下午</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="是否完成">
            <el-select
              v-model="form.data.finish"
              style="width: 100%"
              placeholder="请选择"
            >
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

        <el-col :span="4">
          <el-form-item label-width="0">
            <div>概念方案</div>
            <el-select
              v-model="form.data.programme"
              style="width: 100%"
              placeholder="请选择"
            >
              <el-option
                v-for="item in designList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0">
            <div>模型测试</div>
            <el-select
              v-model="form.data.test"
              style="width: 100%"
              placeholder="请选择"
            >
              <el-option
                v-for="item in designList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0">
            <div>仿真模拟</div>
            <el-select
              v-model="form.data.simulation"
              style="width: 100%"
              placeholder="请选择"
            >
              <el-option
                v-for="item in designList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0">
            <div>动画</div>
            <el-select
              v-model="form.data.animation"
              style="width: 100%"
              placeholder="请选择"
            >
              <el-option
                v-for="item in designList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0">
            <div>CAD图纸</div>
            <el-select
              v-model="form.data.drawing"
              style="width: 100%"
              placeholder="请选择"
            >
              <el-option label="" value="" />
              <el-option label="扩初" value="扩初" />
              <el-option label="招标图" value="招标图" />
              <el-option label="施工前" value="施工前" />
              <el-option label="施工蓝图" value="施工蓝图" />
              <el-option label="施变更" value="施变更" />
              <el-option label="竣工图" value="竣工图" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0">
            <div>施工验收</div>
            <el-select
              v-model="form.data.acceptance"
              style="width: 100%"
              placeholder="请选择"
            >
              <el-option label="" value="" />
              <el-option label="报告已出" value="报告已出" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col v-if="roles[0]==='3'||roles[0]==='4'" :span="8">
          <el-form-item label="合同总价万">
            <el-input v-model="form.data.totalPrice" />
          </el-form-item>
        </el-col>

        <el-col v-if="roles[0]==='3'||roles[0]==='4'" :span="8">
          <el-form-item label="合同进度">
            <el-select
              v-model="form.data.progress"
              style="width: 100%"
              placeholder="请选择"
            >
              <el-option label="已签订" value="已签订" />
              <el-option label="进行中" value="进行中" />
              <el-option label="无合同" value="无合同" />
            </el-select>
          </el-form-item>
        </el-col>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="form.visible = false">取 消</el-button>
      <el-button type="primary" @click="save()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import SpecialDesignService from '@/services/specialDesign';

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
      tOrfList: [{
        label: '是',
        value: '是',
      }, {
        label: '否',
        value: '否',
      }],
      projectTypes: [{
        label: '修',
        value: '修',
      }, {
        label: '新',
        value: '新',
      }, {
        label: '增',
        value: '增',
      }],
      designList: [{
        label: '',
        value: '',
      }, {
        label: '设计中',
        value: '设计中',
      }, {
        label: '已完成',
        value: '已完成',
      }, {
        label: '已确认',
        value: '已确认',
      }, {
        label: '已提交',
        value: '已提交',
      }],
      form: this.formData,
    };
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
    ]),
  },
  watch: {
    'form.visible': async function (val) {
      if (val) {
        if (this.form.data.id) {
          this.form.loading = true;
          const { data } = await SpecialDesignService.get(this.form.data.id);
          this.form.title = '编辑';
          this.form.data = data;
          this.form.visible = true;
          this.form.loading = false;
        } else {
          this.form.title = '新增';
          this.form.data = {
            progress: '无合同',
            projectName: null,
            design: null,
            contact: null,
            totalPrice: null,
            inCharge: null,
            animation: null,
            drawing: null,
            simulation: null,
            test: null,
            programme: null,
            acceptance: null,
          };
        }
      }
    },
  },
  methods: {
    async projectChange() {
      if (!this.form.data.id) {
        const { data } = await SpecialDesignService.listByCode({ projectCode: this.form.data.projectcCode });
        if (data) {
          this.form.data.projectName = data.projectName;
          this.form.data.design = data.design;
          this.form.data.contact = data.contact;
          this.form.data.inCharge = data.inCharge;
          this.form.data.animation = data.animation;
          this.form.data.drawing = data.drawing;
          this.form.data.simulation = data.simulation;
          this.form.data.test = data.test;
          this.form.data.programme = data.programme;
          this.form.data.acceptance = data.acceptance;

          if (this.roles[0] === '3' || this.roles[0] === '4') {
            this.form.data.progress = data.progress;
            this.form.data.totalPrice = data.totalPrice;
          }
        }
      }
    },
    async save() {
      if (this.form.data.id) {
        await SpecialDesignService.update(this.form.data);
        this.$notify.success({ title: '成功', message: '保存成功', duration: 2500 });
        await this.$parent.fetchData();
        this.form.visible = false;
      } else {
        await SpecialDesignService.add(this.form.data);
        this.$notify.success({ title: '成功', message: '保存成功', duration: 2500 });
        await this.$parent.fetchData();
        this.form.visible = false;
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.specialDesign-dialog {
}


</style>
