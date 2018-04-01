const express = require('express')
const parser = require('body-parser')
const CONFIG = require('./config/config')
const mongoose = require('mongoose')
const PORT = 8083

const app = express()

app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'content-type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})

mongoose.connect(CONFIG.DB_URL + CONFIG.DB_NAME)

require('./models')

require('./routes')(app)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
