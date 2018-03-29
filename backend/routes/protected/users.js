const User = require('../../models/user')

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
      else res.json({status: 200})
    })
  })
  app.put('/api/users', (req, res) => {
    const user = new User({
      username: req.body.username,
      password: Buffer.from(req.body.password).toString('base64')
    })
    user.save((err) => {
      if (err) res.json({status: 403})
      else res.json({status: 201})
    })
  })
  app.post('/api/users', (req, res) => {
    User.update({_id: req.body._id}, {username: req.body.username}, {upsert: true}, (err) => {
      if (err) res.json({status: 403})
      else res.json({status: 200})
    })
  })
  app.delete('/api/users', (req, res) => {
    req.body.users.forEach(user => {
      User.findByIdAndRemove(user._id, (err) => {
        if (err) res.json({status: 403})
      })
    })
    res.json({status: 200})
  })
}
