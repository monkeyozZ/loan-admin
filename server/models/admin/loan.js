import mongoose from 'mongoose'
const Schema = mongoose.Schema
const loaninfo = new Schema({
  title: String,
  imgurl: String,
  des: String,
  url: String,
  pass_rate: String,
  success_num: String,
  money_limit: String,
  people_limit: String,
  recommend: Boolean,
  status: Boolean,
  order: Number
})

// mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens
const loan = mongoose.model('loan', loaninfo)

export default loan