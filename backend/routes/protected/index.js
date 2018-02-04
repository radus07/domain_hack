module.exports = (app) => {
  /**
   * Add all protected routes here
   */
  require('./users')(app)
}
