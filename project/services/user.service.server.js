var app = require("../../express");
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/project/uploads' });
var userModel=require("../model/user/user.model.server");
var bcrypt = require("bcrypt-nodejs");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

/*var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};*/


var facebookConfig = {
    clientID     : '923932384413434',
    clientSecret : '6c63834bf92129c34bce3cdfd498c2cf',
    callbackURL  : 'http://localhost:4000/auth/facebook/callback',
    profileFields: ['id', 'email', 'gender', 'displayName', 'name']
};

var FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/#!/',
        failureRedirect: '/project/#!/login'
    }));

function facebookStrategy(token, refreshToken, profile, done) {
    userModel.findUserByFacebookId(profile.id)
        .then(
            function(user) {
                console.log(profile._json);
                if(user) {
                    return done(null, user);
                } else {
                    console.log('fb');
                    console.log(profile._json);
                    //var email = profile.emails[0].value;
                    var email = profile._json.email;
                    //var emailParts = email.split("@");
                    var newFacebookUser = {
                        username:  email,
                        firstName: profile._json.first_name,
                        lastName:  profile._json.last_name,
                        email:     email,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}



/*var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "",
        imageUrl:"", watchedList:['1668'], wishList: ['1425','1424', '1423'], followers: [], following: ['234'], comments:[] },
    {_id: "234", username: "bob", password: "bob", firstName: "Bobli", lastName: "Marley", email: "",
        imageUrl:"", watchedList:['1668','1399','1400'], wishList: ["1425","1668","1668","1668"], followers: ['123','456','345'], following: ['456','345'], comments:["989","656"]},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "",
        imageUrl:"", watchedList:[], wishList: [], followers: ['234'], following: ['234'], comments:[]},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "",
        imageUrl:"", watchedList:[], wishList: [], followers: ['234'], following: ['234'], comments:[]}
];*/

app.get('/api/project/user', findUser );
app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.post('/api/project/user', createUser);
app.get('/api/project/user/:userId', findUserById );
app.put('/api/project/user/:userId', updateUser);
app.put('/api/project/user/:userId/wishlist/comment/:seriesId', addToWishList);
app.put('/api/project/user/:userId/watchedlist/comment/:seriesId', addToWatchedList);
app.get('/api/project/user/:userId/wishlist', getWishListByUserId );
app.get('/api/project/user/:userId/watchedlist', getWatchedListByUserId );
app.delete('/api/project/user/:userId/following/:fId', deleteFollowingById);
app.put('/api/project/user/:userId/following/:fId', addToFollowingById);
app.put('/api/project/user/:userId/comment/:commentId', addComment);
app.delete('/api/project/user/:userId/follower/:followerId', deleteFromFollower);
app.put('/api/project/user/:userId/follower/:followerId', addToFollower);
app.delete('/api/project/user/:userId/wishlist/:wishlistId', deleteWishlistById);
app.delete('/api/project/user/:userId/watchlist/:watchlistId', deleteWatchlistById);
app.get('/api/project/user/search/:searchText', findUsersByText);
app.get('/api/project/user/searchActor/:searchText', findActorsByText);
app.get('/api/project/users', findAllUsers);
app.delete('/api/project/user/:userId', deleteUser);

app.post('/api/login', passport.authenticate('local'),login);
app.get('/api/loggedIn', loggedIn);
app.post('/api/logout',logout);
app.post('/api/register',register);

function deleteUser(req, res) {
    var userId = req.params['userId'];
    userModel.deleteUser(userId)
        .then(function (st) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findAllUsers(req, res) {
    userModel.findAllUsers()
        .then(function (users) {
            res.json(users);
        }, function (err) {
            res.json([]);
        });
}

function updateUser(req, res) {
    var userId=req.params.userId;
    var user=req.body;
    userModel.updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function getWatchedListByUserId(req, res) {
    var userId=req.params.userId;
    userModel.getWatchedListByUserId(userId)
        .then(function (watchedList) {
            res.json(watchedList);
        }, function (err) {
            res.json(null);
        })
    /*for(var u in users)
    {
        if(users[u]._id===userId)
        {
            res.json(users[u].watchedList);
            return;
        }
    }
    res.json(null);*/
}

function getWishListByUserId(req, res) {
    var userId=req.params.userId;
    userModel.getWishListByUserId(userId)
        .then(function (wishList) {
            res.json(wishList);
        }, function (err) {
            res.json(null);
        });
    /*for(var u in users)
    {
        if(users[u]._id===userId)
        {
            res.json(users[u].wishList);
            return;
        }
    }
    res.json(null);*/
}

function addToWatchedList(req, res) {
    var userId=req.params.userId;
    var seriesId=req.params.seriesId;
    userModel.addToWatchedList(userId,seriesId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
    /*for(var u in users)
    {
        if(users[u]._id===userId)
        {
            users[u].watchedList.push(seriesId);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);*/
}

function addToWishList(req, res) {
    var userId=req.params.userId;
    var seriesId=req.params.seriesId;
    userModel.addToWishList(userId,seriesId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
    /*for(var u in users)
    {
        if(users[u]._id===userId)
        {
            users[u].wishList.push(seriesId);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);*/
}

function findUserById(req, res) {

    var userId = req.params['userId'];
    userModel.findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.json(null);
        });
    /*for (var u in users)
    {
        if(users[u]._id === userId)
        {
            res.json(users[u]);
            console.log(users[u]);
            return;
        }
    }
    res.json(null);
*/
}

function findUserByUsername(req, res) {

    var username = req.query.username;
    userModel.findUserByUsername(username)
        .then(function (user) {
            res.json(user);
        },function (err) {
            res.json(null);
        });
    /*for(var u in users)
    {
        if(users[u].username === username)
        {
            res.json(users[u]);
            return;
        }
    }
    res.json(null);*/
}

function findUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    userModel.findUserByCredentials(username,password)
        .then(function (user) {
            res.json(user);
        },function (err) {
            res.json(null);
        });
    /*for(u in users)
    {
        var found=null;
        if(users[u].username === username && users[u].password === password)
        {
            res.json(users[u]);
            return;
        }

    }
    res.json(null);*/

}

function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if (username && password){
        findUserByCredentials(req, res);
    }
    else if(username && typeof password === 'undefined') {
        findUserByUsername(req,res);
    }
}

function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
    
    /*user._id = (new Date().getTime())+"";
    users.push(user);
    res.json(user);*/
}

function deleteFollowingById(req, res) {

    var userId = req.params['userId'];
    var fId = req.params['fId'];
    userModel.deleteFollowingById(userId,fId)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
    /*for(var i =0; i<users.length;i++){
        if(users[i]._id === userId){
            var index = users[i].following.indexOf(fId);
            console.log(index);
            if(index > -1){
                users[i].following.splice(index,1);
                res.sendStatus(200);
                return
            }
        }
    }
    res.sendStatus(404);*/
}

function addToFollowingById(req, res) {
    var userId = req.params['userId'];
    var fId = req.params['fId'];
    userModel.addToFollowingById(userId,fId)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
    /*for(var i=0;i<users.length;i++){
        if(users[i]._id===userId){
            users[i].following.push(fId);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);*/
}

function addComment(req, res) {
    var commentId=req.params.commentId;
    var userId=req.params.userId;
    userModel.addComment(userId,commentId)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
    /*for(var u in users)
    {
        if(users[u]._id===userId)
        {
            users[u].comments.push(commentId);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);*/
}

function deleteFromFollower(req, res) {
    var userId=req.params.userId;
    var followerId=req.params.followerId;
    userModel.deleteFromFollower(userId,followerId)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
    /*for(var u in users)
    {
        if(users[u]._id===userId)
        {
            var index = users[u].followers.indexOf(followerId);
            console.log(index);
            if(index > -1){
                users[u].followers.splice(index,1);
                res.sendStatus(200);
                return;
            }
        }
    }
    res.sendStatus(404);*/
}

function addToFollower(req, res) {
    var userId=req.params.userId;
    var followerId=req.params.followerId;
    userModel.addToFollower(userId, followerId)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
    /*for(var u in users)
    {
        if(users[u]._id===userId)
        {
            users[u].followers.push(followerId);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);*/
}

function deleteWishlistById(req, res) {
    var userId=req.params.userId;
    var wishListId=req.params.wishlistId;
    userModel.deleteWishlistById(userId,wishListId)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
    /*for(var u in users){
        if(users[u]._id===userId)
        {
            var index = users[u].wishList.indexOf(wishListId);
            if(index > -1){
                users[u].wishList.splice(index,1);
                res.sendStatus(200);
                return;
        }
    }
}
    res.sendStatus(404);*/
}

function deleteWatchlistById(req, res) {
    var userId=req.params.userId;
    var watchListId=req.params.watchlistId;
    userModel.deleteWatchlistById(userId,watchListId)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
    /*for(var u in users){
        if(users[u]._id===userId)
        {
            var index = users[u].watchedList.indexOf(watchListId);
            if(index > -1){
                users[u].watchedList.splice(index,1);
                res.sendStatus(200);
                return;
            }
        }
    }
    res.sendStatus(404);*/
}

function findUsersByText(req, res) {
    var searchText = req.params['searchText'].toLowerCase();
    userModel.findUsersByText(searchText)
        .then(function (users) {
            res.json(users);
        }, function (err) {
            res.json([]);
        });
}
    /*var usersArr =[];
    for(var u in users){
        if(users[u].firstName.toLowerCase().indexOf(searchText) !== -1 || users[u].lastName.toLowerCase().indexOf(searchText) !== -1 || users[u].username.toLowerCase().indexOf(searchText) !== -1){
            usersArr.push(users[u]);
        }
    }
    res.json(usersArr);*/
    function findActorsByText(req, res) {
        var searchText = req.params['searchText'].toLowerCase();
        userModel.findActorsByText(searchText)
            .then(function (users) {
                res.json(users);
            },function (err) {
                res.json([]);
            });

}
function localStrategy(username, password, done) {
    userModel.findUserByUsername(username)
        .then(function (user) {
            if(user && bcrypt.compareSync(password, user.password)){
                done(null, user);
            }
            else{
                done(null,false);
            }
        },function (error) {
            done(null,false);
        })
}

function login(req, res) {
    res.json(req.user);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function loggedIn(req, res) {
    if(req.isAuthenticated()){
        res.json(req.user);
    }
    else{
        res.send('0');
    }
}

function logout(req,res) {
    req.logout();
    res.sendStatus(200);
}

function register(req, res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userModel.createUser(userObj)
        .then(function (user) {
            req.login(user, function (status) {
                res.send(status)
            });
        })
}

function uploadImage(req, res) {

    var myFile        = req.file;

    var userId = req.body.userId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var user = null;
    /*for(var w in widgets) {
     if (widgets[w]._id === widgetId) {
     widget = widgets[w];
     break;
     }
     }*/
    user=userModel.findUserById(userId);

    //widget.url = '/assignment/uploads/'+filename;

    var u={
        _id:userId,
        imageUrl:'/project/uploads/'+filename
    };

    userModel.updateUser(userId,u)
        .then(function(){
            var callbackUrl   = "/project/#!/profileEdit";
            res.redirect(callbackUrl);
        });
}
