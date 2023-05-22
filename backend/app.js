const express = require('express')
const bcrypt = require('bcryptjs');
const ErrorHandler = require('./middleware/error')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use('/', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "config/.env"
    })
}

// import route
const user = require('./controller/user')
const Shop = require('./controller/Shop')
const product = require('./controller/product')
const event = require('./controller/event')
const coupen = require('./controller/coupenCode')
const payment = require('./controller/payment')
const order = require('./controller/order')
const conversation = require('./controller/conversation')
const messages = require('./controller/messages')

app.use("/api/v2/user", user)
app.use("/api/v2/shop", Shop)
app.use("/api/v2/product", product)
app.use("/api/v2/event", event)
app.use("/api/v2/coupen", coupen)
app.use("/api/v2/payment", payment)
app.use("/api/v2/order", order)
app.use("/api/v2/conversation", conversation)
app.use("/api/v2/messages", messages)



app.use(ErrorHandler)

module.exports = app;