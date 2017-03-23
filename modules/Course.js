/**
 * Created by sowayai1 on 2017/3/22.
 */
var mongoose = require('mongoose');

//注意大坑：如果是user对应的数据集会自动变成users
var Course = mongoose.model('course', new mongoose.Schema({
    title: String,
    type:Number,
    logo:String,
    brief:String,
    uid:String,
    uname:String,
    status:Number,
    pubtime:Date
},{_id:true}));

module.exports=Course;