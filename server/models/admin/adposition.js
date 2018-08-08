import mongoose from 'mongoose'
const Schema = mongoose.Schema
const adpositioninfo = new Schema({
  imgurl: String,
  cate: String,
  des: String,
  url: String,
  order: Number
})

// mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens
const adposition = mongoose.model('adposition', adpositioninfo)

export default adposition