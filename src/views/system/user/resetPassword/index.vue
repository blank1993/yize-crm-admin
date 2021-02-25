<template>
  <div class="app-container">
    <el-row type="flex" justify="center">
      <el-col :md="12">
        <el-card class="box-card">
          <el-form
            ref="resetForm"
            :model="form"
            label-width="100px"
            :label-position="'right'"
            :rules="rules"
          >
            <el-form-item label="输入旧密码" prop="oldPassword">
              <el-input v-model="form.oldPassword" type="password" />
            </el-form-item>
            <el-form-item label="新密码" prop="password">
              <el-input v-model="form.password" type="password" />
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirmPassword">
              <el-input v-model="form.confirmPassword" type="password" />
            </el-form-item>
            <el-form-item label="">
              <el-button style="width: 100%" type="primary" @click="reset">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UserService from '@/services/user';
import AES from '@/utils/AES';

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        oldPassword: '',
        password: '',
        confirmPassword: '',
      },
      rules: {
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          {
            min: 4,
            message: '长度在 6~12 个字符',
            trigger: 'blur',
          },
        ],
        confirmPassword: [
          {
            trigger: 'blur',
            validator: validatePass,
          },
        ],
      },
    };
  },
  methods: {
    reset() {
      this.$refs.resetForm.validate(async (valid) => {
        if (valid) {
          const form = {
            oldPassword: AES.encrypt(this.form.oldPassword),
            password: AES.encrypt(this.form.password),
            confirmPassword: AES.encrypt(this.form.confirmPassword),
          };
          await UserService.modifyPassword(form);
          this.$notify.success({ title: '成功', message: '修改成功', duration: 2500 });
        }
      });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container {
    background-color: #f6f8f9;
  }

</style>
