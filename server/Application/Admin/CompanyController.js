import Base from './BaseController'

import Aboutmodel from '../../models/admin/about'
import Reliefmodel from '../../models/admin/relief'
import Contactmodel from '../../models/admin/contact'
class Company extends Base {
  constructor () {
    super()
    this.aboutinsert = this.aboutinsert.bind(this)
  }

  async aboutindex (req, res, next) {
    let result = await Aboutmodel.find()
    if (result.length !== 0) {
      res.send({
        status: 200,
        aboutcontent: result[0].content
      })
    }
  }
  async reliefindex (req, res, next) {
    let result = await Reliefmodel.find()
    if (result.length !== 0) {
      res.send({
        status: 200,
        reliefcontent: result[0].content
      })
    }
  }

  async contactindex (req, res, next) {
    let result = await Contactmodel.find()
    if (result.length !== 0) {
      res.send({
        status: 200,
        contactcontent: result[0].content
      })
    }
  }

  async aboutinsert (req, res, next) {
    let result = await Aboutmodel.find()
    if (result.length === 0) {
      let result2 = await Aboutmodel.create(req.body)
      if (result2) {
        res.send({
          status: 200,
          message: '添加成功'
        })
      } else {
        res.send({
          status: -100,
          message: '添加失败'
        })
      }
    } else {
      let id = result[0]._id
      let result3 = await Aboutmodel.findByIdAndUpdate(id, req.body)
      if (result3) {
        res.send({
          status: 200,
          message: '修改成功'
        })
      } else {
        res.send({
          status: -100,
          message: '修改失败'
        })
      }
    }
  }

  async reliefinsert (req, res, next) {
    let result = await Reliefmodel.find()
    if (result.length === 0) {
      let result2 = await Reliefmodel.create(req.body)
      if (result2) {
        res.send({
          status: 200,
          message: '添加成功'
        })
      } else {
        res.send({
          status: -100,
          message: '添加失败'
        })
      }
    } else {
      let id = result[0]._id
      let result3 = await Reliefmodel.findByIdAndUpdate(id, req.body)
      if (result3) {
        res.send({
          status: 200,
          message: '修改成功'
        })
      } else {
        res.send({
          status: -100,
          message: '修改失败'
        })
      }
    }
  }

  async contactinsert (req, res, next) {
    let result = await Contactmodel.find()
    if (result.length === 0) {
      let result2 = await Contactmodel.create(req.body)
      if (result2) {
        res.send({
          status: 200,
          message: '添加成功'
        })
      } else {
        res.send({
          status: -100,
          message: '添加失败'
        })
      }
    } else {
      let id = result[0]._id
      let result3 = await Contactmodel.findByIdAndUpdate(id, req.body)
      if (result3) {
        res.send({
          status: 200,
          message: '修改成功'
        })
      } else {
        res.send({
          status: -100,
          message: '修改失败'
        })
      }
    }
  }
}

export default new Company()