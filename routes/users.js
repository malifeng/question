var express = require('express');
var router = express.Router();
var User = require('../modules/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 登录模态框
router.get('/login', function(req, res, next) {
    res.render('login',{});
});
// 注销
router.get('/logout', function(req, res, next) {
    delete req.session.loginbean;
    res.redirect('/');
});


// 登录
router.post('/login', function(req, res, next) {
    email = req.body['email'];
    pwd = req.body['pwd'];
    User.findOne({email:email,pwd:pwd},function(err,rs){
        if(rs){
            loginbean = {};
            loginbean.id=rs._id;
            loginbean.nicheng = rs.nicheng;
            loginbean.role = rs.role;
            loginbean.msgnum = rs.msgnum;
            req.session.loginbean = loginbean;
            console.log(loginbean);
            //res.send('登陆成功');
            res.redirect('/');    //跳转回index页
        }else{
            res.send('<script>alert("email/密码错误");location.href="/";</script>');
        }
    })
});
// 注册
router.post('/zhuce', function(req, res, next) {
    email = req.body['email'];
    pwd = req.body['pwd'];
    nicheng = req.body['nicheng'];
    // 0管理员 1学生 2审核 3老师
    console.log(nicheng,pwd)
    var user = new User({});
    user.email = email;
    user.pwd = pwd ;
    user.nicheng = nicheng;
    user.role = 1;
    user.msgnum = 0;
    user.save(function (err) {
        if (err){
            console.log(err);
            if (err.toString().indexOf('emailuiq')>0){
                res.send('email重复');
            }else if(err.toString().indexOf('nichenguiq')>0){
                res.send('昵称重复');
            }else{
                res.send('数据库错误,稍后再试');
            }
            return
        }
        res.redirect(307,'./login');
    });
});

module.exports = router;
