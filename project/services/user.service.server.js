var app = require("../../express");

var users = [
 {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "",
     imageUrl:"", watchList:[], wishList: [], followers: [], following: [], comments:[] },
 {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "",
     imageUrl:"", watchList:[], wishList: [], followers: [], following: [], comments:[]},
 {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "",
     imageUrl:"", watchList:[], wishList: [], followers: [], following: [], comments:[]},
 {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "",
     imageUrl:"", watchList:[], wishList: [], followers: [], following: [], comments:[]}
 ];

app.get('/api/project/user', findUser );
app.post('/api/project/user', createUser);
app.get('/api/project/user/:userId', findUserById );

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