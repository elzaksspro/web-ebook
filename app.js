var app = require("express")();
var data = require("./db");
var config = {
  port: process.env.NODE_PORT || 3000
};


app.set('views', './');
app.set('view engine', 'ejs');
app.all('*', function (req, res) {
  return res.render('index', {data: data});
});
app.listen(config.port, function () {
  console.log('app listening on ' + config.port);
});