const mongoose = require('mongoose')
const Schema = mongoose.Schema


const urlSchema = new Schema({
  urlFull: {
    type: String,
    required: true
  },
  urlShort: {
    type: String,
    required: true,
  },
  click: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('Url', urlSchema)