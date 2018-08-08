<template>
  <div>
    <el-breadcrumb class="path">
      <span style="float:left">当前位置：</span>
      <el-breadcrumb-item>贷款管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/loan/index' }">贷款列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="loan-container">
      <div class="top-tools">
        <el-row type="flex" justify="left">
          <el-col :span="17">
            <el-row type="flex" justify="left">
              <el-col :span="10">
                <div class="block">
                    <span class="mr-10">时间筛选</span>
                    <el-date-picker
                      v-model="datetime"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions2"
                      value-format="timestamp"
                      style="width: 70%">
                    </el-date-picker>
                </div>
              </el-col>
              <el-col :span="7">
                <el-input style="width: 50%" v-model="phone" class="filter-item" maxlength="11" clearable placeholder="请输入手机号"></el-input>
              </el-col>
              <el-col :span="2">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="search">查询</el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="7">
            <el-input style="width: 50%" v-model="filename" class="filter-item" clearable placeholder="请输入导出文件名"></el-input>
            <el-button class="filter-item" type="primary" :loading="downloadLoading" @click="handleDownload" v-waves icon="el-icon-download">导出Excel</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table-container">
        <el-table
          :data="tableData"
          v-loading="loading"
          height="581"
          border
          style="width: 100%">
          <el-table-column
            label="ID"
            width="80">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            type="selection"
            width="80">
          </el-table-column> -->
          <el-table-column
            label="姓名"
            >
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="性别"
            width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.sex}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="手机号"
            >
            <template slot-scope="scope">
              <span>{{scope.row.phone | sunphone}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="注册时间">
            <template slot-scope="scope">
              <span>{{scope.row.date | trantime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-container" v-show="total">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,40]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
    </div>
    <el-dialog title="详情" :visible.sync="dialogFormVisible">
      <ul class="list-container">
        <li><span>用户姓名：</span>{{list.name}}</li>
        <li><span>性别：</span>{{list.sex}}</li>
        <li><span>身份证号：</span>{{list.idcard}}</li>
        <li><span>手机号：</span>{{list.phone}}</li>
        <li><span>婚姻状态：</span>{{list.status}}</li>
         <li><span>文化程度：</span>{{list.edu}}</li>
        <li><span>工作所在地：</span>{{list.city}}</li>
        <li><span>月收入：</span>{{list.pay}}</li>
        <li><span>公司类型：</span>{{list.company}}</li>
        <li><span>工作年限：</span>{{list.job_age}}</li>
        <li><span>是否连续6个月缴纳公积金：</span>{{list.gongjijin}}</li>
        <li><span>是否连续6个月缴纳社保：</span>{{list.shebao}}</li>
        <li><span>是否有信用卡：</span>{{list.card}}</li>
        <li><span>是否有房：</span>{{list.home}}</li>
        <li><span>是否有车：</span>{{list.car}}</li>
        <li><span>是否有逾期：</span>{{list.overdue}}</li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { trantime, sunphone, transex } from '@/filters'
import memberApi from '@/api/member'
export default {
  directives: {
    waves
  },
  filters: {
    trantime,
    sunphone,
    transex
  },
  data () {
    return {
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      loading: false,
      datetime: null,
      phone: null,
      downloadLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      total: null,
      tableData: [],
      downData: [],
      list: {
        name: '',
        sex: '',
        money: '',
        idcard: '',
        phone: '',
        status: '',
        city: '',
        way: '',
        pay: '',
        company: '',
        gongjijin: '',
        shebao: '',
        card: '',
        home: '',
        car: ''
      },
      dialogFormVisible: false,
      filename: '',
      autoWidth: true
    }
  },
  methods: {
    handleEdit (obj) {
      this.setlist(obj)
      this.dialogFormVisible = true
    },
    setlist (obj) {
      this.list = obj
    },
    getlist () {
      this.loading = true
      memberApi.getlist(this.listQuery).then((res) => {
        if (res.data.status === 200) {
          this.loading = false
          this.tableData = res.data.memberlist
          this.total = res.data.total
        }
      })
    },
    handleSizeChange (val) {
      this.listQuery.limit = val
      if (this.datetime !== null || this.phone !== null) {
        this.search()
      } else {
        this.getlist()
      }
    },
    handleCurrentChange (val) {
      this.listQuery.page = val
      if (this.datetime !== null || this.phone !== null) {
        this.search()
      } else {
        this.getlist()
      }
    },
    search () {
      let obj = {
        date: this.datetime,
        phone: this.phone,
        listQuery: this.listQuery
      }
      this.loading = true
      memberApi.search(obj).then((res) => {
        if (res.data.status === 200) {
          this.loading = false
          this.tableData = res.data.memberlist
          this.total = res.data.total
        }
      })
    },
    exportsearch () {
      let obj = {
        date: this.datetime,
        phone: this.phone
      }
      return new Promise((resolve, reject) => {
        memberApi.search2(obj).then((res) => {
          if (res.data.status === 200) {
            resolve(res.data.memberlist)
          } else {
            reject(res)
          }
        })
      })
    },
    handleDownload () {
      if (this.filename === '') {
        this.$notify.error({
          title: '失败',
          message: '导出文件名忘啦？'
        })
        return false
      }
      this.downloadLoading = true
      this.exportsearch().then((res) => {
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['ID', '姓名', '性别', '手机号', '贷款金额', '注册时间', '身份证号', '所在城市', '婚姻状况', '文化程度', '月收入', '是否有房', '是否有车', '是否有信用卡', '是否有逾期', '公积金', '社保']
          const filterVal = ['_id', 'name', 'sex', 'phone', 'money', 'date', 'idcard', 'city', 'status', 'edu', 'pay', 'home', 'car', 'card', 'overdue', 'gongjijin', 'shebao']
          const downData = res
          const data = this.formatJson(filterVal, downData)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth
          })
          this.downloadLoading = false
        })
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map((v, i) => filterVal.map(j => {
        if (j === '_id') {
          return i + 1
        }

        if (j === 'date') {
          return trantime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  },
  mounted () {
    this.getlist()
  },
  watch: {
    'dialogFormVisible': {
      handler () {
        if (!this.dialogFormVisible) {
          this.list = []
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.loan-container
  padding 15px 10px
  .top-tools
    padding 10px
    margin-bottom 15px
    box-sizing border-box
    background #fff
    .el-col
      text-align center
.el-pagination
  margin-top 30px
  padding-right 100px
  box-sizing border-box
  text-align right
.list-container
  width 80%
  margin 0 auto
  li
    padding 10px
    span
      margin-right 10px
      font-weight bold
      font-size 15px
</style>
