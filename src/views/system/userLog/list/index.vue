<template>
  <div class="app-container">
    <el-row type="flex" justify="space-between" style="margin-bottom: 10px">
      <el-col>
        <el-button-group />
      </el-col>
      <el-col :span="8">
        <el-input v-model="tableData.keyWord" placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search" @click="fetchData" />
        </el-input>
      </el-col>
    </el-row>

    <data-tables-server
      :table-props="calc('270px')"
      :data="tableData.list"
      :total="tableData.total"
      :loading="tableData.loading"
      @query-change="tableChange"
    >
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <el-form label-position="left" :label-width="'100px'">
            <el-form-item label="描述">
              <span>{{ row.logDesc }}</span>
            </el-form-item>
            <el-form-item label="参数">
              <pre>{{ JSON.parse(row.args) }}</pre>
            </el-form-item>
            <el-form-item label="方法名">
              <span>{{ row.methodName }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="用户id"
        prop="userId"
        width="180"
      />
      <el-table-column
        align="center"
        label="ip地址"
        prop="loginIp"
        width="95"
      />
      <el-table-column
        align="center"
        label="描述"
        prop="logDesc"
      />
      <el-table-column
        align="center"
        label="类型"
        prop="logType"
        width="95"
      />
      <el-table-column
        align="center"
        label="参数"
        prop="args"
        show-overflow-tooltip
        width="200"
      />
      <el-table-column
        align="center"
        label="方法名"
        prop="methodName"
        show-tooltip-when-overflow
        width="150"
      />
      <el-table-column
        align="center"
        label="运行时间(ms)"
        prop="runTime"
        width="120"
      />
      <el-table-column
        align="center"
        label="记录时间"
        prop="createDate"
        width="190"
      />
    </data-tables-server>
  </div>
</template>

<script>
import UserLogService from '@/services/userLog';

export default {
  components: {
  },
  data() {
    return {
      // 表格数据
      tableData: {
        list: [],
        total: null,
        loading: false,
        page: 1,
        pageSize: 20,
        keyWord: null,
      },
    };
  },
  mounted() {
  },
  methods: {
    tableChange(queryInfo) {
      this.tableData.sort = queryInfo.sort;
      this.tableData.page = queryInfo.page;
      this.tableData.pageSize = queryInfo.pageSize;
      this.fetchData();
    },
    /**
     * 表格分页查询
     */
    async fetchData() {
      this.tableData.loading = true;
      const { data } = await UserLogService
        .list(
          this.tableData.page,
          this.tableData.pageSize,
          this.tableData.sort,
          this.tableData.keyWord,
        );
      this.tableData.list = data.records;
      this.tableData.total = data.total;
      this.tableData.loading = false;
    },
  },
};
</script>
<style type="text/scss" lang="scss" scoped>

</style>
