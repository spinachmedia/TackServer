
var facebook = require('facebook-node-sdk');

var fb = new facebook({
  appId: "918004661553443",
  secret: "6d5465913c20bee016aeaef656e1ff25"
});

var FacecookCheck = function(name) {

};
　
FacecookCheck.prototype.checkTokenForGet = function(req,res,callback){
  
  console.log(req.query);
    
  //Facebookのログインをしていない場合、弾く。
  var id = "/" + req.query.sns_id + "/feed";
  var parameters = {access_token: req.query.token};
  fb.api(id, parameters, function(err, data) {
    console.log(err);
    if(!err){
      //tokenが有効
      callback(req, res);
    }else{
      //tokenが無効
      res.send("token is 無効");
    }
  });
    
};

FacecookCheck.prototype.checkTokenForPost = function(req,res,callback){
  
  console.log(req.body);
    
  //Facebookのログインをしていない場合、弾く。
  var id = "/" + req.body.sns_id + "/feed";
  var parameters = {access_token: req.body.token};
  fb.api(id, parameters, function(err, data) {
    console.log(err);
    if(!err){
      //tokenが有効
      callback(req, res);
    }else{
      //tokenが無効
      res.send("token is 無効");
    }
  });
    
};
 
module.exports = FacecookCheck;