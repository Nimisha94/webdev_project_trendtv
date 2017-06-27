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

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'email', 'gender', 'displayName', 'name']
 };

/*var facebookConfig = {
    clientID     : '923932384413434',
    clientSecret : '6c63834bf92129c34bce3cdfd498c2cf',
    callbackURL  : 'http://localhost:4000/auth/facebook/callback',
    profileFields: ['id', 'email', 'gender', 'displayName', 'name']
};*/

var FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

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
app.put('/api/project/storePage', storeUrl);

app.post('/api/login', passport.authenticate('local'),login);
app.get('/api/loggedIn', loggedIn);
app.post('/api/logout',logout);
app.post('/api/register',register);
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
                    var email = profile._json.email;
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


function storeUrl(req, res) {
    var pageUrl = req.query['url'];
    req.session.passport.user.pageUrl=pageUrl;
    res.json(req.session.passport.user);
}

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
    user.password = bcrypt.hashSync(user.password);
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
        });
}

function getWishListByUserId(req, res) {
    var userId=req.params.userId;
    userModel.getWishListByUserId(userId)
        .then(function (wishList) {
            res.json(wishList);
        }, function (err) {
            res.json(null);
        });
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
}

function findUserById(req, res) {
    //console.log(req.session);
    var userId = req.params['userId'];
    userModel.findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.json(null);
        });
}

function findUserByUsername(req, res) {

    var username = req.query.username;
    userModel.findUserByUsername(username)
        .then(function (user) {
            res.json(user);
        },function (err) {
            res.json(null);
        });
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
    user.password = bcrypt.hashSync(user.password);
    userModel.createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
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

    user=userModel.findUserById(userId);

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
