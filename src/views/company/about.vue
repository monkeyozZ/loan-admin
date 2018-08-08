<template>
  <div>
     <el-breadcrumb class="path">
      <span style="float:left">当前位置：</span>
      <el-breadcrumb-item>公司管理</el-breadcrumb-item>
      <el-breadcrumb-item>关于我们</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tinymce">
      <tinymce v-model="content"></tinymce>
      <el-button v-waves type="primary" @click="save" class="btn">保存</el-button>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import tinymce from '@/components/Tinymce/index.vue'
import companyApi from '@/api/company/index'
export default {
  components: {
    'tinymce': tinymce
  },
  directives: {
    waves
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    save () {
      let content = this.content
      if (content === '') {
        this.$notify.error({
          title: '失败',
          message: '内容不能为空'
        })
      } else {
        let obj = {
          content: this.content
        }
        companyApi.aboutinsert(obj).then((res) => {
          if (res.data.status === 200) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '失败',
              message: res.data.message
            })
          }
        })
      }
    },
    getdata () {
      companyApi.aboutindex().then((res) => {
        if (res.data.status === 200) {
          this.content = res.data.aboutcontent
        }
      })
    }
  },
  mounted () {
    this.getdata()
  }
}
</script>

<style lang="stylus" scoped>
  .tinymce
    width 80%
    margin 0 auto
  .btn
    float right
    margin-top 100px
</style>
