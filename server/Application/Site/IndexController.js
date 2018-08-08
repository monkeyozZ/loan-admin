import Base from './BaseController'
import Loanmodel from '../../models/admin/loan'
import cardmodel from '../../models/admin/card'
import bannermodel from '../../models/admin/banner'
import adpositionmodel from '../../models/admin/adposition'
class Index extends Base {
  constructor () {
    super()
    this.index = this.index.bind(this)
  }
  async index (req, res, next) {
    let loanlist = await Loanmodel.find({ $and: [{ recommend: true }, { status: true }] }).sort({ order: -1 })
    let cardlist = await cardmodel.find({ $and: [{ recommend: true }, { status: true }] }).sort({ order: -1 })
    let bannerlist = await bannermodel.find()
    let advlist = await adpositionmodel.find().sort({ order: 1 }).limit(2)
    res.send({
      status: 200,
      data: {
        loanlist: loanlist,
        cardlist: cardlist,
        bannerlist: bannerlist,
        advlist: advlist
      }
    })
  }

  async getlastadv (req, res, next) {
    let advlist = await adpositionmodel.find().sort({order: -1}).limit(2)
    if (advlist) {
      res.send({
        status: 200,
        advlist: advlist
      })
    }
  }
}

export default new Index()