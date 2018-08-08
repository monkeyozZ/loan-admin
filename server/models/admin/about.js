import mongoose from 'mongoose'
const Schema = mongoose.Schema
const content = new Schema({
  content: String
})

// mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens
const about = mongoose.model('about', content)

export default about