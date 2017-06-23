var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");

var userModel = mongoose.model("UserModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.addToWishList = addToWishList;
userModel.addToWatchedList = addToWatchedList;
userModel.getWishListByUserId = getWishListByUserId;
userModel.getWatchedListByUserId = getWatchedListByUserId;
userModel.deleteFollowingById = deleteFollowingById;
userModel.addToFollowingById = addToFollowingById;
userModel.addComment = addComment;
userModel.deleteFromFollower = deleteFromFollower;
userModel.addToFollower = addToFollower;
userModel.deleteWishlistById = deleteWishlistById;
userModel.deleteWatchlistById = deleteWatchlistById;
userModel.findUsersByText = findUsersByText;
userModel.findActorsByText = findActorsByText;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.findAllUsers = findAllUsers;
userModel.deleteUser=deleteUser;
userModel.findUserByFacebookId= findUserByFacebookId;

module.exports = userModel;



function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function addToWishList(userId, seriesId) {
    return userModel.findById(userId)
        .then(function (user) {
            user.wishList.push(seriesId);
            return user.save();
        });
}

function addToWatchedList(userId, seriesId) {
    return userModel.findById(userId)
        .then(function (user) {
            user.watchedList.push(seriesId);
            return user.save();
        });
}

function getWishListByUserId(userId) {
    return userModel.findById(userId)
        .then(function (user) {
            return user.wishList;
        });
}

function getWatchedListByUserId(userId) {
    return userModel.findById(userId)
        .then(function (user) {
            return user.watchedList;
        });
}

function deleteFollowingById(userId, fId) {
    return userModel.findById(userId)
        .then(function (user) {
            var index = user.following.indexOf(fId);
            user.following.splice(index,1);
            return user.save();
        });
}

function addToFollowingById(userId, fId) {
    return userModel.findById(userId)
        .then(function (user) {
            user.following.push(fId);
            return user.save();
        });
}

function addComment(userId, commentId) {
    return userModel.findById(userId)
        .then(function (user) {
            user.comments.push(commentId);
            return user.save();
        }, function (err) {
            console.log(err);
        });
}

function deleteFromFollower(userId, fId) {
    return userModel.findById(userId)
        .then(function (user) {
            var index = user.followers.indexOf(fId);
            user.followers.splice(index,1);
            return user.save();
        });
}

function addToFollower(userId, fId) {
    return userModel.findById(userId)
        .then(function (user) {
            user.followers.push(fId);
            return user.save();
        });
}

function deleteWishlistById(userId, wishListId) {
    return userModel.findById(userId)
        .then(function (user) {
            var index = user.wishList.indexOf(wishListId);
            user.wishList.splice(index,1);
            return user.save();
        });
}

function deleteWatchlistById(userId, watchedListId) {
    return userModel.findById(userId)
        .then(function (user) {
            var index = user.watchedList.indexOf(watchedListId);
            user.watchedList.splice(index,1);
            return user.save();
        });
}

function findUsersByText(searchText) {
    var usersArr =[];
    return userModel.find()
        .then(function (users) {
            console.log(users);
            for(var u in users) {
                if (users[u].role === 'user') {
                    if (users[u].firstName.toLowerCase().indexOf(searchText) !== -1 || users[u].lastName.toLowerCase().indexOf(searchText) !== -1 || users[u].username.toLowerCase().indexOf(searchText) !== -1) {
                        usersArr.push(users[u]);
                    }
                }
            }
            console.log(usersArr);
           return usersArr;
        });
}

function findActorsByText(searchText) {
    var usersArr =[];
    return userModel.find()
        .then(function (users) {
            console.log(users);
            for(var u in users) {
                if (users[u].role === 'actor') {
                    if (users[u].firstName.toLowerCase().indexOf(searchText) !== -1 || users[u].lastName.toLowerCase().indexOf(searchText) !== -1 || users[u].username.toLowerCase().indexOf(searchText) !== -1) {
                        usersArr.push(users[u]);
                    }
                }
            }
            console.log(usersArr);
            return usersArr;
        });
}

function findUserByUsername(username) {
    return userModel.findOne({username:username});
}

function findUserByCredentials(username,password) {
    return userModel.findOne({username:username,password:password});
}

function updateUser(userId, user) {
    return userModel.update({_id:user._id}, {$set: user});
}

function findAllUsers() {
    return userModel.find();
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}
