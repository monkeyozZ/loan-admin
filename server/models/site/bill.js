import mongoose from 'mongoose'
const Schema = mongoose.Schema
const bill = new Schema({
  openid: { type: String },
  loanterrace: { type: String },
  imgurl: { type: String },
  repaymentDate: { type: String },
  repaymentNum: { type: String },
  hasrepaymentCount: { type: String },
  repaymentCount: { type: String },
  remindDate: { type: String }
})

const billManage = mongoose.model('bill', bill)
export default billManage