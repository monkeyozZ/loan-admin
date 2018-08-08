import Base from './BaseController'
import cardmodel from '../../models/admin/card'
import sitebankmodel from '../../models/site/card'
import bannermodel from '../../models/admin/banner'
import bankmodel from '../../models/admin/bank'
class SiteCard extends Base {
  constructor () {
    super()
    this.Datainit = this.Datainit.bind(this)
  }
  async Datainit (req, res, next) {
    // console.log(req.body)
    let bannerlist = await bannermodel.find()
    let cardlist = await cardmodel.find({ status: true }).limit(5).sort({ order: -1 })
    if (cardlist) {
      res.send({
        status: 200,
        data: {
          cardlist: cardlist,
          bannerlist: bannerlist
        }
      })
    }
  }

  async dropdown (req, res, next) {
    let limit = parseInt(req.body.limit)
    let cardlist = await cardmodel.find({ status: true }).limit(limit).sort({ order: -1 })
    if (cardlist) {
      res.send({
        status: 200,
        cardlist: cardlist
      })
    }
  }

  async getmore (req, res, next) {
    let currentpage = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let row = (currentpage - 1) * limit

    let cardlist = await cardmodel.find({ 'status': true }).skip(row).limit(limit).sort({ order: -1 })
    if (cardlist.length !== 0) {
      res.send({
        status: 200,
        cardlist: cardlist
      })
    } else {
      res.send({
        status: -200,
        cardlist: cardlist
      })
    }
  }

  async filtercase (req, res, next) {
    let moneylimit = req.body.money_limit ? req.body.money_limit : ''
    let peoplelimit = req.body.people_limit ? req.body.people_limit : ''
    let moneyreg = new RegExp(moneylimit)
    let peoplereg = new RegExp(peoplelimit)
    let cardlist = await cardmodel.find({ $and: [{ 'status': true }, { money_limit: { $regex: moneyreg } }, { people_limit: { $regex: peoplereg } }] }).limit(5).sort({ order: -1 })
    if (cardlist) {
      res.send({
        status: 200,
        cardlist: cardlist
      })
    }
  }
  async getbank (req, res, next) {
    let result = await bankmodel.find()
    if (result) {
      res.send({
        status: 200,
        banklist: result
      })
    }
  }

  async getformdata (req, res, next) {
    let result = await sitebankmodel.findById(req.body.id)
    if (result) {
      res.send({
        status: 200,
        datalist: result
      })
    }
  }
  async creatbank (req, res, next) {
    let result = await sitebankmodel.create(req.body)
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

  async updatebank (req, res, next) {
    let id = req.params.id
    let result = await sitebankmodel.findByIdAndUpdate(id, req.body)
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

  async getcard (req, res, next) {
    let cardlist = []
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
    let result = await sitebankmodel.find({ openid: req.body.openid }).lean()
    if (result.length !== 0) {
      let platobj = {}
      for (let i = 0; i < result.length; i++) {
        platobj[i] = await bankmodel.find({ title: result[i].bankname })
        cardlist[i] = {}
        cardlist[i].id = result[i]._id
        cardlist[i].title = result[i].cardname
        cardlist[i].cardcode = result[i].cardcode
        cardlist[i].imgurl = platobj[i].imgurl
        cardlist[i].repaymentDate = trantime(parseInt(result[i].repaymentDate))
        cardlist[i].repaymentday = result[i].repaymentDate
      }
      for (const k in platobj) {
        cardlist[k].imgurl = platobj[k][0].imgurl
      }
      res.send({
        status: 200,
        cardlist: cardlist
      })
    } else {
      res.send({
        status: 200,
        cardlist: []
      })
    }
  }

  async getcardcount (req, res, next) {
    let result = await sitebankmodel.find({ openid: req.body.openid }).lean()
    if (result) {
      res.send({
        status: 200,
        cardcount: result.length
      })
    }
  }

  async historylist (req, res, next) {
    if (req.body.length !== 0) {
      let historylist = []
      for (let i = 0; i < req.body.length; i++) {
        historylist.push(await cardmodel.findById(req.body[i]))
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

export default new SiteCard()