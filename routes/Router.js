var router = require('express').Router()
var queryUtil = require('../utils/Util')
var Car = require('../models/CarModel')

router.get('/', async(req, res, next)=>{
    var result = await queryUtil.queryAllData()
    var resultData =  await JSON.parse(result)
    console.log(resultData)
    // res.send(resultData)
    res.render('index',{data:resultData})
})

router.get('/searchdata', async(req, res, next)=>{
    console.log(req.query.search)
    var searchdata = req.query.search
    var result = await queryUtil.queryData(searchdata)
    var resultData =  await JSON.parse(result)
    // res.send(resultData)
    res.render('searchdata',{data:resultData, KEY:searchdata})
})

router.get('/savedata/:carnum', async(req, res, next)=>{
    console.log(req.params.carnum)
    var searchdata = req.params.carnum
    var result = await queryUtil.queryData(searchdata)
    var resultData =  await JSON.parse(result)

    console.log(resultData)
    res.render('savedata',{data:resultData, KEY:searchdata})
})

router.post('/savedata', async (req, res, next)=>{
    var contact = new Car()

    contact.KEY = req.body.KEY
    contact.color = req.body.color
    contact.docType = req.body.docType
    contact.make = req.body.make
    contact.model = req.body.model
    contact.owner = req.body.owner

    contact.save((err, result) => {
        if(err) {
            console.log(err)
        }

        console.log(result)
        res.redirect('/')

    })

})

module.exports = router;