const DB = require('../config/config')
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const User = require('../model/user')
const TLD = require('../model/tld')

// drop database
MongoClient.connect(DB.DB_URL, function (err, db) {
  if (err) throw err
  const dbo = db.db(DB.DB_NAME)
  dbo.dropDatabase()
})
// create database
MongoClient.connect(DB.DB_URL + DB.DB_NAME, (err, db) => {
  if (err) throw err
  db.close()
})

mongoose.connect(DB.DB_URL + DB.DB_NAME)

// create a default user
const defaultUser = new User({
  username: 'admin',
  password: Buffer.from('admin').toString('base64')
})
// insert into db the created user
defaultUser.save((err) => {
  if (err) throw err
})

// read tlds from json
const data = JSON.parse(fs.readFileSync('backend/init/tld.json', 'utf8'))
// insert all tlds into db
data.forEach(item => {
  const tld = new TLD({country: item.country_name, tld: item.tld})
  tld.save((err) => {
    if (err) throw err
  })
})

console.log('initialized')
