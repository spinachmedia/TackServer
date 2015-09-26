/**
 * 
 * RESTAPI　自分のTackを最新から30件取得する
 * 
 */

var express = require('express');
var router = express.Router();


var app = express();

//追加
var mongodb = require('mongodb');
//DBAオブジェクト
var TACK_INFO;

//mongoDBに接続
mongodb.MongoClient.connect("mongodb://localhost:27017/Tack", function(err, database) {
  if(err)console.log(err);
  TACK_INFO = database.collection("TACK_INFO");
});

//更にルーティング
router.get("/", function(req, res) {

  //ユーザのアカウント情報を取得
  var sns_id = req.query.sns_id;
  
  //始点
  var start = req.query.start;
  
  //取得する数
  var count = req.query.count;
  
  //空っぽの場合は東京駅の座標
  if(sns_id == null){
    sns_id = null;
  }
  
  if(start == null){
    start = 0;
  }else{
    start = parseInt(start);
  }
  
  if(count == null){
    count = 50;
  }else{
    count = parseInt(count);
  }
  
  var searchObject = { 
    "sns_id" : sns_id
  };
  
  // 非同期コールバック処理なので注意。
  // コレクションから値を取得する。
  // sort は　1 or -1
  TACK_INFO.find(searchObject).sort({ 'date' : -1 }).skip(start).limit(count).toArray(function(err, items) {
    if(err){console.log(err)}
    //レスポンスのテンプレートを指定し、パラメータを第二引数で渡す
    //RESTAPIなのでテンプレートは利用しない
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send({"items":items});
    
  });//find
  
});//router

module.exports = router;
