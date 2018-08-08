import mongoose from 'mongoose'
const Schema = mongoose.Schema
const platforminfo = new Schema({
  imgurl: String,
  title: String
})

// mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens
const platform = mongoose.model('platform', platforminfo)

export default platform