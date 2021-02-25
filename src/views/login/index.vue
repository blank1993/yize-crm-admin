<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="card-box login-form"
    >
      <h3 class="title">{{ projectName }}</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <i class="iconfont icon-user" />
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="用户代号"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="iconfont icon-lock-fill" />
        </span>
        <el-input
          v-model="loginForm.password"
          name="password"
          :type="pwdType"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <i :class="[pwdType==='password'?'icon-eye-close':'icon-eye']" class="iconfont" />
        </span>
      </el-form-item>
      <el-form-item prop="code">
        <el-row type="flex">
          <el-input
            v-model="loginForm.code"
            placeholder="验证码"
            @keyup.enter.native="handleLogin"
          />
          <el-image
            v-if="verifyCode.image"
            :src="verifyCode.image"
            @click="getVerifyCode"
          />
        </el-row>

      </el-form-item>

      <el-checkbox v-model="remember" class="remeber">记住密码</el-checkbox>

      <el-form-item>
        <el-button
          type="primary"
          style="width:100%;"
          :loading="loading"
          @click.native.prevent="handleLogin"
        >
          登录
        </el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { isvalidUsername } from '@/utils/validate';
import UserService from '@/services/user';
import AES from '@/utils/AES';

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value == null || value.length < 4) {
        callback(new Error('密码不能小于4位'));
      } else {
        callback();
      }
    };
    return {
      remember: true,
      loginForm: {
        username: '',
        password: '',
        code: '',
      },
      loginRules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername,
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePass,
        }],
      },
      loading: false,
      pwdType: 'password',
      verifyCode: {},
    };
  },
  computed: {
    projectName() {
      return this.$store.state.app.license.sysName;
    },
  },
  mounted() {
    this.loginForm.password = AES.decrypt(Cookies.get('password'));
    this.loginForm.username = Cookies.get('username');
    this.getVerifyCode();
  },
  methods: {
    async getVerifyCode() {
      const { data } = await UserService.verifyCode();
      this.verifyCode = data;
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = '';
      } else {
        this.pwdType = 'password';
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          const loginForm = {
            username: this.loginForm.username,
            password: AES.encrypt(this.loginForm.password),
            code: this.loginForm.code,
            key: this.verifyCode.key,
          };
          this.$store.dispatch('Login', loginForm)
            .then(() => {
              this.loading = false;
              if (this.remember === true) {
                Cookies.set('username', loginForm.username);
                Cookies.set('password', loginForm.password);
              } else {
                Cookies.remove('username');
                Cookies.remove('password');
              }
              this.$router.push({ path: '/index' });
            })
            .catch(() => {
              this.loading = false;
            });
          return true;
        }
        return false;
      });
    },
  },
};
</script>

<style type="text/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;

    ::v-deep input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }

    ::v-deep input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }

    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;

      &_login {
        font-size: 20px;
      }
    }

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .remeber {
      margin-bottom: 10px;
      color: white
    }


    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }

  }
</style>
