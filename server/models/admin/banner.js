import mongoose from 'mongoose'
const Schema = mongoose.Schema
const bannerinfo = new Schema({
  imgurl: String,
  des: String,
  url: String,
  order: Number
})

// mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens
const banner = mongoose.model('banner', bannerinfo)

export default banner