const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (app) => {
  app.get('/api/users', (req, res) => {
    User.find({}, (err, result) => {
      if (err || result.length === 0) res.json({status: 404})
      else res.json({status: 200, data: result})
    })
  })
  app.get('/api/users/:id', (req, res) => {
    User.findOne({_id: req.params.id}, (err, result) => {
      if (err || !result) res.json({status: 404})
      else res.json({status: 200, data: result})
    })
  })
  app.post('/api/users', (req, res) => {
    const user = req.body.user
    if (user._id) {
      User.findOneAndUpdate({_id: user._id}, user, (err) => {
        if (err) res.json({status: 403})
        else res.json({status: 200})
      })
    } else {
      new User(user).save((err) => {
        if (err) res.json({status: 403})
        else res.json({status: 200})
      })
    }
  })
  app.delete('/api/users', async (req, res) => {
    await Promise.all(req.body.users.map(user => User.findOneAndRemove({_id: user._id})))
    res.json({status: 200})
  })
}
