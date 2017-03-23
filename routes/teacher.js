/**
 * Created by sowayai1 on 2017/3/22.
 */
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var Course = require("../modules/Course");

function showCourseList(id,req,res,url){
    Course.find({uid:id},function(err,courseRs){
        if(err){
            console.log(err);
            return;
        }
        res.render(url, {coursers:courseRs});
    })
}

/* GET home page. */
router.get('/', function(req, res, next) {
    let loginbean = req.session.loginbean;
    res.locals.loginbean = loginbean;
    if(loginbean.role>0){
        showCourseList(loginbean.id,req,res,'teacher');
    }else{
        res.send('<script>alert("你无权访问");location.href="/";</script>');
    }
});


router.get('/pubcourse', function(req, res, next) {
    res.locals.loginbean = req.session.loginbean;
    res.render('pubcourse', {});
});

router.post('/pubcourse', function(req, res, next) {
    let loginbean = req.session.loginbean
    res.locals.loginbean = loginbean;
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = './public/images/courselogo/';     //设置上传目录 文件会自动保存在这里
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 5 * 1024 * 1024 ;   //文件大小5M
    form.parse(req, function (err, fields, files) {
        if(err){
            console.log(err);
        }
        //console.log( fields)//这里就是post的XXX 的数据
        // console.log('上传的文件名:'+files.photo.name);//与客户端file同名
        // console.log('文件路径:'+files.photo.path);
        // res.send('接到参数,真名:'+fields.realname);
        let course = new Course({});
        course.title=fields.title;
        course.type = fields.type;
        course.logo = (files.cphoto.path).replace('public\\','');
        course.brief = fields.brief;
        course.uid = loginbean.id;
        course.uname = loginbean.nicheng;
        course.status = 0;
        course.pubtime = new Date();

        course.save(function(err,rs){
            if(err){
                console.log(err);
                res.send('数据库错误');
                return;
            }
            res.send('<script>alert("创建课程成功");location.href="/teacher/";</script>');
        })
    })
});

router.get('/chapter', function(req, res, next) {
    let loginbean = req.session.loginbean;
    res.locals.loginbean = loginbean;
    if(loginbean.role>0){
        let id = req.query['id'];
        let title = req.query['title'];
        res.render('chapter', {id:id,title:title});
    }else{
        res.send('<script>alert("你无权访问");location.href="/";</script>');
    }
});

module.exports = router;

