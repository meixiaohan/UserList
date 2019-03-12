const express = require('express');
const path = require('path');
const art_express = require('express-art-template');
const userserService = require('./service/userService.js');
const IndexRouter = require('./routers/indexRouter');
const ApiRouter = require('./routers/apiRouters');


//用以下两个中间件之前先安装,用于获取表单数据
// npm i -P multer
// npm i -P body-parser
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5

//创建app对象
const app = express();



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({            //默认处理表单数据到req.body里面去
    extended: true
})); // for parsing application/x-www-form-urlencoded


//添加路由中间价
app.use('/human',IndexRouter);
app.use('/api',ApiRouter);

//设置art模板引擎
app.engine('art', art_express);


//使用express提供的静态目录中间件
app.use(express.static(path.join(__dirname, 'public')));


//动态的请求
app.get('/user/list', function (req, res) {

    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const data = userserService.getPages(page, size);
    data.page = req.query.page;
    res.render('user/userlist.art', data);


    // res.send('动态的请求');
    // res.end();

    // //res对象的render方法，第一个参数是模板文件名，第二个参数是给模板的数据,模板默认从views的文件夹里找
    // res.render('userlist.art',{
    //     title: '你好啊！',
    //     users :userser.getUsers()
    // })
});


//#region 添加用户
app.get('/user/add', function (req, res) {
    res.render('user/userAdd.art')
})

app.post('/user/add', function (req, res) {
    //req.query() ==>获取请求地址中的参数
    //req.param  ==>通过路由获取参数
    //req.body  ==> 获取表单的参数

    // console.log('-------Start--------');
    // console.dir(req.body);
    // console.log('--------end---------');

    //把数据保存到DB.json文件中
    userserService.addUser(req.body);

    res.redirect('/user/list');
})

//#endregion

//#region 删除用户
app.get('/user/del',function(req,res){
   let userID = req.query.id;
   userserService.delUser(parseInt(userID))
   res.redirect('/user/list')
})
//#endregion

//#region 编辑用户
app.get('/user/edit',(req,res)=>{
    const user = userserService.getUSerByID(req.query.id);
    if(user==null){
        res.redirect('/user/list');
    }
    res.render('user/userEdit.art',user);

});


app.post('/user/edit',(req,res)=>{
    console.dir(req.body)
    userserService.editUser(req.body);
    res.redirect('/user/list');
});

//#endregion

//#region POST请求
app.post('/api/user',(req,res)=>{
    res.json(req.body);//返回一个json对象给前端
});
//#endregion

app.listen(22222, function () {
    console.log('正在监听~~~~~ http://127.0.0.1:22222');
});