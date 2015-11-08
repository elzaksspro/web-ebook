var request = require("request");
var fs = require("fs");
var db = require("../db");
var async = require("async");


async.mapSeries(db, function (item, cb) {
  var postSrc = item.postSrc;
  if (item.localPost) {
    cb(null);
  } else {
    var savePath = './post/' + item.index + '.jpg';
    var writable = fs.createWriteStream(savePath);
    var readable = request(postSrc);
    readable.pipe(writable);
    writable.on('finish', function () {
      console.log('[' + item.bookName + '] is ok');
      item.localPost = true;
      cb(null);
    });
  }
}, function (err) {
  if (!err) {
    fs.writeFileSync('../db.json', JSON.stringify(db, null, 2));
    console.log('finished!');
  }
});


