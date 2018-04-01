const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const CONFIG = require('../../config/config')

module.exports = (app) => {
  app.post('/api/users/login', (req, res) => {
    const credentials = req.body.user
    validateCredentials(credentials)
    User.findOne(credentials, (err, result) => {
      if (err || !result) res.json({status: 404})
      else res.json({status: 200, data: getToken(result)})
    })
  })
}

const validateCredentials = credentials => {
  credentials.username.trim().toString()
  credentials.password.trim().toString()
}

const getToken = user => {
  return jwt.sign(
    {user_id: user._id},
    CONFIG.S_W,
    {expiresIn: 86400} /* 24 hours */
  )
}
