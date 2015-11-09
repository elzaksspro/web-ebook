var app = require("express")();
var compression = require('compression');
app.use(compression());

var data = require("./db");
var port = process.env.NODE_PORT || 3000

app.set('views', './');
app.set('view engine', 'ejs');
app.all('*', function (req, res) {
  return res.render('index', {data: data});
});
app.listen(port, function () {
  console.log('app listening on ' + port);
});