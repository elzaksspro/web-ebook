var db = require("../db");
var data = require("./data");
var fs = require("fs");
var toUpateData = [];

console.log('\nstart sync book to db.json');


for (var i = 0; i < data.length; i++) {
  var curData = data[i];
  var flag = false;
  for (var j = 0; j < db.length; j++) {
    var curDb = db[j];
    if (curData.bookName === curDb.bookName) {
      flag = true;
    }
  }
  if (!flag) {
    toUpateData.push(curData);
  }
}
console.log("updated book count:", toUpateData.length);
for (var i = 0; i < toUpateData.length; i++) {
  var cur = toUpateData[i];
  db.push(cur);
}
fs.writeFileSync('../db.json', JSON.stringify(db, null, 2));

console.log('end sync book!');
