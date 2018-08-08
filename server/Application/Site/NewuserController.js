import Base from './BaseController'
import newusermodel from '../../models/admin/newuser'
class Newuser extends Base {
  constructor () {
    super()
    this.getlist = this.getlist.bind(this)
  }

  async getlist (req, res, next) {
    let result = await newusermodel.find().limit(1).lean()
    if (result) {
      res.send({
        status: 200,
        giftlist: result
      })
    }
  }
}

export default new Newuser()