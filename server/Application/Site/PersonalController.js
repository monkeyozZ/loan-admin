import Base from './BaseController'
import Personalmodel from '../../models/site/Personal'

class Personal extends Base {
  constructor () {
    super()
    this.getonelist = this.getonelist.bind(this)
    this.step1 = this.step1.bind(this)
    this.step2 = this.step2.bind(this)
    this.step3 = this.step3.bind(this)
  }
  async getonelist (req, res, next) {
    let id = req.body.id
    Personalmodel.find({openid: id}).then((result) => {
      res.send({
        status: 200,
        onelist: result
      })
    })
  }
  async step1 (req, res, next) {
    req.body.city = req.body.city[0].name + ' ' + req.body.city[1].name
    // let status = ''
    if (req.body.openid) {
      Personalmodel.find({ openid: req.body.openid }).then((result) => {
        if (result.length !== 0) {
          Personalmodel.update({ openid: req.body.openid }, req.body).then(() => {
            res.send({
              status: 400,
              message: '修改成功'
            })
          })
        } else {
          console.log(1)
          Personalmodel.create(req.body).then((result) => {
            res.send({
              status: 200,
              id: result._id,
              message: '提交成功'
            })
          })
        }
      })
    }
  }

  async step2 (req, res, next) {
    let id = req.body.id
    req.body.city = req.body.city[0].name + ' ' + req.body.city[1].name
    Personalmodel.update({openid: id}, req.body).then((result) => {
      res.send({
        status: 200,
        message: '提交成功'
      })
    })
  }

  async step3 (req, res, next) {
    let id = req.body.id
    req.body.city = req.body.city[0].name + ' ' + req.body.city[1].name
    Personalmodel.update({openid: id}, req.body).then((result) => {
      res.send({
        status: 200,
        message: '提交成功'
      })
    })
  }
}

export default new Personal()