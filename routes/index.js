var express = require('express');
var router = express.Router();

module.exports = function(app) {
  /* GET home page. */
  app.get('/', function(req, res) {
    res.render('home', { currentPage: 'home' });
  });

  // 关于页面
  app.get('/about', function(req, res) {
    res.render('about', { currentPage: 'about'});
  });

  app.post('/postArticle', function(req, res) {
    console.log(req.body);
  })
};
