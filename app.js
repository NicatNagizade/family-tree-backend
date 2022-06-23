const express = require('express')
var cors = require('cors')
const router = require('./routes')
const app = express()
require('dotenv').config()
const port = process.env.APP_PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/member', router)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})