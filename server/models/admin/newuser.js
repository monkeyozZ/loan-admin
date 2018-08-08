import mongoose from 'mongoose'
const Schema = mongoose.Schema
const newuserinfo = new Schema({
  imgurl: String,
  url: String
})

// mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens
const newuser = mongoose.model('newuser', newuserinfo)

export default newuser