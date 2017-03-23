/**
 * Created by sowayai1 on 2017/3/21.
 */
var mongoose = require('mongoose');

//注意大坑：如果是user对应的数据集会自动变成users
var Msg = mongoose.model('msg', new mongoose.Schema({
    send: String,
    sendname:String,
    to: String,
    message: String,
    islook:Number,
    sendtime:Date
},{_id:true}));

module.exports=Msg;