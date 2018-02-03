const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('TLD', new Schema({
  country: String,
  tld: String
}))
