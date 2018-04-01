const mongoose = require('mongoose')
const TLD = mongoose.model('TLD')

module.exports = (app) => {
  app.post('/api/tlds', (req, res) => {
    const tld = req.body.tld
    if (tld._id) {
      TLD.findOneAndUpdate({_id: tld._id}, tld, (err) => {
        if (err) res.json({status: 403})
        else res.json({status: 200})
      })
    } else {
      new TLD(tld).save((err) => {
        if (err) res.json({status: 403})
        else res.json({status: 200})
      })
    }
  })
  app.delete('/api/tlds', async (req, res) => {
    await Promise.all(req.body.tlds.map(tld => TLD.findOneAndRemove({_id: tld._id})))
    res.json({status: 200})
  })
}
