var app = require('app');
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
module.exports = admin;
