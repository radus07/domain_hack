const express = require('express')
const path = require('path')
const history = require('connect-history-api-fallback')
const httpPort = 8081

const app = express()
const staticFileMiddleware = express.static(path.join(__dirname))

app.use(history())
app.use(staticFileMiddleware)

app.listen(httpPort, () => {
  console.log(`Server listening on: http://localhost:${httpPort}`)
})
