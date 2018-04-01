const jwt = require('jsonwebtoken')
const CONFIG = require('../config/config')

module.exports = (app) => {
  /**
   * Public routes
   */
  app.get('/api', (req, res) => {
    res.sendStatus(200)
  })
  require('./public')(app)

  app.use((req, res, next) => {
    const token = req.headers['authorization']
    validateToken(req, res, next, token)
  })

  /**
   * Protected routes
   */
  require('./protected')(app)
}

function validateToken (req, res, next, token) {
  if (token && token.split(' ')[0] === 'Bearer') {
    jwt.verify(token.split(' ')[1], CONFIG.S_W, (err, decoded) => {
      if (err) {
        return res.json(401)
      }
      req.decoded = decoded
      next()
    })
  } else {
    return res.json(401)
  }
}
