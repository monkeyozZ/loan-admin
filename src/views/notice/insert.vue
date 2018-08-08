<template>
  <div>
    <el-breadcrumb class="path" v-show="update !== 'update'">
      <span style="float:left">当前位置：</span>
      <el-breadcrumb-item>公告通知</el-breadcrumb-item>
      <el-breadcrumb-item>新建公告</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="notice-form-container">
      <el-form :rules="rules" ref="dataForm" :model="Form" label-position="left" label-width="120px">
        <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput name="name" v-model="Form.title" required :maxlength="100">
                标题
              </MDinput>
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;" prop="content">
          <Tinymce :height=400 ref="editor" v-model="Form.content" />
        </el-form-item>
        <el-form-item prop="status">
        <el-switch
          v-model="Form.status"
          active-text="置顶">
        </el-switch>
      </el-form-item>
      <el-button type="primary" v-if="update !== 'update'" @click="save" class="btn">保存</el-button>
      <el-button type="primary" v-else @click="saveupdate" class="btn">保存修改</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import Tinymce from '@/components/Tinymce'
import noticeApi from '@/api/notice'
export default {
  props: ['update', 'id'],
  components: {
    MDinput,
    Tinymce
  },
  data () {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入标题'))
      } else {
        callback()
      }
    }
    return {
      Form: {
        title: '',
        content: '',
        status: false
      },
      rules: {
        title: [{ validator: validateRequire }]
      }
    }
  },
  methods: {
    save () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.Form.content === '') {
            this.$notify.error({
              title: '失败',
              message: '内容不能为空'
            })
            return false
          } else {
            noticeApi.insert(this.Form).then((res) => {
              if (res.data.status === 200) {
                this.$notify({
                  title: '成功',
                  message: res.data.message,
                  type: 'success'
                })
                this.$router.push('/notice/index')
                this.Form.title = ''
                this.Form.content = ''
                this.Form.status = false
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
    saveupdate () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.Form.content === '') {
            this.$notify.error({
              title: '失败',
              message: '内容不能为空'
            })
            return false
          } else {
            noticeApi.update(this.id, this.Form).then((res) => {
              if (res.data.status === 200) {
                this.$notify({
                  title: '成功',
                  message: res.data.message,
                  type: 'success'
                })
                this.$emit('closeMonel')
              }
            })
          }
        }
      })
    },
    getonelist (id) {
      noticeApi.getonelist(id).then((res) => {
        if (res.data.status === 200) {
          this.Form.title = res.data.onelist.title
          this.Form.content = res.data.onelist.content
          this.Form.status = res.data.onelist.status
        }
      })
    }
  },
  watch: {
    'id': {
      handler () {
        if (this.id) {
          this.getonelist(this.id)
        }
      },
      immediate: true
    },
    deep: true
  }
}
</script>

<style lang="stylus" scoped>
  .notice-form-container
    width 80%
    margin 0 auto
    padding 0 5px
    box-sizing border-box
    overflow hidden
    .btn
      margin 10px 0
      float right
</style>
