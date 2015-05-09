{"filter":false,"title":"postReply.js","tooltip":"/routes/postReply.js","undoManager":{"mark":33,"position":33,"stack":[[{"group":"doc","deltas":[{"start":{"row":28,"column":2},"end":{"row":62,"column":11},"action":"remove","lines":["//Facebookのログインをしていない場合、弾く。","  ","","  //ユーザの座標を取得","  var lat = req.query.lat;","  var lng = req.query.lng;","  var count = req.query.count;","  ","  //空っぽの場合は東京駅の座標","  if(lat == null){","    lat = 35.681382;","  }","  if(lng == null){","    lng = 139.766084;","  }","  if(count == null){","    count = 50;","  }","  ","  var searchObject = { ","    \"loc\" : { ","        $nearSphere : [parseFloat(lng) ,parseFloat(lat)]","    }","  };","  ","  // 座標から近い順に50件を取得","  // 非同期コールバック処理なので注意。","  // コレクションから値を取得する。","  TACK_INFO.find(searchObject).limit(count).toArray(function(err, items) {","    if(err){console.log(err)}","    //レスポンスのテンプレートを指定し、パラメータを第二引数で渡す","    //RESTAPIなのでテンプレートは利用しない","    res.send({\"items\":items});","    ","  });//find"]},{"start":{"row":28,"column":2},"end":{"row":117,"column":11},"action":"insert","lines":[" //Facebookのログインをしていない場合、弾く。","  var tack_id = uuid.v4();","  var sns_id = req.body.sns_id;","  var category = req.body.category;","  var place_name = req.body.place_name;","  var comment = req.body.comment;","  var lat = req.body.lat;","  var lng = req.body.lng;","  var has_file_flg = req.body.has_file_flg;","  var files = req.files","  ","  var file_path;","  ","  if(sns_id == null){","    sns_id = null;","    //エラーを返さないとね","    //res.send({\"error\":\"sns_id is not found.\"});","  }","  ","  if(category == null){","    category = \"FOOD\";","  }","  ","  if(place_name == null){","    place_name = \"場所情報なし\";","  }","  ","  //空っぽの場合は東京駅の座標","  if(lat == null){","    lat = 35.681382;","  }else{","    lat = parseFloat(lat)","  }","  ","  if(lng == null){","    lng = 139.766084;","  }else{","    lng = parseFloat(lng)","  }","  ","  ","  if(has_file_flg == null){","    has_file_flg = false;","  }","  ","  if(files == null){","    has_file_flg = false;","  }else{","    ","    has_file_flg = true","    ","    //ファイルを保存する","    var tmp_path = files.file_data.path; ","    var target_path = './public/images/' + files.file_data.name;","    var fs = require('fs');","    file_path = target_path;","    fs.rename(tmp_path, target_path, function(err) {","        if (err) throw err;","        fs.unlink(tmp_path, function() {","        });","    });","    ","  }","  ","  ","  var insertObject = {","    tack_id: tack_id,","    sns_id: sns_id,","    category: category,","    place_name: place_name,","    lat: lat,","    lng: lng,","    has_file_flg: has_file_flg,","    file_path: file_path,","    date: new Date().toISOString(),//2014-03-07T10:00:00","  };","  ","  ","  // 座標から近い順に50件を取得","  // 非同期コールバック処理なので注意。","  // コレクションから値を取得する。","  TACK_INFO.insert(insertObject,function(err, records) {","    ","    if(err){console.log(err)}","    ","    //レスポンスのテンプレートを指定し、パラメータを第二引数で渡す","    //RESTAPIなのでテンプレートは利用しない","    res.send({\"items\":records});","    ","  });//find"]}]}],[{"group":"doc","deltas":[{"start":{"row":29,"column":16},"end":{"row":29,"column":26},"action":"remove","lines":["uuid.v4();"]},{"start":{"row":29,"column":16},"end":{"row":29,"column":32},"action":"insert","lines":["req.body.sns_id;"]}]}],[{"group":"doc","deltas":[{"start":{"row":29,"column":25},"end":{"row":29,"column":31},"action":"remove","lines":["sns_id"]},{"start":{"row":29,"column":25},"end":{"row":29,"column":32},"action":"insert","lines":["tack_id"]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":0},"end":{"row":32,"column":39},"action":"remove","lines":["  var category = req.body.category;","  var place_name = req.body.place_name;"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":31},"end":{"row":31,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":0},"end":{"row":36,"column":2},"action":"remove","lines":["  var lat = req.body.lat;","  var lng = req.body.lng;","  var has_file_flg = req.body.has_file_flg;","  var files = req.files","  "]}]}],[{"group":"doc","deltas":[{"start":{"row":33,"column":0},"end":{"row":33,"column":16},"action":"remove","lines":["  var file_path;"]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":0},"end":{"row":33,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":39,"column":2},"end":{"row":83,"column":3},"action":"remove","lines":["","  if(category == null){","    category = \"FOOD\";","  }","  ","  if(place_name == null){","    place_name = \"場所情報なし\";","  }","  ","  //空っぽの場合は東京駅の座標","  if(lat == null){","    lat = 35.681382;","  }else{","    lat = parseFloat(lat)","  }","  ","  if(lng == null){","    lng = 139.766084;","  }else{","    lng = parseFloat(lng)","  }","  ","  ","  if(has_file_flg == null){","    has_file_flg = false;","  }","  ","  if(files == null){","    has_file_flg = false;","  }else{","    ","    has_file_flg = true","    ","    //ファイルを保存する","    var tmp_path = files.file_data.path; ","    var target_path = './public/images/' + files.file_data.name;","    var fs = require('fs');","    file_path = target_path;","    fs.rename(tmp_path, target_path, function(err) {","        if (err) throw err;","        fs.unlink(tmp_path, function() {","        });","    });","    ","  }"]}]}],[{"group":"doc","deltas":[{"start":{"row":39,"column":0},"end":{"row":39,"column":2},"action":"remove","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":38,"column":3},"end":{"row":39,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":39,"column":0},"end":{"row":39,"column":2},"action":"remove","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":38,"column":3},"end":{"row":39,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":45,"column":0},"end":{"row":48,"column":25},"action":"remove","lines":["    lat: lat,","    lng: lng,","    has_file_flg: has_file_flg,","    file_path: file_path,"]}]}],[{"group":"doc","deltas":[{"start":{"row":44,"column":27},"end":{"row":45,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":4},"end":{"row":43,"column":12},"action":"remove","lines":["category"]},{"start":{"row":43,"column":4},"end":{"row":43,"column":5},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":5},"end":{"row":43,"column":6},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":6},"end":{"row":43,"column":7},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":7},"end":{"row":43,"column":8},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":8},"end":{"row":43,"column":9},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":9},"end":{"row":43,"column":10},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":10},"end":{"row":43,"column":11},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":13},"end":{"row":43,"column":21},"action":"remove","lines":["category"]},{"start":{"row":43,"column":13},"end":{"row":43,"column":20},"action":"insert","lines":["comment"]}]}],[{"group":"doc","deltas":[{"start":{"row":44,"column":0},"end":{"row":44,"column":27},"action":"remove","lines":["    place_name: place_name,"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":21},"end":{"row":44,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":16,"column":4},"end":{"row":16,"column":13},"action":"remove","lines":["TACK_INFO"]},{"start":{"row":16,"column":4},"end":{"row":16,"column":19},"action":"insert","lines":["TACK_REPLY_INFO"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":2},"end":{"row":21,"column":11},"action":"remove","lines":["TACK_INFO"]},{"start":{"row":21,"column":2},"end":{"row":21,"column":17},"action":"insert","lines":["TACK_REPLY_INFO"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":2},"end":{"row":22,"column":11},"action":"remove","lines":["TACK_INFO"]},{"start":{"row":22,"column":2},"end":{"row":22,"column":17},"action":"insert","lines":["TACK_REPLY_INFO"]}]}],[{"group":"doc","deltas":[{"start":{"row":21,"column":41},"end":{"row":21,"column":50},"action":"remove","lines":["TACK_INFO"]},{"start":{"row":21,"column":41},"end":{"row":21,"column":56},"action":"insert","lines":["TACK_REPLY_INFO"]}]}],[{"group":"doc","deltas":[{"start":{"row":51,"column":2},"end":{"row":51,"column":11},"action":"remove","lines":["TACK_INFO"]},{"start":{"row":51,"column":2},"end":{"row":51,"column":17},"action":"insert","lines":["TACK_REPLY_INFO"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":7},"end":{"row":26,"column":10},"action":"remove","lines":["get"]},{"start":{"row":26,"column":7},"end":{"row":26,"column":8},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":8},"end":{"row":26,"column":9},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":9},"end":{"row":26,"column":10},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":10},"end":{"row":26,"column":11},"action":"insert","lines":["t"]}]}]]},"ace":{"folds":[],"scrolltop":240,"scrollleft":0,"selection":{"start":{"row":26,"column":7},"end":{"row":26,"column":11},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1431194383916,"hash":"de6c791b6fdab6e7fe11c3f40ec7696944347e52"}