module.exports = (app) => {
  /**
   * Public routes
   */
  require('./public')(app)

  // TODO add permissions validation

  /**
   * Protected routes
   */
  require('./protected')(app)
}
