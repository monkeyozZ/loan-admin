<template>
  <div>
    <el-breadcrumb class="path">
      <span style="float:left">当前位置：</span>
      <el-breadcrumb-item>贷款管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/loan/index' }">贷款列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="loan-container">
      <div class="table-container">
        <el-table
          :data="tableData"
          border
          v-loading="loading"
          style="width: 100%">
          <el-table-column
            label="ID"
            width="80">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="排序"
            width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.order }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="贷款名称"
            width="200"
            >
            <template slot-scope="scope">
              <span>{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="贷款概述"
            >
            <template slot-scope="scope">
              <span>{{scope.row.des}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="推广链接">
            <template slot-scope="scope">
              <span>{{scope.row.url}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="80" >
            <template slot-scope="scope">
              <span>{{scope.row.status|transtatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                circle
                v-waves
                @click="handleEdit(scope.row._id)"></el-button>
                <el-button
                size="mini"
                v-waves
                type="danger"
                icon="el-icon-delete"
                circle
                @click="handleDelete(scope.row._id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container" v-show="total">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,40]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <div class="form-box">
          <el-form :rules="rules" ref="dataForm" :model="Form" label-position="left" label-width="120px">
            <el-form-item label="贷款名称：" prop="title">
                <el-input v-model="Form.title" placeholder="贷款名称" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item label="贷款icon：" prop="pic">
                <el-upload
                  ref="upload"
                  :action="url"
                  :file-list="fileList"
                  :limit="1"
                  :data="Form"
                  :auto-upload="false"
                  accept="image/*"
                  list-type="picture-card"
                  :on-success="uploadsuccess"
                  :on-change="change"
                  >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过100kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="贷款概述：" prop="des">
                <el-input type="textarea" placeholder="贷款概述" :autosize="{ minRows: 2, maxRows: 4}" v-model="Form.des" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item label="推广链接：" prop="url">
                <el-input v-model="Form.url" placeholder="推广链接" style="width:90%"></el-input>
            </el-form-item>
            <el-form-item label="贷款通过率：" prop="pass_rate">
                <el-input v-model="Form.pass_rate" placeholder="贷款通过率（数字）" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="成功下款数：" prop="success_num">
                <el-input v-model="Form.success_num" placeholder="成功下款数（数字）" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="可借款额度：">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="Form.money_limit" @change="handleCheckedmaneyChange">
                      <el-checkbox v-for="item in moneyarr" :label="item.id" :key="item.id">{{item.num}}</el-checkbox>
                    </el-checkbox-group>
            </el-form-item>
            <el-form-item label="适合人群：">
                  <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="Form.people_limit" @change="handleCheckedmaneyChange2">
                      <el-checkbox v-for="item in peoplearr" :label="item.id" :key="item.id">{{item.type}}</el-checkbox>
                    </el-checkbox-group>
            </el-form-item>
            <el-form-item label="是否首页推荐：">
              <el-switch
                v-model="Form.recommend"
                active-text="是"
                inactive-text="否">
              </el-switch>
            </el-form-item>
            <el-form-item label="是否开启：">
              <el-switch
                v-model="Form.status"
                active-text="开启"
                inactive-text="暂停">
              </el-switch>
            </el-form-item>
            <el-form-item label="排序：" prop="order">
                <el-input v-model="Form.order" placeholder="排序（数字）" style="width:120px"></el-input>
            </el-form-item>
          </el-form>
          <div class="form-footer">
            <el-button type="primary" @click.native="upData">保存修改</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { transtatus } from '@/filters'
import loanApi from '@/api/loan/index'
import axios from 'axios'
export default {
  directives: {
    waves
  },
  filters: {
    transtatus
  },
  data () {
    var validateurl = async (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入推广链接'))
      } else {
        let strRegex = '(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'
        var reg = new RegExp(strRegex)
        let result = reg.test(value)
        if (!result) {
          callback(new Error('网址格式不正确'))
        }
        callback()
      }
    }
    var validatepass = async (rule, value, callback) => {
      if (value !== '') {
        let reg = /^[1-9]\d*|0$/
        let result = reg.test(value)
        if (!result) {
          callback(new Error('请输入数字'))
        }
      } else {
        callback(new Error('请输入贷款通过率'))
      }
    }
    var validatenum = async (rule, value, callback) => {
      if (value !== '') {
        let reg = /^[1-9]\d*|0$/
        let result = reg.test(value)
        if (!result) {
          callback(new Error('请输入数字'))
        }
      } else {
        callback(new Error('请输入下款成功数'))
      }
    }

    var validateorder = async (rule, value, callback) => {
      if (value !== '') {
        let reg = /^[1-9]\d*|0$/
        let result = reg.test(value)
        if (!result) {
          callback(new Error('请输入数字'))
        }
      } else {
        callback(new Error('请输入排序'))
      }
    }
    return {
      tableData: [],
      loading: false,
      dialogFormVisible: false,
      id: '',
      url: '',
      Form: {
        title: '',
        imgurl: '',
        des: '',
        url: '',
        pass_rate: '',
        success_num: '',
        money_limit: [],
        people_limit: [],
        recommend: false,
        status: false,
        order: ''
      },
      fileList: [],
      isupdata: false,
      FormData: '',
      moneyarr: [
        {
          id: 1,
          num: '0-8000元'
        },
        {
          id: 2,
          num: '8000-20000元'
        },
        {
          id: 3,
          num: '20000-80000元'
        },
        {
          id: 4,
          num: '80000元以上'
        }],
      peoplearr: [
        {
          id: 1,
          type: '上班族'
        },
        {
          id: 2,
          type: '个体户'
        },
        {
          id: 3,
          type: '学生'
        },
        {
          id: 4,
          type: '自由职业者'
        }
      ],
      isIndeterminate: false,
      isIndeterminate2: false,
      checkAll: false,
      checkAll2: false,
      rules: {
        title: [{ required: true, message: '请输入贷款名称', trigger: 'blur' }],
        des: [{ required: true, message: '请输入贷款概述', trigger: 'blur' }],
        url: [{ validator: validateurl, trigger: 'blur' }],
        pass_rate: [{ validator: validatepass, trigger: 'blur' }],
        success_num: [{ validator: validatenum, trigger: 'blur' }],
        order: [{ validator: validateorder, trigger: 'blur' }]
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      total: null
    }
  },
  methods: {
    getlist () {
      this.loading = true
      loanApi.getlist(this.listQuery).then((result) => {
        this.tableData = result.data.loanlist
        this.total = result.data.total
        this.loading = false
      }).catch((err) => {
        console.log(err)
      })
    },
    handleEdit (id) {
      this.id = id
      this.dialogFormVisible = true
      this.url = process.env.BASE_API + 'loan/update/' + this.id
    },
    getonelist (id) {
      loanApi.getonelist(id).then((res) => {
        if (res.status === 200) {
          this.Form.title = res.data.onelist.title
          this.fileList.push({url: process.env.BASE_API + res.data.onelist.imgurl})
          this.$set(this.Form, 'originpic', res.data.onelist.imgurl)
          this.Form.des = res.data.onelist.des
          this.Form.url = res.data.onelist.url
          this.Form.pass_rate = res.data.onelist.pass_rate
          this.Form.success_num = res.data.onelist.success_num
          let moneyLimitArr = res.data.onelist.money_limit.split(',')
          this.Form.money_limit = [] // 防止重复的键值对
          moneyLimitArr.forEach(item => {
            this.Form.money_limit.push(parseInt(item))
          })
          if (this.Form.money_limit.length === this.moneyarr.length) {
            this.isIndeterminate = false
            this.checkAll = true
          } else {
            this.isIndeterminate = true
            this.checkAll = false
          }
          let peopleLimitArr = res.data.onelist.people_limit.split(',')
          this.Form.people_limit = [] // 防止重复的键值对
          peopleLimitArr.forEach(item => {
            this.Form.people_limit.push(parseInt(item))
          })
          if (this.Form.people_limit.length === this.peoplearr.length) {
            this.isIndeterminate2 = false
            this.checkAll2 = true
          } else {
            this.isIndeterminate2 = true
            this.checkAll2 = false
          }
          this.Form.recommend = res.data.onelist.recommend
          this.Form.status = res.data.onelist.status
          this.Form.order = res.data.onelist.order
        }
      }).catch((err) => {
        console.log('err:' + err)
      })
    },
    upData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.Form.money_limit.length === 0) {
            this.$message.error('至少选择一项借款额度')
            return false
          }
          if (this.Form.people_limit.length === 0) {
            this.$message.error('至少选择一项适用人群')
            return false
          }
          if (this.isupdata) {
            this.$refs.upload.submit() // 修改过图片
          } else {
            this.initformdata()
            axios.post(process.env.BASE_API + 'loan/update/' + this.id, this.FormData).then((res) => {
              if (res.data.status === 200) {
                this.$notify({
                  title: '成功',
                  message: res.data.message,
                  type: 'success'
                })
                this.getlist()
                this.dialogFormVisible = false
              } else {
                this.$notify.error({
                  title: '失败',
                  message: res.data.message
                })
              }
            })
          }
        }
      })
    },
    handleDelete (id) {
      // console.log(id)
      this.$confirm('确定删除该记录吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        loanApi.delcount(id).then((res) => {
          if (res.data.status === 200) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            this.getlist()
          } else {
            this.$notify.error({
              title: '失败',
              message: res.data.message
            })
          }
        })
      })
    },
    handleCheckAllChange (val) {
      let arr = []
      for (let i = 0; i < this.moneyarr.length; i++) {
        arr.push(this.moneyarr[i].id)
      }
      this.Form.money_limit = val ? arr : []
      this.isIndeterminate = false
    },
    handleCheckedmaneyChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.moneyarr.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.moneyarr.length
    },
    handleCheckAllChange2 (val) {
      let arr = []
      for (let i = 0; i < this.peoplearr.length; i++) {
        arr.push(this.peoplearr[i].id)
      }
      this.Form.people_limit = val ? arr : []
      this.isIndeterminate2 = false
    },
    handleCheckedmaneyChange2 (value) {
      let checkedCount = value.length
      this.checkAll2 = checkedCount === this.peoplearr.length
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.peoplearr.length
    },
    uploadsuccess (res, file, fileList) {
      // console.log(res)
      if (res.status === 200) {
        this.$notify({
          title: '成功',
          message: res.message,
          type: 'success'
        })
        this.getlist()
        this.dialogFormVisible = false
      } else {
        this.$notify.error({
          title: '失败',
          message: res.message
        })
      }
    },
    initformdata () {
      this.FormData = new FormData()
      this.FormData.append('title', this.Form.title)
      this.FormData.append('des', this.Form.des)
      this.FormData.append('url', this.Form.url)
      this.FormData.append('pass_rate', this.Form.pass_rate)
      this.FormData.append('success_num', this.Form.success_num)
      this.FormData.append('money_limit', this.Form.money_limit)
      this.FormData.append('people_limit', this.Form.people_limit)
      this.FormData.append('recommend', this.Form.recommend)
      this.FormData.append('status', this.Form.status)
      this.FormData.append('order', this.Form.order)
    },
    change () {
      this.isupdata = true
    },
    uploading (event, file, fileList) {
      console.log(event.percent)
    },
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.getlist()
    },
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.getlist()
    }
  },
  watch: {
    'dialogFormVisible': {
      handler () {
        if (!this.dialogFormVisible) {
          this.id = ''
          this.isupdata = false
        }
      }
    },
    'id': {
      handler () {
        if (this.id) {
          this.getonelist(this.id)
        } else {
          this.fileList = []
        }
      },
      immediate: true
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getlist()
    })
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
.form-box
  padding-bottom 50px
  .el-form
    max-width 900px;
    width 100%
    margin 0 auto
  .form-footer
    max-width 900px
    width 100%
    margin 0 auto
    text-align right
.el-pagination
  margin-top 30px
  padding-right 100px
  box-sizing border-box
  text-align right
</style>
