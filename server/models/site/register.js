import mongoose from 'mongoose'
const Schema = mongoose.Schema
const register = new Schema({
  name: { type: String, default: null },
  sex: { type: String, default: null },
  money: { type: String, default: null },
  phone: { type: String, default: null },
  city: { type: String, default: null },
  company: { type: String, default: null },
  pay: { type: String, default: null },
  way: { type: String, default: null },
  status: { type: String, default: null },
  card: { type: String, default: null },
  car: { type: String, default: null },
  home: { type: String, default: null },
  shebao: { type: String, default: null },
  gongjijin: { type: String, default: null },
  idcard: { type: String, default: null },
  date: { type: String, default: Date.now }
})

const registerManage = mongoose.model('loan_register', register)
export default registerManage