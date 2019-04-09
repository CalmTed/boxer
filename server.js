//---TABLE-OF-CONTENTS
//main vars: express, fs,bcrypt,cookie
//static files
//visual engine
//post form procesing vars
//start server
//---ADMIN
//db vars
//admin page
//login get
//login post
//logout get
//change_password get
//change_password post
//---ERRORS

var express = require('express');
var fs = require('fs');
var app = express();
var bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
//static files
app.use(express.static('public'));
//for page layout
var handlebars = require('express-handlebars').create({
  defaultLayout: 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
//getting info back
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
//starting server
var server = app.listen(2441, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("%s:%s", host, port);
});
// ----------- ADMIN STAFF
var db = require('./db');
//db.set('main-settings',{1:2});
app.get('/admin', function(req, res) {
  //you need at least some hash to check, undefined does not work
  if(typeof req.cookies.login == 'undefined'){req.cookies.login =  bcrypt.hashSync('', 10)}
  var auth_data = JSON.parse(fs.readFileSync(__dirname + '/data/auth.json'));
  if (bcrypt.compareSync(auth_data.password, req.cookies.login)) {
    data = db.get('main-settings');
    res.render('admin', data);
  } else {
    res.redirect('login');
  }
});
app.get('/admin/login', function(req, res) {
  if(typeof req.cookies.login == 'undefined'){req.cookies.login =  bcrypt.hashSync('', 10)}
  var auth_data = JSON.parse(fs.readFileSync(__dirname + '/data/auth.json'));
  if (bcrypt.compareSync(auth_data.password, req.cookies.login)) {
    res.redirect('./');
  } else {
    res.render('login', {
      title: 'Войти'
    });
  }
});
app.post('/admin/login', urlencodedParser, function(req, res) {
  var auth_data = JSON.parse(fs.readFileSync(__dirname + '/data/auth.json'));
  if (bcrypt.compareSync(req.body.password, auth_data.password)) {
    //session.startSession(req, res,()=>{});
    //req.session.push('login', 'true');
    res.cookie('login', bcrypt.hashSync(auth_data.password, 10));
    res.redirect('./');
  } else {
    res.m = 'nope';
  }
  // var hash = bcrypt.hashSync('321', 10);
  //fs.writeFileSync(__dirname + '/data/auth.json', JSON.stringify({'email':'123@123.123','pawword':hash}));
  // response = {
  //    first_name:req.body.email,
  //    last_name:req.body.password
  // };
  //console.log(req.query.fname);
  //res.end(JSON.stringify(response));
});
app.get('/admin/logout', function(req, res) {
  res.clearCookie('login');
  res.redirect('./login');
});
app.get('/admin/change_password', function(req, res) {
  if(typeof req.cookies.login == 'undefined'){req.cookies.login =  bcrypt.hashSync('', 10)}
  var auth_data = JSON.parse(fs.readFileSync(__dirname + '/data/auth.json'));
  if (bcrypt.compareSync(auth_data.password, req.cookies.login)) {
    res.render('change_password');
  } else {
    res.redirect('login');
  }
});
app.post('/admin/change_password', urlencodedParser, function(req, res) {
  if(typeof req.cookies.login == 'undefined'){req.cookies.login =  bcrypt.hashSync('', 10)}
  var auth_data = JSON.parse(fs.readFileSync(__dirname + '/data/auth.json'));
  if (bcrypt.compareSync(auth_data.password, req.cookies.login)) {
    if (bcrypt.compareSync(req.body.password, auth_data.password)) {
      console.log('password is right');
      //changing password
    } else {
      console.log('password is wrong');
    }
  } else {
    res.redirect('login');
  }
});
// ---------- MAIN PAGE
app.get('/', function(req, res) {
  res.render('home', {
    title: 'База боксер',
    head:'<link rel="stylesheet" href="css/home.css">'
  });
});
// ----------- ERRORS AND SYSTEM LINKS
app.use(function(req, res, next) {
  res.status(404);
  res.render('404');
});
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});
// app.get('/*',function (req,res) {
//   res.sendFile( __dirname + "/" +"404.html");
// });
