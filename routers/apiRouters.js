const express = require('express');
const userService = require('../service/userService.js');

//创建一个路由对象 可使用 get post all 
const router = express.Router();

//router对象相当于 app 
router.get('/userlist',function(req,res){
    const data = userService.getPages(parseInt(req.query.page),parseInt(req.query.size));

    res.json(data);
});

router.post('/deluser/:id',function(req,res){
    let id = parseInt(req.params.id);
    res.json(userService.delUser(id));
});


router.post('/addUser',(req,res)=>{
    res.json(userService.addUser(req.body));
});


router.post('/edit',function(req,res){
    console.log(req.body.id);
    res.json(userService.getUSerByID(req.body.id));
});

router.post('/update',function(req,res){
    console.log(req.body);
    res.json(userService.editUser(req.body));
});


module.exports = router;