const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('TLD', new Schema({
  country: {type: String, unique: true, required: true},
  tld: {type: String, unique: true, required: true}
}))
