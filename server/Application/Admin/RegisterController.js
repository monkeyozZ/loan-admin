import Base from './BaseController'

import Registermodel from '../../models/site/register'
class Register extends Base {
  constructor () {
    super()
    this.index = this.index.bind(this)
    this.search = this.search.bind(this)
    this.downsearch = this.downsearch.bind(this)
  }

  async index (req, res, next) {
    // console.log(req.query)
    let currentpage = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let row = (currentpage - 1) * limit
    let count = await Registermodel.count({})
    // console.log(row)

    let result = await Registermodel.find().skip(row).limit(limit).sort({ date: -1 })
    if (result) {
      res.send({
        status: 200,
        registerlist: result,
        total: count
      })
    }
  }

  async search (req, res, next) {
    let startTime = req.body['date[0]']
    let endTime = req.body['date[1]']
    let phone = req.body.phone
    let currentpage = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let row = (currentpage - 1) * limit
    // console.log('startTime:' + startTime, 'endTime:' + endTime, row)
    if (startTime === undefined && endTime === undefined && phone === '') {
      let count = await Registermodel.count({})
      let result = await Registermodel.find().skip(row).limit(limit).sort({ date: -1 })
      if (result) {
        res.send({
          status: 200,
          registerlist: result,
          total: count
        })
      }
    }
    if (startTime !== undefined && endTime !== undefined && phone !== '') {
      let count = await Registermodel.count({ $and: [{ 'date': { $gte: startTime } }, { 'date': { $lte: endTime } }, { 'phone': phone }] })
      let result = await Registermodel.find({ $and: [{ 'date': { $gte: startTime } }, { 'date': { $lte: endTime } }, { 'phone': phone }] }).skip(row).limit(limit).sort({ date: -1 })
      if (result) {
        res.send({
          status: 200,
          registerlist: result,
          total: count
        })
      }
    }

    if (startTime === undefined && endTime === undefined && phone !== '') {
      let count = await Registermodel.count({'phone': phone})
      let result = await Registermodel.find({ 'phone': phone }).skip(row).limit(limit).sort({ date: -1 })
      if (result) {
        res.send({
          status: 200,
          registerlist: result,
          total: count
        })
      }
    }
    if (startTime !== undefined && endTime !== undefined && phone === '') {
      let count = await Registermodel.count({ $and: [{ 'date': { $gte: startTime } }, { 'date': { $lte: endTime } }] })
      let result = await Registermodel.find({ $and: [{ 'date': { $gte: startTime } }, { 'date': { $lte: endTime } }] }).skip(row).limit(limit).sort({ date: -1 })
      if (result) {
        res.send({
          status: 200,
          registerlist: result,
          total: count
        })
      }
    }
  }

  async downsearch (req, res, next) {
    let startTime = req.body['date[0]']
    let endTime = req.body['date[1]']
    let phone = req.body.phone

    if (startTime === undefined && endTime === undefined && phone === '') {
      let count = await Registermodel.count({})
      let result = await Registermodel.find({})
      if (result) {
        res.send({
          status: 200,
          registerlist: result,
          total: count
        })
      }
    }

    if (startTime !== undefined && endTime !== undefined && phone === '') {
      let count = await Registermodel.count({ $and: [{ 'date': { $gte: startTime } }, { 'date': { $lte: endTime } }] })
      let result = await Registermodel.find({ $and: [{ 'date': { $gte: startTime } }, { 'date': { $lte: endTime } }] }).sort({ date: -1 })
      if (result) {
        res.send({
          status: 200,
          registerlist: result,
          total: count
        })
      }
    }

    if (startTime !== undefined && endTime !== undefined && phone !== '') {
      let count = await Registermodel.count({ $and: [{ 'date': { $gte: startTime } }, { 'date': { $lte: endTime } }, { 'phone': phone }] })
      let result = await Registermodel.find({ $and: [{ 'date': { $gte: startTime } }, { 'date': { $lte: endTime } }, { 'phone': phone }] }).sort({ date: -1 })
      if (result) {
        res.send({
          status: 200,
          registerlist: result,
          total: count
        })
      }
    }
  }
}
export default new Register()