var app = require("express")();
var compression = require('compression');
app.use(compression());

var data = require("./db");
var port = process.env.NODE_PORT || 4000

app.set('views', './');
app.set('view engine', 'ejs');
app.all('*', function (req, res) {
  return res.render('index', {data: data, map: JSON.stringify(getMap(data))});
});
app.listen(port, function () {
  console.log('app listening on ' + port);
});

function getMap(data) {
  var map = {};
  data.forEach(function (item) {
    map[item.index] = {
      bookName: item.bookName,
      datePublished: item.datePublished,
      numberOfPages: item.numberOfPages,
      description: item.description.substr(0, 500) + '...'
    };
  });
  return map;
}