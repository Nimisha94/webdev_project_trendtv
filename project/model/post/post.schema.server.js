var mongoose = require('mongoose');

var postSchema = mongoose.Schema(
    {
        actorId : {type : mongoose.Schema.Types.ObjectId, ref : "UserModel"},
        actorName : String,
        title : String,
        body : String,
        likes : [{type : mongoose.Schema.Types.ObjectId, ref : "UserModel"}],
        dislikes : [{type : mongoose.Schema.Types.ObjectId, ref : "UserModel"}]
    }, {collection : 'post'}

);

module.exports = postSchema;
