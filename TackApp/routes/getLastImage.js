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
var TACK_INFO;

//mongoDBに接続
mongodb.MongoClient.connect("mongodb://localhost:27017/Tack", function(err, database) {
  if(err){}
  TACK_INFO = database.collection("TACK_INFO");
  TACK_INFO.ensureIndex({loc: "2dsphere"}, {}, function(err, result) {if(err){}console.log(result)});
});

//更にルーティング
router.get("/", function(req, res) {
  fb.checkTokenForGet(req, res,callback);
});//router

function callback(req, res){
  
  //ユーザのアカウント情報を取得
  var sns_id = req.query.sns_id;
  
  //空っぽの場合は東京駅の座標
  if(sns_id == null){
    sns_id = null;
  }
  
  var searchObject = { 
    "sns_id" : sns_id,
    "has_file_flg" : true
  };
  
  // 座標から近い順に50件を取得
  // 非同期コールバック処理なので注意。
  // コレクションから値を取得する。
  TACK_INFO.find(searchObject).sort({ 'date' : -1 }).limit(1).toArray(function(err, items) {
    if(err){console.log(err)}
    //レスポンスのテンプレートを指定し、パラメータを第二引数で渡す
    //RESTAPIなのでテンプレートは利用しない
    res.send({"items":items});
    
  });//find
  
}

module.exports = router;
