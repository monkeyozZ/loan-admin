import Base from './BaseController'
import Aboutmodel from '../../models/admin/about'
import Reliefmodel from '../../models/admin/relief'

class About extends Base {
  constructor () {
    super()
    this.about = this.about.bind(this)
  }

  async about (req, res, next) {
    let result = await Aboutmodel.find()
    if (result) {
      res.send({
        status: 200,
        content: result[0].content
      })
    }
  }

  async relief (req, res, next) {
    let result = await Reliefmodel.find()
    if (result) {
      res.send({
        status: 200,
        content: result[0].content
      })
    }
  }
}

export default new About()