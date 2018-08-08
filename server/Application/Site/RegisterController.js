import Base from './BaseController'
import Registermodel from '../../models/site/register'
var request = require('request')

class Register extends Base {
  constructor () {
    super()
    this.getcode = this.getcode.bind(this)
    this.step1 = this.step1.bind(this)
    this.step2 = this.step2.bind(this)
    this.step3 = this.step3.bind(this)
  }

  async getcode (req, res, next) {
    console.log(req.body.phone)
    const randomNum = function (n) {
      var t = ''
      for (var i = 0; i < n; i++) {
        t += Math.floor(Math.random() * 10)
      }
      return t
    }
    let code = randomNum(4)
    let msg = '【币抖】您的验证码是' + code + '，如非本人操作，请忽略！'
    let data = {
      'account': 'N7356620',
      'password': 'avnh2JdVPofc9d',
      'phone': req.body.phone,
      'msg': msg,
      'report': false
    }
    let datastr = JSON.stringify(data)
    let options = {
      url: 'http://smssh1.253.com/msg/send/json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: datastr
    }
    request(options, (error, response, body) => {
      if (error) {
        console.log(error)
      } else {
        req.session.code = code
        res.send(body)
      }
    })
  }

  async step1 (req, res, next) {
    let code = parseInt(req.session.code)
    let usercode = parseInt(req.body.code)
    if (code === usercode) {
      Registermodel.create(req.body).then((result) => {
        res.send({
          status: 200,
          id: result._id,
          message: '提交成功'
        })
      })
    } else {
      res.send({
        status: -100,
        message: '验证码错误'
      })
    }
  }

  async step2 (req, res, next) {
    req.body.city = req.body.city[0].name + ' ' + req.body.city[1].name
    let id = req.body.id
    console.log(id)
    Registermodel.findByIdAndUpdate(id, req.body).then((result) => {
      res.send({
        status: 200,
        message: '提交成功'
      })
    })
  }

  async step3 (req, res, next) {
    let id = req.body.id
    Registermodel.findByIdAndUpdate(id, req.body).then((result) => {
      res.send({
        status: 200,
        message: '提交成功'
      })
    })
  }
}

export default new Register()