<template>
  <div class="app-container">
    <el-row>
      <el-date-picker
        v-model="year"
        :clearable="false"
        type="year"
        value-format="yyyy"
        placeholder="选择年"
      />
      计划完成时间：
      <el-button type="primary" style="margin-left: 15px;margin-bottom: 10px" @click="fetchData">查询</el-button>
    </el-row>
    <el-table
      v-loading="loading"
      :height="'calc(100vh - 270px)'"
      :data="list"
      :border="true"
    >
      <el-table-column
        align="center"
        label="客户代码"
        width="150"
        prop="projectcCode"
      />
      <el-table-column
        align="center"
        label="客户名称"
      />
      <el-table-column
        align="center"
        label="一月份"
      >
        <el-table-column
          align="center"
          label="新"
          width="30px"
          prop="m0"
        />
        <el-table-column
          align="center"
          label="增"
          width="30px"
          prop="m1"
        />
        <el-table-column
          align="center"
          label="修"
          width="30px"
          prop="m2"
        />
      </el-table-column>
      <el-table-column
        align="center"
        label="二月份"
      >
        <el-table-column
          align="center"
          label="新"
          width="30px"
          prop="m3"
        />
        <el-table-column
          align="center"
          label="增"
          width="30px"
          prop="m4"
        />
        <el-table-column
          align="center"
          label="修"
          width="30px"
          prop="m5"
        />
      </el-table-column>

      <el-table-column
        align="center"
        label="三月份"
      >
        <el-table-column
          align="center"
          label="新"
          width="30px"
          prop="m6"
        />
        <el-table-column
          align="center"
          label="增"
          width="30px"
          prop="m7"
        />
        <el-table-column
          align="center"
          label="修"
          width="30px"
          prop="m8"
        />
      </el-table-column>

      <el-table-column
        align="center"
        label="四月份"
      >
        <el-table-column
          align="center"
          label="新"
          width="30px"
          prop="m9"
        />
        <el-table-column
          align="center"
          label="增"
          width="30px"
          prop="m10"
        />
        <el-table-column
          align="center"
          label="修"
          width="30px"
          prop="m11"
        />
      </el-table-column>

      <el-table-column
        align="center"
        label="五月份"
      >
        <el-table-column
          align="center"
          label="新"
          width="30px"
          prop="m12"
        />
        <el-table-column
          align="center"
          label="增"
          width="30px"
          prop="m13"
        />
        <el-table-column
          align="center"
          label="修"
          width="30px"
          prop="m14"
        />
      </el-table-column>

      <el-table-column
        align="center"
        label="六月份"
      >
        <el-table-column
          align="center"
          label="新"
          width="30px"
          prop="m15"
        />
        <el-table-column
          align="center"
          label="增"
          width="30px"
          prop="m16"
        />
        <el-table-column
          align="center"
          label="修"
          width="30px"
          prop="m17"
        />
      </el-table-column>

      <el-table-column
        align="center"
        label="七月份"
      >
        <el-table-column
          align="center"
          label="新"
          width="30px"
          prop="m18"
        />
        <el-table-column
          align="center"
          label="增"
          width="30px"
          prop="m19"
        />
        <el-table-column
          align="center"
          label="修"
          width="30px"
          prop="m20"
        />
      </el-table-column>

      <el-table-column
        align="center"
        label="八月份"
      >
        <el-table-column
          align="center"
          label="新"
          width="30px"
          prop="m21"
        />
        <el-table-column
          align="center"
          label="增"
          width="30px"
          prop="m22"
        />
        <el-table-column
          align="center"
          label="修"
          width="30px"
          prop="m23"
        />
      </el-table-column>

      <el-table-column
        align="center"
        label="九月份"
      >
        <el-table-column
          align="center"
          label="新"
          width="30px"
          prop="m24"
        />
        <el-table-column
          align="center"
          label="增"
          width="30px"
          prop="m25"
        />
        <el-table-column
          align="center"
          label="修"
          width="30px"
          prop="m26"
        />
      </el-table-column>

      <el-table-column
        align="center"
        label="十月份"
      >
        <el-table-column
          align="center"
          label="新"
          width="30px"
          prop="m27"
        />
        <el-table-column
          align="center"
          label="增"
          width="30px"
          prop="m28"
        />
        <el-table-column
          align="center"
          label="修"
          width="30px"
          prop="m29"
        />
      </el-table-column>

      <el-table-column
        align="center"
        label="十一月份"
      >
        <el-table-column
          align="center"
          label="新"
          width="30px"
          prop="m30"
        />
        <el-table-column
          align="center"
          label="增"
          width="30px"
          prop="m31"
        />
        <el-table-column
          align="center"
          label="修"
          width="30px"
          prop="m32"
        />
      </el-table-column>

      <el-table-column
        align="center"
        label="十二月份"
      >
        <el-table-column
          align="center"
          label="新"
          width="30px"
          prop="m33"
        />
        <el-table-column
          align="center"
          label="增"
          width="30px"
          prop="m34"
        />
        <el-table-column
          align="center"
          label="修"
          width="30px"
          prop="m35"
        />
      </el-table-column>

      <el-table-column
        align="center"
        label="汇总"
      >
        <el-table-column
          align="center"
          label="新"
          width="30px"
          prop="total1"
        />
        <el-table-column
          align="center"
          label="增"
          width="30px"
          prop="total2"
        />
        <el-table-column
          align="center"
          label="修"
          width="30px"
          prop="total3"
        />
      </el-table-column>
      <el-table-column
        align="center"
        label="修改率"
        width="45px"
      >
        <template slot-scope="{row}">
          {{ (row.total1+row.total2) ===0?'': ( (row.total3)/(row.total1+row.total2)).toFixed(3) }}
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import ReportService from '@/services/report';

export default {
  components: {},
  data() {
    return {
      year: '2021',
      list: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const { data } = await ReportService.project({
        year: this.year,
      });
      this.list = data;
      this.loading = false;
    },
  },
};
</script>
<style type="text/scss" lang="scss" scoped>
.app-container {
  background: $--background-color-base;

  ::v-deep .el-table td {
    padding: 0;
  }
}
</style>
