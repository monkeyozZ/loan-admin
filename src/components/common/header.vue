<template>
  <div class="header_box">
    <el-row>
      <el-col :span="3" class="logo"><img src="./logobig.jpg" alt=""></el-col>
      <el-col :span="4">
        <el-row>
          <el-button @click="taggle"><svg-icon icon-class="transform"></svg-icon></el-button>
        </el-row>
      </el-col>
     <el-col :span="2" :offset="15" class="avtor_box">
       <div class="avt">
          <el-dropdown :show-timeout="200" placement="bottom">
            <span class="el-dropdown-link">
              <img src="./logo.png" alt="">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
       </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import loginApi from '@/api/login'
import Cookies from 'js-cookie'
export default {
  name: 'v-header',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      isCollapse: 'isCollapse'
    })
  },
  methods: {
    ...mapActions({
      ChangeMenu: 'Menutaggle'
    }),
    taggle () {
      this.ChangeMenu(!this.isCollapse)
    },
    loginout () {
      loginApi.loginout().then((res) => {
        if (res.data.status === 200) {
          Cookies.remove('UserId')
          this.$router.replace('/login')
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
el-header
  padding 0
.header_box
  height 60px
  padding 10px 0
  box-sizing border-box
  .logo
    img
      display inline-block
      width 140px
      height 40px
      margin-left 40%
      transform translate(-50%,0)
  .avt
      width 40px
      height 40px
      border 1px solid #eee
      border-radius 50%
      overflow hidden
    img
    display inline-block
    max-width 100%
    width 100%
    height auto
</style>