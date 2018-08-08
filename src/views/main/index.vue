<template>
  <div class="main">
    <el-container class="main_body">
      <el-header><v-header></v-header></el-header>
        <el-container>
          <el-aside> <v-menu></v-menu> </el-aside>
          <el-main>
           <transition name="list">
              <router-view></router-view>
          </transition>
          </el-main>
        </el-container>
      <el-footer><v-footer></v-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import header from '@/components/common/header'
import footer from '@/components/common/footer'
import slider from '@/components/common/slider'
export default {
  name: 'index',
  components: {
    'v-header': header,
    'v-footer': footer,
    'v-menu': slider
  },
  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
.el-header
  border-bottom 1px solid #eee
.el-aside
  display inline-block
  width auto!important
  box-sizing border-box
  .el-menu
    display inline-block
    transition width .28s ease-in-out
    width 200px
    height 100%
  .el-menu--collapse
    transition width .28s ease-in-out
    width 60px
.el-main
  padding 0px
  overflow hidden
.el-footer
  border-top 1px solid #eee
.list-enter-active
      transition: all .5s ease-in-out
    .list-leave-active
      transition: all .2s ease;
      opacity: 0
    .list-enter
      transform: translateY(20px);
      opacity: 0
    .list-move
      transition: all .5s
</style>