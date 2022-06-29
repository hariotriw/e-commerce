const express = require('express')
const app = express()
const port = process.env.PORT || 3001;
const cors = require('cors')
const bodyParser = require("body-parser")
// const multer = require('multer')
// const path = require('path')
require('dotenv').config()

app.use(bodyParser.urlencoded({extended: true}))
// app.use(express.static(path.join(__dirname, "public")))
app.use('/public/uploads/posts', express.static('./public/uploads/posts'));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const routes = require('./routes');
app.use(routes)

app.listen(port, () => {
    console.log(`App is listening on ${port}`)
})