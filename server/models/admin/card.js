import mongoose from 'mongoose'
const Schema = mongoose.Schema
const cardinfo = new Schema({
  title: String,
  imgurl: String,
  des: String,
  url: String,
  recommend: Boolean,
  status: Boolean,
  order: Number
})

// mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens
const card = mongoose.model('card', cardinfo)

export default card