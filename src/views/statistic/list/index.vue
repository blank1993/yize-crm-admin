<template>
  <div class="app-container" />
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      projectForm: {
        data: {},
        visible: false,
      },
      // 表格数据
      tableData: {
        list: [],
        total: null,
        loading: false,
        page: 1,
        pageSize: 20,
      },
    };
  },
  mounted() {
  },
  methods: {
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
