const express = require('express')
const app = express()
const port = process.env.PORT || 3001;
const cors = require('cors')
const bodyParser = require("body-parser")
const multer = require('multer')
const path = require('path')
require('dotenv').config()

app.use(bodyParser.urlencoded({extended: true}))
// app.use(express.static(path.join(__dirname, "public")))
app.use('/public/images', express.static('./public/images'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/prodimg')
      },
      filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(
            null, 
            Date.now() + path.parse(file.originalname).name + path.extname(file.originalname)
        )
      }
})
const upload = multer({storage})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const routes = require('./routes');
app.use(routes)

// app.post("/api/upload/prodimg", upload.single('image'), (req, res) => {
app.post("/api/upload/prodimg", upload.fields([{
    name: 'imageOne', maxCount: 1
  }, {
    name: 'imageTwo', maxCount: 1
  },{
    name: 'imageThree', maxCount: 1
  },{
    name: 'imageFour', maxCount: 1
  }]), (req, res) => {
    console.log('masuk ke route')
    let imageArr = []
    // console.log(req.files.imageOne[0])
    if(req.files.imageOne !== undefined){
        // console.log(req.files.imageOne[0])
        imageArr.push(req.protocol + "://" + req.get("host") + "/public/images/prodimg/" + req.files.imageOne[0].filename.replace(/ /g,"_"))
    } else {
        imageArr.push('')
    }
    if(req.files.imageTwo !== undefined){
        // console.log(req.files.imageTwo[0])
        imageArr.push(req.protocol + "://" + req.get("host") + "/public/images/prodimg/" + req.files.imageTwo[0].filename.replace(/ /g,"_"))
    } else {
        imageArr.push('')
    }
    if(req.files.imageThree !== undefined){
        // console.log(req.files.imageThree[0])
        imageArr.push(req.protocol + "://" + req.get("host") + "/public/images/prodimg/" + req.files.imageThree[0].filename.replace(/ /g,"_"))
    } else {
        imageArr.push('')
    }
    if(req.files.imageFour !== undefined){
        // console.log(req.files.imageFour[0])
        imageArr.push(req.protocol + "://" + req.get("host") + "/public/images/prodimg/" + req.files.imageFour[0].filename.replace(/ /g,"_"))
    } else {
        imageArr.push('')
    }
    // let finalImageURL = req.protocol + "://" + req.get("host") + "/public/images/prodimg/" + req.file.filename
    // console.log(imageArr)
    // res.json({status: 200, image: finalImageURL})
    res.json({status: 200, resultFiles: req.files, imageNames: imageArr})
})


app.listen(port, () => {
    console.log(`App is listening on ${port}`)
})