import Base from './BaseController'

import Noticemodel from '../../models/admin/notice'
class Notice extends Base {
  constructor () {
    super()
    this.getlist = this.getlist.bind(this)
    this.insert = this.insert.bind(this)
    this.getonelist = this.getonelist.bind(this)
  }

  async getlist (req, res, next) {
    // console.log(req.query)
    let currentpage = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let row = (currentpage - 1) * limit
    let count = await Noticemodel.count({})
    // console.log(row)

    let result = await Noticemodel.find().skip(row).limit(limit).sort({ order: -1 })
    if (result) {
      res.send({
        status: 200,
        loanlist: result,
        total: count
      })
    } else {
      res.send({
        status: -200,
        message: '服务器发错误'
      })
    }
  }

  async getonelist (req, res, next) {
    let result = await Noticemodel.findById(req.body._id)
    if (result) {
      res.send(
        {
          status: 200,
          onelist: result
        }
      )
    }
  }

  async insert (req, res, next) {
    let result = await Noticemodel.create(req.body)
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

  async update (req, res, next) {
    const id = req.params.id
    req.body.date = Date.now()
    let result = await Noticemodel.findByIdAndUpdate(id, req.body)
    // console.log(result)
    if (result) {
      res.send(
        {
          status: 200,
          message: '修改成功'
        }
      )
    }
  }

  async delete (req, res, next) {
    let id = req.body._id
    const result = await Noticemodel.remove({ _id: id })
    if (parseInt(result.n) === 1) {
      res.send({
        status: 200,
        message: '删除成功'
      })
    } else {
      res.send({
        status: -200,
        message: '删除失败'
      })
    }
  }
}

export default new Notice()