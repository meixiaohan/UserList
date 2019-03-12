//单元测试 BDD（行为驱动开发）
const userSrevice = require('../service/userService.js') 
//引入node的断言库
const assert = require('assert');
//引入should.js断言库
const should = require('should');

//一个单元测试：定义一个场景---->场景进行初始化数据----->开始调用测试的代码执行---->然后检查执行的结果
//看结果是否与我们预期的一样，一样就通过，不一样，就不通过。
//清理测试现场数据


//before()在测试案例之前调用，通常用来测试数据的初始化
    before(function(){
        console.log('before...');
        require('../initData.js'); //直接执行initDta.js的代码,数据的初始化
    })

//arter()在测试案例完成之后调用，通常用来清理数据
    after(function(){
        console.log('after....');
    })


//定义一个测试场景,第一个参数: 场景的描述，第二个参数：测试场景的回调
 
describe('userService服务测试',function(){
    //定义测试回调
    it('#getUsers',function(){
        //这个方法执行后，返回一个数组
        var users = userSrevice.getUsers();
        //断言  前后两个语句执行结果相同就测试通过
        assert.equal(true,Array.isArray(users));
        assert.equal(true,users.length>0);
    })


    it('#getPages',function(){

        //正常数据
        const data =userSrevice.getPages(2,8);
        data.should.be.a.Object();
        data.code.should.eql(1);
        data.users.length.should.eql(8);
        data.msg.should.eql('获取分页数据成功');




        //异常数据
        const edata = userSrevice.getPages('sd2','-231');
        edata.should.be.a.Object();
        edata.code.should.eqls(0);
        edata.should.eqls( {
            'code': 0,
            'msg': '参数错误。获取分页数据失败'
        });
        
        //也可以这样
        // should(edata).eql( {
        //     'code': 0,
        //     'msg': '参数错误。获取分页数据失败'
        // })

    });



     //#region node原生的assert模块
    // it('#getPages',function(){
    //     // console.log('ssss');
    //     //30条数据
    //     const data = userSrevice.getPages(2,9);
    //     //假设返回值： users[....] ,code:1,msg:'获取分页数据成功'
    //     assert.equal(data.users.length,9);
    //     assert.equal(Array.isArray(data.users),true);
    //     assert.equal(data.code,1);
    //     assert.equal(data.msg,'获取分页数据成功');

    //     //测试异常数据,传入一个字符串数字
    //     const edata = userSrevice.getPages('2','10');
    //     assert.equal(edata.users.length,10);
    //     assert.equal(Array.isArray(edata.users),true);
    //     assert.equal(edata.code,1);
    //     assert.equal(edata.msg,'获取分页数据成功');

       
        //测试异常数据,传入一个非法字符
        //  const edata2 = userSrevice.getPages('%5','*83');
        //  assert.equal(edata2.users.length,10);
        //  assert.equal(Array.isArray(edata2.users),true);
        //  assert.equal(edata2.code,1);
        //  assert.equal(edata2.msg,'获取分页数据成功');

        //测试异常数据,传入一个非法字符
        //#endregion
    // })
})
