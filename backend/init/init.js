const DB = require('../config/config')
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const User = require('../model/user')
const TLD = require('../model/tld')

// create the database
MongoClient.connect(DB.DB_URL + DB.DB_NAME, (err, db) => {
  if (err) throw err
  db.close()
})

mongoose.connect(DB.DB_URL + DB.DB_NAME)

// create a default user
const defaultUser = new User({
  username: 'admin',
  password: 'admin',
  admin: true
})
// insert into db the created user
defaultUser.save((err) => {
  if (err) throw err
})

// read tlds from json
const data = JSON.parse(fs.readFileSync('./tld.json', 'utf8'))
// insert all tlds into db
data.forEach(item => {
  const tld = new TLD({country: item.country_name, tld: item.tld})
  tld.save((err) => {
    if (err) throw err
  })
})

console.log('initialized')
