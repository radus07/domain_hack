const mongoose = require('mongoose')
const TLD = mongoose.model('TLD')

module.exports = (app) => {
  app.get('/api/tlds', (req, res) => {
    TLD.find({}, (err, result) => {
      if (err || result.length === 0) res.json({status: 404})
      else res.json({status: 200, data: result})
    })
  })
}
