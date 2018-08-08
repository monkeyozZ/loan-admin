import mongoose from 'mongoose'
const Schema = mongoose.Schema
const noticecontent = new Schema({
  title: String,
  content: String,
  status: Boolean,
  date: { type: String, default: Date.now() }
})

// mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens
const notice = mongoose.model('notice', noticecontent)

export default notice