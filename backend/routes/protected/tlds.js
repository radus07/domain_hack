const DB = require('../../config/config')
const mongoose = require('mongoose')
const Tld = require('../../models/tld')

mongoose.connect(DB.DB_URL + DB.DB_NAME)

module.exports = (app) => {
  app.post('/api/tlds', (req, res) => {
    const newTld = new Tld({
      country: req.body.country,
      tld: req.body.tld
    })
    newTld.save((err) => {
      if (err) res.json({status: 403})
      else res.json({status: 201})
    })
  })
  app.put('/api/tlds', (req, res) => {
    const tldBody = {
      country: req.body.country,
      tld: req.body.tld
    }
    Tld.update({_id: req.body._id}, tldBody, {upsert: true}, (err) => {
      if (err) res.json({status: 403})
      else res.json({status: 200})
    })
  })
  app.delete('/api/tlds', (req, res) => {
    req.body.tlds.forEach(tld => {
      Tld.findByIdAndRemove(tld._id, (err) => {
        if (err) res.json({status: 403})
      })
    })
    res.json({status: 200})
  })
}
