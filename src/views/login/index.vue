<template>
  <div class="login-container">
    {{ message }}
  </div>
</template>

<script>
import LoginService from '@/services/login';
import AES from '@/utils/AES';
import { setToken } from '@/utils/auth';

export default {
  name: 'Login',
  data() {
    return {
      message: '',
    };
  },
  computed: {},
  async created() {
    // const { remote } = window.electron;
    // const { machineIdSync } = remote.require('node-machine-id');
    try {
      const { data } = await LoginService.login(AES.encrypt('dfb0ba52-623c-49ff-b9cc-0c7ff1a98734'));
      setToken(data);
      await this.$router.push('/index');
    } catch (err) {
      this.message = err.msg;
    }
  },
  methods: {},
};
</script>

<style type="text/scss" lang="scss" scoped>
$bg: #f6f6f6;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  text-align: center;
  padding-top: 30px;
  font-size: 26px;

}
</style>
