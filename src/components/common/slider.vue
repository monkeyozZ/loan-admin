<template>
    <el-menu
    class="menu-box"
    :router="true"
    background-color="#304156"
    text-color="#bfcbd9"
    :collapse="isCollapse"
    :default-active="$route.path">
      <menu-item :routers="routers"></menu-item>
    </el-menu>
</template>

<script>
import {mapGetters} from 'vuex'
import MenuItem from './MenuItem'
export default {
  name: 'mymenu',
  components: {
    'menu-item': MenuItem
  },
  data () {
    return {
      routers: [
        {
          path: '/index',
          meta: {icon: 'index', title: '首页', hidden: false}
        },
        {
          path: '/loan',
          meta: {icon: 'loan', title: '贷款管理', hidden: false},
          children: [
            {
              path: 'index',
              name: 'loanindex',
              meta: {title: '贷款列表', hidden: false}
            },
            {
              path: 'insert',
              name: 'loaninsert',
              meta: {title: '添加贷款', hidden: false}
            }
          ]
        },
        {
          path: '/card',
          meta: {icon: 'card', title: '信用卡管理', hidden: false},
          children: [
            {
              path: 'index',
              name: 'cardindex',
              meta: {title: '信用卡列表', hidden: false}
            },
            {
              path: 'insert',
              name: 'cardinsert',
              meta: {title: '添加信用卡', hidden: false}
            }
          ]
        },
        {
          path: '/registeruser',
          meta: {icon: 'register', title: '获客管理', hidden: false},
          children: [
            {
              path: 'index',
              name: 'registeruserindex',
              meta: {title: '获客列表', hidden: false}
            }
          ]
        },
        {
          path: '/member',
          meta: {icon: 'member', title: '会员管理', hidden: false},
          children: [
            {
              path: 'index',
              name: 'memberindex',
              meta: {title: '会员列表', hidden: false}
            }
          ]
        },
        {
          path: '/company',
          meta: {icon: 'company', title: '公司管理', hidden: false},
          children: [
            {
              path: 'about',
              name: 'companyabout',
              meta: {title: '关于我们', hidden: false}
            },
            {
              path: 'relief',
              name: 'companyrelief',
              meta: {title: '免责声明', hidden: false}
            },
            {
              path: 'contact',
              name: 'companycontact',
              meta: {title: '联系我们', hidden: false}
            }
          ]
        },
        {
          path: '/notice',
          meta: {icon: 'notice', title: '公告通知', hidden: false},
          children: [
            {
              path: 'index',
              name: 'noticeindex',
              meta: {title: '公告列表', hidden: false}
            },
            {
              path: 'insert',
              name: 'noticeinsert',
              meta: {title: '新建公告', hidden: false}
            }
          ]
        },
        {
          meta: {icon: 'adv', title: '广告管理', hidden: false},
          children: [
            {
              path: '/banner',
              name: 'banner',
              meta: {title: '首页banner', hidden: false},
              children: [
                {
                  path: 'index',
                  name: 'bannerindex',
                  meta: {title: 'banner列表', hidden: false}
                },
                {
                  path: 'insert',
                  name: 'bannerinsert',
                  meta: {title: '添加banner', hidden: false}
                }
              ]
            },
            {
              path: '/ADPosition',
              name: 'ADPosition',
              meta: {title: '广告位', hidden: false},
              children: [
                {
                  path: 'index',
                  name: 'ADPositionindex',
                  meta: {title: '广告位列表', hidden: false}
                },
                {
                  path: 'insert',
                  name: 'ADPositioninsert',
                  meta: {title: '添加广告位', hidden: false}
                }
              ]
            }
          ]
        },
        {
          path: '/platform',
          name: 'platform',
          meta: {title: '平台管理', icon: 'platform', hidden: false},
          children: [
            {
              path: 'index',
              name: 'platformindex',
              meta: {title: '平台列表', hidden: false}
            },
            {
              path: 'insert',
              name: 'platforminsert',
              meta: {title: '添加平台', hidden: false}
            }
          ]
        },
        {
          path: '/bank',
          name: 'bank',
          meta: {title: '银行管理', icon: 'bank', hidden: false},
          children: [
            {
              path: 'index',
              name: 'bankindex',
              meta: {title: '银行列表', hidden: false}
            },
            {
              path: 'insert',
              name: 'bankinsert',
              meta: {title: '添加银行', hidden: false}
            }
          ]
        },
        {
          path: '/newuser',
          name: 'newuser',
          meta: {title: '新人礼包', icon: 'newuser', hidden: false},
          children: [
            {
              path: 'index',
              name: 'newuserindex',
              meta: {title: '礼包列表', hidden: false}
            },
            {
              path: 'insert',
              name: 'newuserinsert',
              meta: {title: '添加礼包', hidden: false}
            }
          ]
        },
        {
          meta: {icon: 'Excel', title: 'Excel', hidden: true},
          children: [
            {
              path: '/excel/upload',
              meta: {title: '上传Excel', hidden: false}
            },
            {
              path: '/excel/export',
              meta: {title: '导出Excel', hidden: false}
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      isCollapse: 'isCollapse'
    })
  }
}
</script>

<style lang="stylus" scoped>
.menu-box
  min-height calc(100vh - 100px)
.menu-box:not(.el-menu--collapse)
    width 200px
</style>