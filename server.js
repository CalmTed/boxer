var express = require('express');
var cookieParser = require('cookie-parser')
var app = express();
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
// ----------- ERRORS AND SYSTEM LINKS
app.get('/', function (req, res) {
   res.render('home',{title:'hello there'});
   //res.sendFile( __dirname + "/" + "index.html" );
});
app.get('/admin',function (req,res) {
  if(req.cookies.login === 'false'){
    res.redirect('login');
  }else{
    res.render('home');
  }
});
app.get('/admin/login',function (req,res) {
  console.log(req.cookies.login);
  if(typeof req.cookies.login === 'undefined'){
    res.render('login',{title:'Войти'});
  }else{
    res.redirect('./');
  }
});
app.post('/admin/login', urlencodedParser, function (req, res) {
   response = {
      first_name:req.body.fname,
      last_name:req.body.lname
   };
   console.log(req.query.fname);
   res.end(JSON.stringify(response));
})

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
