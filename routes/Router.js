var router = require('express').Router()
var queryUtil = require('../utils/Util')

router.get('/', async(req, res, next)=>{
    var result = await queryUtil()
    var resultData =  await JSON.parse(result)
    console.log(resultData)
    // res.send(resultData)
    res.render('index',{data:resultData})
})

module.exports = router;