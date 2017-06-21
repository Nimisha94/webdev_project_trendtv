var mongoose = require('mongoose');

var commentSchema = mongoose.Schema(
    {
        userId : {type : mongoose.Schema.Types.ObjectId , ref: "UserModel"},
        seriesId :  String,
        comment : String
    }, {collection : 'comment'}

);

module.exports = commentSchema;
