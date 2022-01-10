const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const morgan = require('morgan')

const authRouter = require('./routes/auth')
const phoneRouter = require('./routes/phone')
const keys = require('./config/keys')

const app = express()

app.use(passport.initialize())
require('./middleware/passport')(passport)

mongoose.connect(keys.mongoUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use('/api/auth/', authRouter)
app.use('/api/phone/', phoneRouter)

app.listen(5000, () => console.log('Server started on 5000'))