const CONFIG = require('../../config/config')
const mongoose = require('mongoose')
const User = require('../../model/user')
const jwt = require('jsonwebtoken')

mongoose.connect(CONFIG.DB_URL + CONFIG.DB_NAME)

module.exports = (app) => {
  app.post('/api/authenticate', (req, res) => {
    let credentials = {
      username: req.body.username,
      password: req.body.password
    }
    credentials = validateCredentials(credentials)
    User.findOne({
      username: credentials.username,
      password: credentials.password
    }, (err, result) => {
      if (err || !result) res.json({status: 404})
      else {
        const token = jwt.sign(
          {user_id: result._id},
          CONFIG.S_W,
          {expiresIn: 86400} /* 24 hours */
        )
        res.json({status: 200, data: token})
      }
    })
  })
}

function validateCredentials (credentials) {
  const username = credentials.username.trim().toString()
  const password = credentials.password.trim().toString()
  return {
    username: username,
    password: password
  }
}
