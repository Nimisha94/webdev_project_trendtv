var app = require("../../express");

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "",
        imageUrl:"", watchedList:['1668'], wishList: ['1425','1424', '1423'], followers: [], following: ['234'], comments:[] },
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "",
        imageUrl:"", watchedList:['1668','1399','1400'], wishList: [], followers: ['123','456','345'], following: ['456','345'], comments:["989","656"]},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "",
        imageUrl:"", watchedList:[], wishList: [], followers: ['234'], following: ['234'], comments:[]},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "",
        imageUrl:"", watchedList:[], wishList: [], followers: ['234'], following: ['234'], comments:[]}
];

app.get('/api/project/user', findUser );
app.post('/api/project/user', createUser);
app.get('/api/project/user/:userId', findUserById );
app.put('/api/project/user/:userId/wishlist/series/:seriesId', addToWishList);
app.put('/api/project/user/:userId/watchedlist/series/:seriesId', addToWatchedList);
app.get('/api/project/user/:userId/wishlist', getWishListByUserId );
app.get('/api/project/user/:userId/watchedlist', getWatchedListByUserId );
app.delete('/api/project/user/:userId/following/:fId', deleteFollowingById);
app.put('/api/project/user/:userId/following/:fId', addToFollowingById);
app.put('/api/project/user/:userId/comment/:commentId', addComment);
app.delete('/api/project/user/:userId/follower/:followerId', deleteFromFollower);
app.put('/api/project/user/:userId/follower/:followerId', addToFollower);

function getWatchedListByUserId(req, res) {
    var userId=req.params.userId;
    for(var u in users)
    {
        if(users[u]._id===userId)
        {
            res.json(users[u].watchedList);
            return;
        }
    }
    res.json(null);
}

function getWishListByUserId(req, res) {
    var userId=req.params.userId;
    for(var u in users)
    {
        if(users[u]._id===userId)
        {
            res.json(users[u].wishList);
            return;
        }
    }
    res.json(null);
}

function addToWatchedList(req, res) {
    var userId=req.params.userId;
    var seriesId=req.params.seriesId;
    for(var u in users)
    {
        if(users[u]._id===userId)
        {
            users[u].watchedList.push(seriesId);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function addToWishList(req, res) {
    var userId=req.params.userId;
    var seriesId=req.params.seriesId;
    for(var u in users)
    {
        if(users[u]._id===userId)
        {
            users[u].wishList.push(seriesId);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function findUserById(req, res) {

    var userId = req.params['userId'];
    for (var u in users)
    {
        if(users[u]._id === userId)
        {
            res.json(users[u]);
            console.log(users[u]);
            return;
        }
    }
    res.json(null);

}

function findUserByUsername(req, res) {

    var username = req.query.username;

    for(var u in users)
    {
        if(users[u].username === username)
        {
            res.json(users[u]);
            return;
        }
    }
    res.json(null);
}

function findUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    for(u in users)
    {
        var found=null;
        if(users[u].username === username && users[u].password === password)
        {
            res.json(users[u]);
            return;
        }

    }
    res.json(null);

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
    user._id = (new Date().getTime())+"";
    users.push(user);
    res.json(user);
}

function deleteFollowingById(req, res) {

    var userId = req.params['userId'];
    var fId = req.params['fId'];
    for(var i =0; i<users.length;i++){
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
    res.sendStatus(404);
}

function addToFollowingById(req, res) {
    var userId = req.params['userId'];
    var fId = req.params['fId'];
    for(var i=0;i<users.length;i++){
        if(users[i]._id===userId){
            users[i].following.push(fId);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function addComment(req, res) {
    var commentId=req.params.commentId;
    var userId=req.params.userId;
    for(var u in users)
    {
        if(users[u]._id===userId)
        {
            users[u].comments.push(commentId);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteFromFollower(req, res) {
    var userId=req.params.userId;
    var followerId=req.params.followerId;
    for(var u in users)
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
    res.sendStatus(404);
}

function addToFollower(req, res) {
    var userId=req.params.userId;
    var followerId=req.params.followerId;
    for(var u in users)
    {
        if(users[u]._id===userId)
        {
            users[u].followers.push(followerId);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}
