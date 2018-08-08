import Base from './BaseController'
import Noticemodel from '../../models/admin/notice'

class Notice extends Base {
  constructor () {
    super()
    this.list = this.list.bind(this)
  }

  async list (req, res, next) {
    let result = await Noticemodel.find()
    if (result) {
      res.send({
        status: 200,
        noticelist: result
      })
    }
  }

  async details (req, res, next) {
    let id = req.params.id
    let result = await Noticemodel.findById(id)
    if (result) {
      res.send({
        status: 200,
        noticedetails: result.content
      })
    }
  }

  async count (req, res, next) {
    let count = await Noticemodel.count({})
    res.send({
      status: 200,
      count: count
    })
  }
}

export default new Notice()