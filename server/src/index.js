var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')

var path = require('path')
import config from './config/global.js'
import uploadRouter from './router/upload.js'
import testRouter from './router/test.js'

// config
app.set('uploadDir', path.join(__dirname, 'download'))

// middle
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// router
uploadRouter(app)
testRouter(app)


app.listen(config.port);
console.log(`server start in ${config.port} port`)
