/**
 * 
 * RESTAPI　TackにGoodTackする
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
});

//更にルーティング
router.post("/", function(req, res) {

  //GoodTackの対象を指定
  var tack_id = req.body.tack_id;
  
  console.log("更新対象"+tack_id);
  
  var count = 0;
  
  TACK_INFO.findOne({ tack_id : tack_id},function(err,result){
    
    if(err){res.send({err:err});}
    if(result){
      result["good_tack"]++;
      
      console.log("更新データ"+result["good_tack"]);
      
      //UPDATE
     TACK_INFO.save(result,function(err2,result2){
       if(err2){res.send({err:err2});}
        res.send(result2); 
     })
     
    }else{
      res.send({result:result});
    }
  });
});//router

module.exports = router;
