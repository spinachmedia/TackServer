/**
 * 
 * RESTAPI　近い順に50件のTackを取得する
 * 座標情報がない場合、東京駅を中心座標とする
 * 
 */

var express = require('express');
var router = express.Router();
var FB = require('../logic/facebookLoginCheck');
var fb = new FB();

var app = express();

//追加
var mongodb = require('mongodb');
//DBAオブジェクト
var TACK_REPLY_INFO;

//mongoDBに接続
mongodb.MongoClient.connect("mongodb://localhost:27017/Tack", function(err, database) {
  if(err){}
  TACK_REPLY_INFO = database.collection("TACK_REPLY_INFO");
  TACK_REPLY_INFO.ensureIndex({loc: "2dsphere"}, {}, function(err, result) {if(err){}console.log(result)});
});

//更にルーティング
router.post("/", function(req, res) {
  fb.checkTokenForPost(req, res, callback);
});
  
function callback(req, res){
  
   //Facebookのログインをしていない場合、弾く。
  var tack_id = req.body.tack_id;
  var sns_id = req.body.sns_id;
  var comment = req.body.comment;

  
  if(sns_id == null){
    sns_id = null;
    //エラーを返さないとね
    //res.send({"error":"sns_id is not found."});
  }
  
  var insertObject = {
    tack_id: tack_id,
    sns_id: sns_id,
    comment: comment,
    date: new Date().toISOString(),//2014-03-07T10:00:00
  };
  
  
  // 座標から近い順に50件を取得
  // 非同期コールバック処理なので注意。
  // コレクションから値を取得する。
  TACK_REPLY_INFO.insert(insertObject,function(err, records) {
    
    if(err){console.log(err)}
    
    //レスポンスのテンプレートを指定し、パラメータを第二引数で渡す
    //RESTAPIなのでテンプレートは利用しない
    res.send({"items":records});
    
  });//find
  
}

module.exports = router;
