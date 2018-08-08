import Base from './BaseController'
import formidable from 'formidable'
import path from 'path'
import fs from 'fs'
import bankmodel from '../../models/admin/bank'
class Bank extends Base {
  constructor () {
    super()
    this.insert = this.insert.bind(this)
  }

  async index (req, res, next) {
    // console.log(req.query)
    let currentpage = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let row = (currentpage - 1) * limit
    let count = await bankmodel.count({})
    // console.log(row)

    let result = await bankmodel.find().skip(row).limit(limit).sort({ order: -1 })
    if (result) {
      res.send({
        status: 200,
        banklist: result,
        total: count
      })
    }
  }

  async getonelist (req, res, next) {
    let id = req.body._id
    let result = await bankmodel.findById(id).lean()
    if (result) {
      res.send({
        status: 200,
        onelist: result
      })
    }
  }

  async insert (req, res, next) {
    let form = new formidable.IncomingForm()
    form.uploadDir = path.join(__dirname, '../../public/upload')
    form.parse(req, async (err, fields, files) => {
      if (!err) {
        if (files) {
          // console.log(files)
          let oldname = files.file.path
          let newname = files.file.path + path.extname(files.file.name)
          await fs.rename(oldname, newname, err => {
            if (err) {
              console.log(err)
            } else {
              if (fields) {
                let arr = newname.split('\\')
                let imgurl = '/' + arr[5] + '/' + arr[6]
                // console.log(imgurl)
                fields.imgurl = imgurl
                // console.log(fields)
                bankmodel.create(fields).then(() => {
                  res.send({
                    status: 200,
                    message: '添加成功'
                  })
                }).catch((error) => {
                  console.log(error)
                  res.send({
                    status: 200,
                    message: error.message
                  })
                })
              }
            }
          })
        }
      } else {
        console.log(err)
      }
    })
  }

  async update (req, res, next) {
    const id = req.params.id
    let form = new formidable.IncomingForm()
    form.uploadDir = path.join(__dirname, '../../public/upload')
    form.parse(req, async (err, fields, files) => {
      if (!err) {
        if (Object.keys(files).length !== 0) {
          // console.log(files)
          let oldname = files.file.path
          let newname = files.file.path + path.extname(files.file.name)
          await fs.rename(oldname, newname, err => {
            if (err) {
              console.log(err)
            } else {
              if (fields) {
                let arr = newname.split('\\')
                let imgurl = '/' + arr[5] + '/' + arr[6]
                // console.log(imgurl)
                fields.imgurl = imgurl
                // console.log(fields.originpic)
                let originurl = path.join(__dirname, '../../public' + fields.originpic)
                fs.unlink(originurl, function (err) {
                  if (err) {
                    console.log(err)
                  }
                })
                // console.log(originurl)
                delete fields.originpic
                bankmodel.findByIdAndUpdate(id, fields).then(() => {
                  res.send({
                    status: 200,
                    message: '修改成功'
                  })
                }).catch((error) => {
                  console.log(error)
                  res.send({
                    status: 200,
                    message: error.message
                  })
                })
              }
            }
          })
        } else {
          console.log(fields)
          bankmodel.findByIdAndUpdate(id, fields).then(() => {
            res.send({
              status: 200,
              message: '修改成功'
            })
          }).catch((error) => {
            console.log(error)
            res.send({
              status: 200,
              message: error.message
            })
          })
        }
      } else {
        console.log(err)
      }
    })
  }

  async delete (req, res, next) {
    let id = req.body._id
    let result = await bankmodel.findById(id).lean()
    // console.log(result)
    let originurl = path.join(__dirname, '../../public' + result.imgurl)
    fs.unlink(originurl, function (err) {
      if (err) {
        console.log(err)
      }
    })
    const result2 = await bankmodel.remove({ _id: id })
    // console.log(result)
    if (parseInt(result2.n) === 1) {
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

export default new Bank()