var mongoose = require('mongoose');
var dbcf = require('./dbcf');
var db;


var DBInstance = function() {
    db = mongoose.createConnection(dbcf.host, dbcf.db);

    db.on('error', console.error.bind(console, '连接错误:'));
    db.once('open', function() {
        createSchema();
    })
}

function createSchema() {
    this.postSchema = new mongoose.Schema({
        title: String,
        content: String,
        author: String,
        create_time: Date
    });

    this.postModel = db.model('Post', postSchema);
}

createSchema.prototype = {
    constructor: createSchema,

    findByPage: function(currenPage) {
        this.postModel.find({})
    }
};

module.exports = DBInstance;