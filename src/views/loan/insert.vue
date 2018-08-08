<template>
  <div class="form-box">
    <el-breadcrumb class="path">
      <span style="float:left">当前位置：</span>
      <el-breadcrumb-item>贷款管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/loan/insert' }">添加贷款</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :rules="rules" ref="dataForm" :model="Form" label-position="left" label-width="120px">
      <el-form-item label="贷款名称：" prop="title">
          <el-input v-model="Form.title" placeholder="贷款名称" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item label="贷款icon：" prop="pic">
          <el-upload
            ref="upload"
            :action="baseapi + 'loan/insert'"
            :file-list="fileList"
            :limit="1"
            :data="Form"
            :auto-upload="false"
            accept="image/*"
            list-type="picture-card"
            :on-progress="uploading"
            :on-success="uploadsuccess"
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
      <el-form-item label="可借款额度：" prop="money_limit">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="Form.money_limit" @change="handleCheckedmaneyChange">
                <el-checkbox v-for="item in moneyarr" :label="item.id" :key="item.id">{{item.num}}</el-checkbox>
              </el-checkbox-group>
      </el-form-item>
      <el-form-item label="适合人群：" prop="people_limit">
            <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="Form.people_limit" @change="handleCheckedmaneyChange2">
                <el-checkbox v-for="item in peoplearr" :label="item.id" :key="item.id">{{item.type}}</el-checkbox>
              </el-checkbox-group>
      </el-form-item>
      <el-form-item label="是否首页推荐：" prop="recommend">
        <el-switch
          v-model="Form.recommend"
          active-text="是"
          inactive-text="否">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否开启：" prop="status">
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
      <el-button v-waves type="primary" @click="createData">保存添加</el-button>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
export default {
  props: ['id', 'status'],
  directives: {
    waves
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
      baseapi: process.env.BASE_API,
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
      }
    }
  },
  methods: {
    createData () {
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
          this.$refs.upload.submit()
          // this.loaninsert(this.Form)
        }
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
        this.$router.push('/loan/index')
        this.reset('dataForm') // 重置表单
        this.isIndeterminate = false // 重置表单
        this.isIndeterminate2 = false // 重置表单
        this.fileList = [] // 重置表单
      } else {
        this.$notify.error({
          title: '失败',
          message: res.message
        })
      }
    },
    uploading (event, file, fileList) {
      // console.log(event)
    },
    reset (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="stylus" scoped>
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
</style>
