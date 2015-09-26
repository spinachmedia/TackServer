/**
 * 
 * RESTAPI　近い順に50件のTackを取得する
 * 座標情報がない場合、東京駅を中心座標とする
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
  if(err){}
  TACK_INFO = database.collection("TACK_INFO");
  TACK_INFO.ensureIndex({loc: "2dsphere"}, {}, function(err, result) {if(err){}console.log(result)});
});

//更にルーティング
router.get("/", function(req, res) {
  
  //Facebookのログインをしていない場合、弾く。
  console.log(req.query);
  

  //ユーザの座標を取得
  var lat = req.query.lat;
  var lng = req.query.lng;
  //取得する数
  var count = req.query.count;
  
  //空っぽの場合は東京駅の座標
  if(lat == null){
    lat = 35.681382;
  }
  if(lng == null){
    lng = 139.766084;
  }
  if(count == null){
    count = 50;
  }else{
    count = parseInt(count);
  }
  
  var searchObject = { 
    "loc" : { 
        $nearSphere : [parseFloat(lng) ,parseFloat(lat)]
    }
  };
  
  // 座標から近い順に50件を取得
  // 非同期コールバック処理なので注意。
  // コレクションから値を取得する。
  TACK_INFO.find(searchObject).limit(count).toArray(function(err, items) {
    if(err){console.log(err)}
    //レスポンスのテンプレートを指定し、パラメータを第二引数で渡す
    //RESTAPIなのでテンプレートは利用しない
    res.send({"items":items});
    
  });//find
  
});//router

module.exports = router;
