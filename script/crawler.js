var db = require("./index.json");
var fs = require("fs");
var cheerio = require("cheerio");
var request = require("request");
var async = require("async");

var config = {
  bookPagePrefix: 'http://it-ebooks.info/book/',
  imgSrcPrefix: 'http://it-ebooks.info',
  saveName: 'data.json'
};

db.sort(function (a, b) {
  if (a.index > b.index) {
    return 1;
  }
  if (a.index < b.index) {
    return -1;
  }
  return 0;
});

var result = [];


async.mapLimit(db, 5, function (item, cb) {
  getBookInfo(item, cb);
}, function () {
  result.sort(function (a, b) {
    if (a.bookName > b.bookName) {
      return 1;
    }
    if (a.bookName < b.bookName) {
      return -1;
    }
    return 0;
  });

  fs.writeFileSync(config.saveName, JSON.stringify(result, null, 2));
  console.log('Congratulation!!! data has been saved into data.json');
});

function getBookInfo(item, cb) {
  var url = config.bookPagePrefix + item.index;
      console.log('crawling:', url);
  request(url, function (err, res, body) {
    if (err) {console.error(err);process.exit(1);}
    var $ = cheerio.load(body);
    var obj = {
      bookName: $('[itemprop="name"]').text(),
      postSrc: config.imgSrcPrefix + $('.ebook_view img').attr('src'),
      datePublished :$('[itemprop="datePublished"]').text(),
      numberOfPages :$('[itemprop="numberOfPages"]').text(),
      originDlLink: $('[href^="http://filepi"]').attr('href'),
      description: $('[itemprop="description"]').text(),
      originPageLink: url,
      index: item.index,
      customBookName: item.bookName
    };
    console.log('info: [' + obj.bookName + '] is ok');
    result.push(obj);
    cb(null, obj);
  });
}