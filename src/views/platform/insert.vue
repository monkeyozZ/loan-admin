<template>
  <div class="platform-form-box">
    <el-breadcrumb class="path">
      <span style="float:left">当前位置：</span>
      <el-breadcrumb-item>贷款平台管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加贷款平台</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :rules="rules" ref="dataForm" :model="Form" label-position="left" label-width="120px">
      <el-form-item label="平台名称：" prop="title">
          <el-input v-model="Form.title" placeholder="请输入平台名称" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item label="平台图片：" prop="pic">
          <el-upload
            ref="upload"
            :action="baseapi + 'platform/insert'"
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
    return {
      baseapi: process.env.BASE_API,
      Form: {
        title: '',
        imgurl: ''
      },
      fileList: [],
      rules: {
        title: [{ required: true, message: '请输入平台名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$refs.upload.submit()
          // this.platforminsert(this.Form)
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
        this.$router.push('/platform/index')
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
  .platform-form-box
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
