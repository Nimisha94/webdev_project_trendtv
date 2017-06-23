var mongoose = require('mongoose');

var userSchema = mongoose.Schema(
    {
        username : {type : String, unique : true},
        password : String,
        firstName : String,
        lastName : String,
        email : String,
        imageUrl: {type: String, default : ""},
        watchedList: [{type : String}],
        wishList : [{type : String}],
        followers : [{type : mongoose.Schema.Types.ObjectId, ref : "UserModel"}],
        following : [{type : mongoose.Schema.Types.ObjectId, ref : "UserModel"}],
        role: {type:String, default:'user', enum: ["user", "admin", "actor"]},
        comments :[{type: mongoose.Schema.Types.ObjectId, ref: "CommentModel"}],
        facebook: {
            id:    String,
            token: String
            }
        }, {collection : 'user'}

);

module.exports = userSchema;
