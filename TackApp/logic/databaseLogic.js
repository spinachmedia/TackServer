var express = require('express');
var app = express();

//追加
var mongodb = require('mongodb');
//DBAオブジェクト
var TACK_REPLY_INFO;
var TACK_INFO;

//mongoDBに接続
mongodb.MongoClient.connect("mongodb://localhost:27017/Tack", function(err, database) {
  if(err){}
  TACK_INFO = database.collection("TACK_INFO");
  TACK_REPLY_INFO = database.collection("TACK_REPLY_INFO");
});


var getReplyCount = function(tackId){
    
    
    
}