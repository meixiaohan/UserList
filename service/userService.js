/*
 * 本文件用于 用户读取和操作用户数据的服务封装
 */

//加载json文件模块
const DBjson = require('../DB.json')

const fs = require('fs');
const path = require('path');

//获取用户
exports.getUsers = function () {
    return DBjson.users;
}


//分页
exports.getPages = function (page, size) {

    if (typeof (page) !== 'number' || typeof (size) !== 'number' || page <= 0 || size <= 0) {
        return {
            'code': 0,
            'msg': '参数错误。获取分页数据失败'
        }
    }


    return {
        'users': DBjson.users.sort((a,b)=>b.id-a.id).slice((page - 1) * size, page * size),
        'page':page,
         'count': DBjson.users.length,
        'code': 1,
        'msg': '获取分页数据成功'
    }
}

//添加用户
exports.addUser = function (user) {
    //检验输入的用户信息是否合法
    if (user.name == '') {
        return {
            'code': 0,
            'msg': '用户名不能为空'
        }
    }
    const userData = Object.assign({
        id: Date.now()
    }, user); //把第一个参数后的所有属性添加到第一个参数中
    DBjson.users.push(userData);

    _saveJson(DBjson);

    return {
        'code': 1,
        'msg': '保存成功'
    }

}


//删除用户
exports.delUser = function (id) {
    if (typeof (id) === 'number' && id > 0) {
     //获取用户id为 id 的用户的索引
    const index = DBjson.users.findIndex(u => u.id==id);
    DBjson.users.splice(index,1);
    _saveJson(DBjson);
    return{
        'code':1,
        'msg':'删除成功'
    }
    }

    return{
        'code':0,
        'msg':'删除失败 参数错误！'
    }
}

//根据用户ID查找用户
exports.getUSerByID =function(uid){
    const uId = parseInt(uid);  
    if(typeof(uId)=='number'&& uId>0){
        return DBjson.users.find(u => u.id==uId);
    }

    return null;
}



//修改用户信息
exports.editUser = function(user){
        const index = DBjson.users.findIndex(u =>u.id==user.id);
        console.log(index);
        DBjson.users.splice(index,1,user);
        _saveJson(DBjson);
        return{
            code:1
        }
}




//定义一个保存数据到json文件中的内部方法

function _saveJson(jsonData) {
    let data = JSON.stringify(jsonData);
    fs.writeFileSync(path.join(__dirname, '../DB.json'), data, {
        encoding: 'utf8'
    });
}