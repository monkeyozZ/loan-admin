import mongoose from 'mongoose'
const Schema = mongoose.Schema
const content = new Schema({
  content: String
})

// mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens
const relief = mongoose.model('relief', content)

export default relief