<template>
  <div>
    <el-breadcrumb class="path">
      <span style="float:left">当前位置：</span>
      <el-breadcrumb-item>新人礼包</el-breadcrumb-item>
      <el-breadcrumb-item>礼包列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="newuser-container">
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
            label="图片"
            width="400"
            >
            <template slot-scope="scope">
              <img style="width: 375px;height: 115px" :src="baseimgurl + scope.row.imgurl" alt="">
            </template>
          </el-table-column>
          <el-table-column
            label="推广链接">
            <template slot-scope="scope">
              <span>{{scope.row.url}}</span>
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
        <div class="newuser-form-box">
          <el-form :rules="rules" ref="dataForm" :model="Form" label-position="left" label-width="120px">
            <el-form-item label="图片：" prop="pic">
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
            <el-form-item label="礼包链接：" prop="url">
                <el-input v-model="Form.url" placeholder="礼包链接" style="width:90%"></el-input>
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
import newuserApi from '@/api/newuser/index'
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
        callback(new Error('请输入礼包链接'))
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
    return {
      baseimgurl: process.env.BASE_API,
      tableData: [],
      loading: false,
      dialogFormVisible: false,
      id: '',
      url: '',
      Form: {
        imgurl: '',
        des: '',
        url: '',
        order: ''
      },
      fileList: [],
      isupdata: false,
      FormData: '',
      rules: {
        url: [{ validator: validateurl, trigger: 'blur' }]
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
      newuserApi.getlist(this.listQuery).then((result) => {
        this.tableData = result.data.newuserlist
        this.total = result.data.total
        this.loading = false
      }).catch((err) => {
        console.log(err)
      })
    },
    handleEdit (id) {
      this.id = id
      this.dialogFormVisible = true
      this.url = process.env.BASE_API + 'newuser/update/' + this.id
    },
    getonelist (id) {
      newuserApi.getonelist(id).then((res) => {
        if (res.status === 200) {
          this.Form.title = res.data.onelist.title
          this.fileList.push({url: process.env.BASE_API + res.data.onelist.imgurl})
          this.$set(this.Form, 'originpic', res.data.onelist.imgurl)
          this.Form.des = res.data.onelist.des
          this.Form.url = res.data.onelist.url
          this.Form.order = res.data.onelist.order
        }
      }).catch((err) => {
        console.log('err:' + err)
      })
    },
    upData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.isupdata) {
            this.$refs.upload.submit() // 修改过图片
          } else {
            this.initformdata()
            axios.post(process.env.BASE_API + 'newuser/update/' + this.id, this.FormData).then((res) => {
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
        newuserApi.delcount(id).then((res) => {
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
      this.FormData.append('url', this.Form.url)
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
.newuser-container
  padding 15px 10px
  .top-tools
    padding 10px
    margin-bottom 15px
    box-sizing border-box
    background #fff
    .el-col
      text-align center
.newuser-form-box
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
