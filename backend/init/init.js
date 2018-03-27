const DB = require('../config/config')
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const User = require('../models/user')
const TLD = require('../models/tld')

/**
 * Connect to MongoDB server and drop database with our name
 * @returns {Promise.<MongoClient>}
 */
const dropDatabase = async () => {
  await MongoClient.connect(DB.DB_URL, function (err, db) {
    if (err) throw err
    const dbo = db.db(DB.DB_NAME)
    dbo.dropDatabase()
  })
}

/**
 * Connect to MongoDB server and create a new database
 * @returns {Promise.<MongoClient>}
 */
const createDatabase = async () => {
  await MongoClient.connect(DB.DB_URL + DB.DB_NAME, (err, db) => {
    if (err) throw err
    db.close()
  })
}

/**
 * Use mongoose to connect to the database
 * @returns {Promise}
 */
const connectToDatabase = async () => {
  await mongoose.connect(DB.DB_URL + DB.DB_NAME)
}

/**
 * Create a list of users
 * @returns {Array}
 */
const getUsers = () => {
  let users = []
  users.push(new User({username: 'admin', password: Buffer.from('admin').toString('base64')}))
  return users
}

/**
 * Read the list of tlds from mock file
 * @returns {Array}
 */
const getTlds = () => {
  const data = JSON.parse(fs.readFileSync('backend/init/tld.json', 'utf8'))
  let tlds = []
  data.map(item => tlds.push(new TLD({country: item.country_name, tld: item.tld})))
  return tlds
}

/**
 * Insert a list of items into db
 * @param items
 */
const saveItems = async (items) => {
  await Promise.all(items.map((item) => item.save()))
}

/**
 * Close mongoose connection
 */
const closeConnection = async () => {
  await mongoose.connection.close()
  console.log(`All done.`)
  process.exit()
}

console.log('Initializing...')
Promise.all([
  dropDatabase(),
  createDatabase(),
  connectToDatabase(),
  saveItems(getUsers()),
  saveItems(getTlds())
]).then(() => closeConnection())
