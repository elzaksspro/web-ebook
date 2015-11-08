var request = require("request");
var fs = require("fs");

var url = 'http://it-ebooks.info/book/5468/';

request(url).pipe(fs.createWriteStream('./test.html'));