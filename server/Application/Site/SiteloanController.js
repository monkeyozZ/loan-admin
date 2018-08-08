import Base from './BaseController'
import Loanmodel from '../../models/admin/loan'
import platformmodel from '../../models/admin/platform'
import bannermodel from '../../models/admin/banner'
import billmodel from '../../models/site/bill'
class Siteloan extends Base {
  constructor () {
    super()
    this.Datainit = this.Datainit.bind(this)
  }
  async Datainit (req, res, next) {
    console.log(req.body)
    let bannerlist = await bannermodel.find()
    let loanlist = await Loanmodel.find({ status: true }).limit(5).sort({ order: -1 })
    if (loanlist) {
      res.send({
        status: 200,
        data: {
          loanlist: loanlist,
          bannerlist: bannerlist
        }
      })
    }
  }

  async dropdown (req, res, next) {
    let moneylimit = req.body.money_limit ? req.body.money_limit : ''
    let peoplelimit = req.body.people_limit ? req.body.people_limit : ''
    let moneyreg = new RegExp(moneylimit)
    let peoplereg = new RegExp(peoplelimit)
    let loanlist = await Loanmodel.find({ $and: [{ 'status': true }, { money_limit: { $regex: moneyreg } }, { people_limit: { $regex: peoplereg } }] }).limit(5).sort({ order: -1 })
    if (loanlist) {
      res.send({
        status: 200,
        loanlist: loanlist
      })
    }
  }

  async getmore (req, res, next) {
    let currentpage = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let row = (currentpage - 1) * limit
    let moneylimit = req.query.money_limit ? req.query.money_limit : ''
    let peoplelimit = req.query.people_limit ? req.query.people_limit : ''
    let moneyreg = new RegExp(moneylimit)
    let peoplereg = new RegExp(peoplelimit)
    if (moneylimit !== '' && peoplelimit === '') {
      let loanlist = await Loanmodel.find({ $and: [{ 'status': true }, { 'money_limit': { $regex: moneyreg } }] }).skip(row).limit(limit).sort({ order: -1 })
      console.log(loanlist)
      if (loanlist.length !== 0) {
        res.send({
          status: 200,
          loanlist: loanlist
        })
      } else {
        res.send({
          status: -200,
          loanlist: loanlist
        })
      }
    }

    if (moneylimit === '' && peoplelimit !== '') {
      let loanlist = await Loanmodel.find({ $and: [{ 'status': true }, { people_limit: { $regex: peoplereg } }] }).skip(row).limit(limit).sort({ order: -1 })
      if (loanlist.length !== 0) {
        res.send({
          status: 200,
          loanlist: loanlist
        })
      } else {
        res.send({
          status: -200,
          loanlist: loanlist
        })
      }
    }

    if (moneylimit !== '' && peoplelimit !== '') {
      let loanlist = await Loanmodel.find({ $and: [{ 'status': true }, { money_limit: { $regex: moneyreg } }, { people_limit: { $regex: peoplereg } }] }).skip(row).limit(limit).sort({ order: -1 })
      if (loanlist.length !== 0) {
        res.send({
          status: 200,
          loanlist: loanlist
        })
      } else {
        res.send({
          status: -200,
          loanlist: loanlist
        })
      }
    }
    if (moneylimit === '' && peoplelimit === '') {
      let loanlist = await Loanmodel.find({status: true}).skip(row).limit(limit).sort({ order: -1 })
      if (loanlist.length !== 0) {
        res.send({
          status: 200,
          loanlist: loanlist
        })
      } else {
        res.send({
          status: -200,
          loanlist: loanlist
        })
      }
    }
  }

  async filtercase (req, res, next) {
    let moneylimit = req.body.money_limit ? req.body.money_limit : ''
    let peoplelimit = req.body.people_limit ? req.body.people_limit : ''
    let moneyreg = new RegExp(moneylimit)
    let peoplereg = new RegExp(peoplelimit)
    let loanlist = await Loanmodel.find({ $and: [{ 'status': true }, { money_limit: { $regex: moneyreg } }, { people_limit: { $regex: peoplereg } }] }).limit(5).sort({ order: -1 })
    if (loanlist) {
      res.send({
        status: 200,
        loanlist: loanlist
      })
    }
  }

  async getplatform (req, res, next) {
    let result = await platformmodel.find()
    if (result) {
      res.send({
        status: 200,
        platformlist: result
      })
    }
  }

  async getformdata (req, res, next) {
    // console.log(req.body)
    let result = await billmodel.findById(req.body.id)
    if (result) {
      res.send({
        status: 200,
        datalist: result
      })
    }
  }

  async creatbill (req, res, next) {
    let result = await billmodel.create(req.body)
    if (result) {
      res.send({
        status: 200,
        message: '添加成功'
      })
    } else {
      res.send({
        status: -200,
        message: '添加失败'
      })
    }
  }

  async updatebill (req, res, next) {
    let id = req.params.id
    let result = await billmodel.findByIdAndUpdate(id, req.body)
    if (result) {
      res.send({
        status: 200,
        message: '修改成功'
      })
    } else {
      res.send({
        status: -200,
        message: '修改失败'
      })
    }
  }

  async getbill (req, res, next) {
    let billlist = []
    const trantime = function (D) {
      var date = new Date(parseInt(Date.now())) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '年'
      let M = (date.getMonth() + 1) + '月'
      let day = date.getDate()
      if (D < day) {
        M = (date.getMonth() + 2) + '月'
      }
      return Y + M + D + '日'
    }
    let result = await billmodel.find({ openid: req.body.openid }).lean()
    if (result.length !== 0) {
      let platobj = {}
      for (let i = 0; i < result.length; i++) {
        platobj[i] = await platformmodel.find({ title: result[i].loanterrace })
        billlist[i] = {}
        billlist[i].id = result[i]._id
        billlist[i].repaymentDate = trantime(parseInt(result[i].repaymentDate))
        billlist[i].repaymentDay = result[i].repaymentDate
        billlist[i].repaymentNum = result[i].repaymentNum
        billlist[i].hasrepaymentCount = result[i].hasrepaymentCount
        billlist[i].repaymentCount = result[i].repaymentCount
        billlist[i].hasrepaymentMoney = parseInt(result[i].hasrepaymentCount) * parseInt(result[i].repaymentNum)
        billlist[i].norepaymentMoney = (parseInt(result[i].repaymentCount) * parseInt(result[i].repaymentNum)) - (parseInt(result[i].hasrepaymentCount) * parseInt(result[i].repaymentNum))
      }
      for (const k in platobj) {
        billlist[k].imgurl = platobj[k][0].imgurl
      }
      res.send({
        status: 200,
        billlist: billlist
      })
    } else {
      res.send({
        status: 200,
        billlist: []
      })
    }
  }

  async getbillcount (req, res, next) {
    let result = await billmodel.find({ openid: req.body.openid }).lean()
    if (result) {
      res.send({
        status: 200,
        loancount: result.length
      })
    }
  }

  async historylist (req, res, next) {
    if (req.body.length !== 0) {
      let historylist = []
      for (let i = 0; i < req.body.length; i++) {
        historylist.push(await Loanmodel.findById(req.body[i]))
      }
      res.send({
        status: 200,
        historylist: historylist
      })
    } else {
      res.send({
        status: 100,
        message: '无浏览历史'
      })
    }
  }
}

export default new Siteloan()