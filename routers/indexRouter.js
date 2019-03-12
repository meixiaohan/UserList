const express = require('express');
const userService = require('../service/userService')

//创建一个路由对象 可使用 get post all 
const router = express.Router();

//router对象相当于 app 
router.get('/list',function(req,res){
    res.render('human/index.art');
});



module.exports = router;