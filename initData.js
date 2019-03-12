//初始化用户默认测试数据


const fs =require('fs');
const path = require('path');
const dbjson = require('./DB.json');
const mock = require('mockjs');


//初始化users数据
dbjson.users || (dbjson.users = []);


//#region 之前自己用for循环生成的数据
// for(let i=0;i<30;i++){
//     dbjson.users.push({
//         id:10000 + i,
//         name : 'mxh' + i,
//         tele_number : '123242'+i
//     })
// }
//#endregion

//使用mock.js生成随机数据
let data = mock.mock({
    "users|144":[{
        "id|+1": 10000,
        "name" : '@cname', //返回一个中文名字
        "email": '@email',
        'phone' : '@natural(13200000000,13399999999)', //返回区间之间的一个数字
        'address':'@county(true)', // 参数true 表示返回三级地址
        "zip" : '@zip',
        "birthday" : "@date(yyyy-MM-dd)"
    }]
});


//es6中的展开运算符，展开字符串，对象，数组
//push是一条一条进行添加的 用 ... 将数据展开
dbjson.users.push(...data.users);

//把数据写入数据

fs.writeFileSync(path.join(__dirname,"Db.json"),JSON.stringify(dbjson),{encoding:'utf8'});





console.log('基本数据写入成功')