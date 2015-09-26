/**
 * 
 * RESTAPI　特定のTackについたリプライのリストを取得する
 * 
 */

var express = require('express');
var router = express.Router();


var app = express();

//追加
var mongodb = require('mongodb');
//DBAオブジェクト
var TACK_REPLY_INFO;

//mongoDBに接続
mongodb.MongoClient.connect("mongodb://localhost:27017/Tack", function(err, database) {
  if(err){}
  TACK_REPLY_INFO = database.collection("TACK_REPLY_INFO");
});

//更にルーティング
router.get("/", function(req, res) {
  
  //Facebookのログインをしていない場合、弾く。
  
  //ユーザのアカウント情報を取得
  var tack_id = req.query.tack_id;
  
  //始点
  var start = req.query.start;
  
  //取得する数
  var count = req.query.count;
  
  //空っぽの場合は東京駅の座標
  if(tack_id == null){
    tack_id = null;
  }
  
  if(start == null){
    start = 0;
  }else{
    start = parseInt(start);
  }
  
  if(count == null){
    count = 10;
  }else{
    count = parseInt(count);
  }
  
  var searchObject = { 
    "tack_id" : tack_id
  };
  
  // 非同期コールバック処理なので注意。
  // コレクションから値を取得する。
  // sort は　1 or -1
  TACK_REPLY_INFO.find(searchObject).sort({ regist_date : -1 }).skip(start).limit(count).toArray(function(err, items) {
    if(err){console.log(err)}
    //レスポンスのテンプレートを指定し、パラメータを第二引数で渡す
    //RESTAPIなのでテンプレートは利用しない
    res.send({"items":items});
    
  });//find
  
  
});//router

module.exports = router;
