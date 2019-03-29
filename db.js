var fs = require('fs');
module.exports.get = function (file) {
  return JSON.parse(fs.readFileSync(__dirname + '/data/'+file+'.json'));
}
module.exports.set = function (file,value) {
  fs.writeFileSync(__dirname + '/data/'+file+'.json', JSON.stringify(value));
}
