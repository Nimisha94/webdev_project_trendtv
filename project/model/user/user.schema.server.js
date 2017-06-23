var mongoose = require('mongoose');

var userSchema = mongoose.Schema(
    {
        username : {type : String, unique : true},
        password : String,
        firstName : String,
        lastName : String,
        email : String,
        imageUrl: {type: String, default : "https://kurs.com.ua/uploads/set_resources_2/84c1e40ea0e759e3f1505eb1788ddf3c_default_photo.png"},
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
