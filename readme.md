# nodemon

## 安装
```shell
使用nodemon 来自动重启服务
$npm i -g nodemon
```

## 使用

```
之前 node ./app.js
现在 nodemon ./app.js
```

# art-template模板使用

## 第一步：引入art-template包
```shell
$npm i -P art-template
$npm i -P save express-art-template
```

## 第二步：项目中设置express应用art-template模板引擎
```javascript
//引入包：
const art_express = require('express-art-template');
//设置art模板引擎
const app = express();
app.engine('art',art_express);
//使用express提供的静态目录中间件
app.use(express.static(path.join(__dirname,'public')));
//动态的请求
app.get('/user/list',function(req,res){
    //res对象的render方法，第一个参数是模板文件名，第二个参数是给模板的数据,模板默认从views的文件夹里找
    res.render('userlist.art',{
        title: '你好啊！',
        users :userser.getUsers()
    })
    
})
```



# 使用mock.js生成模拟数据

## 第一步：安装mock.js 
```shell
$ npm i -D mockjs
```
## 第二步：引用并使用
```javascript
const mock = require('mockjs');
//使用mock.js生成随机数据
let data = mock.mock({
    "users|30":[{
        "id|+1": 10000,
        "name" : '@cname', //返回一个中文名字
        "email": '@email',
        'phone' : '@natural(13200000000,13399999999)', //返回区间之间的一个数字
        'address':'@county(true)', // 参数true 表示返回三级地址
        "zip" : '@zip',
        "birthday" : "@date(yyyy-MM-dd)"
    }]
});
```

# 使用mocha帮我们进行单元测试

## 安装
```shell
# 全局安装
$ npm i -g mocha

#本地安装
$ npm i -D mocha
```

## 创建测试文件夹test目录，然后添加测试脚本文件

```javascript
 //单元测试 BDD（行为驱动开发）
const userSrevice = require('../service/userService.js') 
//引入node的断言库
const assert = require('assert');

//一个单元测试：定义一个场景---->场景进行初始化数据----->开始调用测试的代码执行---->然后检查执行的结果
//看结果是否与我们预期的一样，一样就通过，不一样，就不通过。
//清理测试现场数据


//定义一个测试场景,第一个参数: 场景的描述，第二个参数：测试场景的回调
 
describe('userService服务测试',function(){
    //定义测试回调
    it('#getUsers',function(){
        //这个方法执行后，返回一个数组
        var users = userSrevice.getUsers();
        assert.equal(true,Array.isArray(users));
    })

    it('#getPages',function(){
        console.log('ssss');
    })
})

```

## 调用方式

```shell
# 在根目录下

 $  mocha

```

# should.js断言库的用法

## 安装

```shell
$ npm i should -D
```
## 构建断言对象
should提供了一个全局方法，构造一个断言对象

```javascript
const should = require('should');
var obj = {a:123};
should(obj).eqls({a:123});
should(obj).be.a.Object();

```

另外，should 劫持了Object的原型对象都拥有了should方法。


# istanbul覆盖率测试

Istanbul是JavaScript程序的代码的覆盖率工具

## 安装

```shell
$ npm i -g instanbul
```

##  使用

```shell
 linux下
 $ istanbul cover _mocha
 windows下
 先本地安装mocha
 然后 
 $ istanbul cover node_modules/mocha/bin/_mocha
```


