var express = require('express');
var router = express.Router();

function User(user) {
  this.name = user.name;
  this.nickname = user.nickname;
  this.password = user.password;
  this.email = user.email;
}

User.prototype.get = function(name, callback) {

}

module.exports = User;
