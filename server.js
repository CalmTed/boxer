var express = require('express');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var app = express();
var bcrypt = require('bcrypt');
var NodeSession = require('node-session');
session = new NodeSession({secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'});
//cookies
app.use(cookieParser())
//static files
app.use(express.static('public'));
//for page layout
 var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
 app.engine('handlebars', handlebars.engine);
 app.set('view engine', 'handlebars');
//getting info back
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var server = app.listen(2441, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("%s:%s", host, port);
});
// ----------- ADMIN STAFF
app.get('/admin',function (req,res) {
  if(req.cookies.login === 'false'){
    res.redirect('login');
  }else{
    res.render('admin');
  }
});
app.get('/admin/login',function (req,res) {
  session.startSession(req, res, callback);

  if(req.session.get('key') === 'true'){
    res.render('login',{title:'Войти'});
  }else{
    res.redirect('./');
  }
});
app.post('/admin/login', urlencodedParser, function (req, res) {
    session.startSession(req, res, callback);
    var auth_data = JSON.parse(fs.readFileSync(__dirname + '/data/auth.json'));
    if (bcrypt.compareSync(req.body.password, auth_data.password)) {
      req.session.put('login', 'true');
      console.log('password is right, cookie is: '+res.cookies.login);
    }else{
      console.log('password is wrong');
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
app.get('/admin/logout',function (req, res) {
  req.session.forget('key');
});
app.get('/admin/change_password',function (req, res) {
  if(req.session.get('key') === 'true'){
    res.render('change_password');
  }else{
    res.redirect('login');
  }
});
app.post('/admin/change_password',urlencodedParser,function (req, res) {
  if(req.session.get('key') === 'true'){
    session.startSession(req, res, callback);
    var auth_data = JSON.parse(fs.readFileSync(__dirname + '/data/auth.json'));
    if (bcrypt.compareSync(req.body.password, auth_data.password)) {
      req.session.put('login', 'true');
      console.log('password is right, cookie is: '+res.cookies.login);
      //changing password
    }else{
      console.log('password is wrong');
    }
  }else{
    res.redirect('login');
  }
});
// ----------- ERRORS AND SYSTEM LINKS
app.get('/', function (req, res) {
   res.render('home',{title:'База боксер'});
   //res.sendFile( __dirname + "/" + "index.html" );
});
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});
app.use(function(err, req, res, next){
 console.error(err.stack);
 res.status(500);
 res.render('500');
});
// app.get('/*',function (req,res) {
//   res.sendFile( __dirname + "/" +"404.html");
// });
