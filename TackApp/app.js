'use strict';

//色々読み込んでいます。
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');


//認証系？
var session = require('express-session')

//expressjsのフレームワークインスタンスを生成
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set("views",__dirname + '/views');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//ファイルのアップロードに対応
app.use(multer({ dest: './uploads/'}))

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport-twitter用
app.use(session({secret: 'spinachmedia'}));


//利用するコントローラを読み込みます
//---------------------------

var getTack = require('./routes/getTack');
app.use('/api/getTack', getTack);

var getMyTack = require('./routes/getMyTack');
app.use('/api/getMyTack', getMyTack);

var getReply = require('./routes/getReply');
app.use('/api/getReply', getReply);

var getLastImage = require('./routes/getLastImage');
app.use('/api/getLastImage', getLastImage);



var postTack = require('./routes/postTack');
app.use('/api/postTack', postTack);

var postReply = require('./routes/postReply');
app.use('/api/postReply', postReply);

var postGood = require('./routes/postGood');
app.use('/api/postGood', postGood);


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;
