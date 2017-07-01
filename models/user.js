var mongoose = require('mongoose');
var dbcf = require('./dbcf');

var db = mongoose.createConnection(dbcf.host, dbcf.db);

db.on('error', console.error.bind(console, '连接错误:'));

function User(user) {
    this.name = user.name;
    this.nickname = user.nickname;
    this.password = user.password;
    this.email = user.email;
}

User.prototype.get = function(name, callback) {

}

module.exports = User;
