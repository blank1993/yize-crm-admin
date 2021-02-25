<template>
  <div class="app-container">
    <el-upload
      :headers="headers"
      :action="uploadUrl"
      :on-success="handleSuccess"
      :file-list="fileList"
      list-type="picture-card"
    >
      <i class="el-icon-plus" />
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth';

export default {
  name: 'Upload',
  data() {
    return {
      uploadUrl: `${process.env.VUE_APP_BASE_URL}/admin/file/upload`,
      fileList: [],
      headers: { Authorization: `Bearer ${getToken()}` },
    };
  },
  methods: {
    handleSuccess(response, data) {
      const file = data;
      file.url = process.env.VUE_APP_BASE_URL + response.data.url;
      this.fileList.push(file);
    },
  },
};
</script>
