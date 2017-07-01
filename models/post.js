var mongoose = require('mongoose');
var dbcf = require('./dbcf');

var db = mongoose.createConnection(dbcf.host, dbcf.db);

db.on('error', console.error.bind(console, '连接错误:'));

/**
 * 定义查询对象模型
 */
var articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    create_time: Date
});

queryArticleSchema.methods.findArticleByPage = function(page, callback) {
    return this.model('queryArticle').find({page: page}, callback);
}


/**
 * 访问查询对象模型
 */
var articleModel = mongoose.model('article', articleSchema);

module.exports.add = function(title, content, author, callback) {
    var newPost = new articleModel();

    newPost.title = title;
    newPost.content = content;
    newPost.author = author;

    newPost.save(function(err) {
        if (err) {
            console.log('save error:' + err);
            callback(err);
        } else {
            callback(null);
        }
        // 关闭数据库连接
        db.close();
    })
}

module.exports.query = function() {

}