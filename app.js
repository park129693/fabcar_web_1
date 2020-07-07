var express = require('express')
var app = express()
var path = require('path')
var fs = require('fs')
var bodyParser = require('body-parser')
var cors = require('cors')
//dotenv 실행
require('dotenv').config()
const mongoose = require('mongoose')

var pw = process.env.PASSWORD
var url = `mongodb+srv://root:${pw}@cluster0.ze1q8.mongodb.net/MyDB_Daejeon?retryWrites=true&w=majority`
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

var apiRouter = require('./routes/Router')

//view template setting
app.set('views', path.resolve(__dirname+'/views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
//cors 설정
app.use(cors())
//라우팅 파일 등록
app.use('/',apiRouter)

var port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Server is Starting at http://localhost:${port}`)
})

