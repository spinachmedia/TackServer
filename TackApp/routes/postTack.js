/**
 * 
 * RESTAPI　近い順に50件のTackを取得する
 * 座標情報がない場合、東京駅を中心座標とする
 * 
 */

var express = require('express');
var uuid = require('node-uuid');
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
router.post("/", function(req, res) {
  
  //Facebookのログインをしていない場合、弾く。
  var tack_id = uuid.v4();
  var sns_id = req.body.sns_id;
  var category = req.body.category;
  var place_name = req.body.place_name;
  var comment = req.body.comment;
  var lat = req.body.lat;
  var lng = req.body.lng;
  var has_file_flg = req.body.has_file_flg;
  var files = req.files
  
  var file_path;
  
  if(sns_id == null){
    sns_id = null;
    //エラーを返さないとね
    //res.send({"error":"sns_id is not found."});
  }
  
  if(category == null){
    category = "FOOD";
  }
  
  if(place_name == null){
    place_name = "場所情報なし";
  }
  
  //空っぽの場合は東京駅の座標
  if(lat == null){
    lat = 35.681382;
  }else{
    lat = parseFloat(lat)
  }
  
  if(lng == null){
    lng = 139.766084;
  }else{
    lng = parseFloat(lng)
  }
  
  
  if(has_file_flg == null){
    has_file_flg = false;
  }
  
  if(files.file_data == null){
    has_file_flg = false;
  }else{
    
    has_file_flg = true
    
    //ファイルを保存する
    var tmp_path = files.file_data.path; 
    var target_path = './public/images/' + files.file_data.name;
    var fs = require('fs');
    file_path = target_path;
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        fs.unlink(tmp_path, function() {
        });
    });
    
  }
  
  
  var insertObject = {
    tack_id: tack_id,
    sns_id: sns_id,
    sns_category: "fb",
    category: category,
    place_name: place_name,
    comment: comment,
    good_tack: 0,
    city_code: 0,
    lat: lat,
    lng: lng,
    loc: [lng,lat],
    has_file_flg: has_file_flg,
    file_path: file_path,
    date: new Date().toISOString(),//2014-03-07T10:00:00
  };
  
  
  // 座標から近い順に50件を取得
  // 非同期コールバック処理なので注意。
  // コレクションから値を取得する。
  TACK_INFO.insert(insertObject,function(err, records) {
    
    if(err){console.log(err)}
    
    //レスポンスのテンプレートを指定し、パラメータを第二引数で渡す
    //RESTAPIなのでテンプレートは利用しない
    res.send({"items":records});
    
  });//find
  
});//router

module.exports = router;
