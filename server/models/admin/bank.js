import mongoose from 'mongoose'
const Schema = mongoose.Schema
const bankinfo = new Schema({
  imgurl: String,
  title: String
})

// mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens
const bank = mongoose.model('bankcate', bankinfo)

export default bank