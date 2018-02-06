const DB = require('../config/config')
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const User = require('../model/user')
const TLD = require('../model/tld')

const defaultUser = new User({
  username: 'admin',
  password: Buffer.from('admin').toString('base64')
})

Promise.all([
  dropDatabase(),
  createDatabase(),
  connectToDatabase(),
  saveUser(defaultUser),
  saveTlds(getTlds()),
  closeConnection()
])

/**
 * connect to MongoDB server and try to drop if exists database with our name
 * @returns {Promise.<MongoClient>}
 */
function dropDatabase () {
  return MongoClient.connect(DB.DB_URL, function (err, db) {
    if (err) throw err
    const dbo = db.db(DB.DB_NAME)
    dbo.dropDatabase()
  })
}

/**
 * connect to MongoDB server and create a new database
 * @returns {Promise.<MongoClient>}
 */
function createDatabase () {
  return MongoClient.connect(DB.DB_URL + DB.DB_NAME, (err, db) => {
    if (err) throw err
    db.close()
  })
}

/**
 * use mongoose to connect to the database
 * @returns {Promise}
 */
function connectToDatabase () {
  return mongoose.connect(DB.DB_URL + DB.DB_NAME)
}

/**
 * save a default user
 * @param user
 */
function saveUser (user) {
  return user.save((err) => {
    if (err) throw err
  })
}

/**
 * read all default tlds and origin country from mock file
 * @returns {Array}
 */
function getTlds () {
  const data = JSON.parse(fs.readFileSync('backend/init/tld.json', 'utf8'))
  let tlds = []
  data.forEach(item => {
    tlds.push(new TLD({country: item.country_name, tld: item.tld}))
  })
  return tlds
}

/**
 * save all default tlds from mock file
 * @param tlds
 */
function saveTlds (tlds) {
  tlds.forEach(tld => {
    tld.save((err) => {
      if (err) throw err
    })
  })
}

/**
 * close mongoose connection to database
 */
function closeConnection () {
  setTimeout(function () {
    console.log(`Initialized. Press Ctrl+C to to terminate batch job.`)
    mongoose.connection.close()
  }, 3000)
}
