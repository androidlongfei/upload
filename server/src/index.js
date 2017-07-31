import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import config from './config/global.js'
import uploadRouter from './router/upload.js'
import testRouter from './router/test.js'
import downloadRouter from './router/download.js'
import pagingRouter from './router/paging.js'
import userRouter from './router/user.js'
import authRouter from './router/auth.js'

const app = express()

// config
app.set('uploadDir', path.join(__dirname, 'download'))
app.set('downloadDir', path.join(__dirname, 'download'))

// static file
app.use(express.static(path.join(__dirname, 'download')))

// middle
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// router
uploadRouter(app)
downloadRouter(app)
testRouter(app)
pagingRouter(app)
userRouter(app)
authRouter(app)


app.listen(config.port);
console.log(`server start in ${config.port} port`)
