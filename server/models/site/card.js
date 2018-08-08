import mongoose from 'mongoose'
const Schema = mongoose.Schema
const bank = new Schema({
  openid: { type: String },
  bankname: { type: String },
  cardcode: { type: String },
  cardname: { type: String },
  remindDate: { type: String },
  repaymentDate: { type: String },
  Count: { type: String }
})

const bankManage = mongoose.model('bank', bank)
export default bankManage