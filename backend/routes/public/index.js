module.exports = (app) => {
  /**
   * Add all public routes here
   */
  require('./tlds')(app)
  require('./users')(app)
}
