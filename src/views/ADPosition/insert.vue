<template>
  <div class="adposition-form-box">
    <el-breadcrumb class="path">
      <span style="float:left">当前位置：</span>
      <el-breadcrumb-item>信用卡管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加信用卡</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :rules="rules" ref="dataForm" :model="Form" label-position="left" label-width="120px">
      <el-form-item label="广告位图片：" prop="pic">
          <el-upload
            ref="upload"
            :action="baseapi + 'adposition/insert'"
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
      <el-form-item label="广告分类：" prop="url">
         <el-select v-model="Form.cate" placeholder="请选择广告分类">
          <el-option label="贷款" value="loan"></el-option>
          <el-option label="信用卡" value="card"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="链接：" prop="url">
          <el-input v-model="Form.url" placeholder="链接地址" style="width:90%"></el-input>
      </el-form-item>
      <el-form-item label="概述：" prop="des">
          <el-input type="textarea" placeholder="广告位概述" :autosize="{ minRows: 2, maxRows: 4}" v-model="Form.des" style="width:60%"></el-input>
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
        callback(new Error('请输入广告位链接'))
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
        imgurl: '',
        cate: '',
        des: '',
        url: '',
        order: ''
      },
      fileList: [],
      checkAll: false,
      checkAll2: false,
      rules: {
        des: [{ required: true, message: '请输入广告位概述', trigger: 'blur' }],
        url: [{ validator: validateurl, trigger: 'blur' }],
        order: [{ validator: validateorder, trigger: 'blur' }]
      }
    }
  },
  methods: {
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$refs.upload.submit()
          // this.adpositioninsert(this.Form)
        }
      })
    },

    uploadsuccess (res, file, fileList) {
      console.log(res)
      if (res.status === 200) {
        this.$notify({
          title: '成功',
          message: res.message,
          type: 'success'
        })
        this.$router.push('/adposition/index')
        this.reset('dataForm') // 重置表单
        this.fileList = [] // 重置表单
      } else {
        this.$notify.error({
          title: '失败',
          message: res.message
        })
      }
    },
    uploading (event, file, fileList) {
      console.log(event.percent)
    },
    reset (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .adposition-form-box
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
