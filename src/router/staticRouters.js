import LoadComponent from './importfile'
const main = LoadComponent('main/index')
const staticRoutes = [
  {
    path: '/',
    redirect: '/login',
    component: LoadComponent('login/index')
  },
  {
    path: '/login',
    name: 'login',
    component: LoadComponent('login/index')
  },
  {
    path: '/index',
    redirect: '/index/dashbodrd',
    component: main,
    children: [{
      path: 'dashbodrd',
      name: 'dashbodrd',
      component: LoadComponent('index/index')
    }]
  },
  {
    path: '/loan',
    redirect: '/loan/index',
    component: main,
    meta: { icon: 'loan', title: '贷款管理', hidden: false },
    children: [
      {
        path: 'index',
        name: 'loanindex',
        component: LoadComponent('loan/index'),
        meta: { title: '贷款列表', hidden: false }
      },
      {
        path: 'insert',
        name: 'loaninsert',
        component: LoadComponent('loan/insert'),
        meta: { title: '添加贷款', hidden: false }
      }
    ]
  },
  {
    path: '/card',
    redirect: '/card/index',
    component: main,
    meta: { icon: 'card', title: '信用卡管理', hidden: false },
    children: [
      {
        path: 'index',
        name: 'cardindex',
        component: LoadComponent('card/index'),
        meta: { title: '信用卡列表', hidden: false }
      },
      {
        path: 'insert',
        name: 'cardinsert',
        component: LoadComponent('card/insert'),
        meta: { title: '添加信用卡', hidden: false }
      }
    ]
  },
  {
    path: '/registeruser',
    redirect: '/registeruser/index',
    component: main,
    meta: { icon: 'register', title: '获客管理', hidden: false },
    children: [
      {
        path: 'index',
        component: LoadComponent('registeruser/index'),
        name: 'registeruserindex',
        meta: { title: '获客列表', hidden: false }
      }
    ]
  },
  {
    path: '/member',
    redirect: '/member/index',
    component: main,
    meta: { icon: 'member', title: '会员管理', hidden: false },
    children: [
      {
        path: 'index',
        component: LoadComponent('member/index'),
        name: 'memberindex',
        meta: { title: '会员列表', hidden: false }
      }
    ]
  },
  {
    path: '/company',
    component: main,
    meta: { icon: 'company', title: '公司管理', hidden: false },
    children: [
      {
        path: 'about',
        component: LoadComponent('company/about'),
        name: 'companyabout',
        meta: { title: '关于我们', hidden: false }
      },
      {
        path: 'relief',
        name: 'companyrelief',
        component: LoadComponent('company/relief'),
        meta: { title: '免责声明', hidden: false }
      },
      {
        path: 'contact',
        name: 'companycontact',
        component: LoadComponent('company/contact'),
        meta: { title: '联系我们', hidden: false }
      }
    ]
  },
  {
    path: '/notice',
    component: main,
    meta: { icon: 'notice', title: '公告通知', hidden: false },
    children: [
      {
        path: 'index',
        name: 'noticeindex',
        component: LoadComponent('notice/index'),
        meta: { title: '公告列表', hidden: false }
      },
      {
        path: 'insert',
        name: 'noticeinsert',
        component: LoadComponent('notice/insert'),
        meta: { title: '新建公告', hidden: false }
      }
    ]
  },
  {
    path: '/banner',
    name: 'banner',
    component: main,
    meta: { title: '首页banner', hidden: false },
    children: [
      {
        path: 'index',
        name: 'bannerindex',
        component: LoadComponent('banner/index'),
        meta: { title: 'banner列表', hidden: false }
      },
      {
        path: 'insert',
        name: 'bannerinsert',
        component: LoadComponent('banner/insert'),
        meta: { title: '添加banner', hidden: false }
      }
    ]
  },
  {
    path: '/ADPosition',
    name: 'ADPosition',
    component: main,
    meta: { title: '广告位', hidden: false },
    children: [
      {
        path: 'index',
        name: 'ADPositionindex',
        component: LoadComponent('ADPosition/index'),
        meta: { title: '广告位列表', hidden: false }
      },
      {
        path: 'insert',
        name: 'ADPositioninsert',
        component: LoadComponent('ADPosition/insert'),
        meta: { title: '添加广告位', hidden: false }
      }
    ]
  },
  {
    path: '/platform',
    name: 'platform',
    component: main,
    meta: { title: '平台管理', hidden: false },
    children: [
      {
        path: 'index',
        name: 'platformindex',
        component: LoadComponent('platform/index'),
        meta: { title: '平台列表', hidden: false }
      },
      {
        path: 'insert',
        name: 'platforminsert',
        component: LoadComponent('platform/insert'),
        meta: { title: '添加平台', hidden: false }
      }
    ]
  },
  {
    path: '/bank',
    name: 'bank',
    component: main,
    meta: { title: '银行管理', icon: 'bank', hidden: false },
    children: [
      {
        path: 'index',
        name: 'bankindex',
        component: LoadComponent('bank/index'),
        meta: { title: '银行列表', hidden: false }
      },
      {
        path: 'insert',
        name: 'bankinsert',
        component: LoadComponent('bank/insert'),
        meta: { title: '添加银行', hidden: false }
      }
    ]
  },
  {
    path: '/newuser',
    name: 'newuser',
    component: main,
    meta: { title: '新人礼包', icon: 'newuser', hidden: false },
    children: [
      {
        path: 'index',
        name: 'newuserindex',
        component: LoadComponent('newuser/index'),
        meta: { title: '礼包列表', hidden: false }
      },
      {
        path: 'insert',
        name: 'newuserinsert',
        component: LoadComponent('newuser/insert'),
        meta: { title: '添加礼包', hidden: false }
      }
    ]
  },
  {
    path: '*',
    redirect: '/401'
  },
  {
    path: '/401',
    redirect: '/error/401',
    component: main,
    children: [{
      path: '/error/401',
      component: LoadComponent('error/401')
    }]
  }
]

export default staticRoutes