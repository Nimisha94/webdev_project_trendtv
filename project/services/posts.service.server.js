var app = require("../../express");
var postModel=require("../model/post/post.model.server");

app.get('/api/project/actor/post/:actorId', getPostsByActorId);
app.post('/api/project/post', createPost);
app.get('/api/project/post/:postId', getPostById);
app.put('/api/project/post/:postId', updatePost);
app.put('/api/project/like/add/post/:postId/user/:userId', likePost);
app.put('/api/project/dislike/remove/post/:postId/user/:userId', removeFromDislike);
app.put('/api/project/dislike/add/post/:postId/user/:userId', dislikePost);
app.put('/api/project/like/remove/post/:postId/user/:userId', removeFromLike);
app.get('/api/project/posts', findAllPosts);
app.delete('/api/project/post/:postId', deletePost);

function getPostsByActorId(req, res) {
    var actorId = req.params.actorId;
    postModel.getPostsByActorId(actorId)
        .then(function (posts) {
            res.json(posts);
        },function (err) {
            res.json([]);
        });
}

function createPost(req, res) {
    var post = req.body;
    postModel.createPost(post)
        .then(function (post) {
            res.json(post);
        }, function (err) {
            res.json(null);
        });
}

function getPostById(req, res) {
    var postId = req.params['postId'];
    postModel.getPostById(postId)
        .then(function (post) {
            res.json(post);
        }, function (err) {
            res.json(null);
        });
}

function updatePost(req, res) {
    var postId = req.params['postId'];
    var post = req.body;
    postModel.updatePost(postId, post)
        .then(function (post) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function likePost(req, res) {
    var postId = req.params['postId'];
    var userId = req.params['userId'];
    postModel.likePost(postId, userId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function removeFromDislike(req, res) {
    var postId = req.params['postId'];
    var userId = req.params['userId'];
    postModel.removeFromDislike(postId, userId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function dislikePost(req, res) {
    var postId = req.params['postId'];
    var userId = req.params['userId'];
    postModel.dislikePost(postId, userId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function removeFromLike(req, res) {
    var postId = req.params['postId'];
    var userId = req.params['userId'];
    postModel.removeFromLike(postId, userId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findAllPosts(req, res) {
    postModel.findAllPosts()
        .then(function (posts) {
            res.json(posts);
        }, function (err) {
            res.json([]);
        });
}

function deletePost(req, res) {
    var postId = req.params['postId'];
    postModel.deletePost(postId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}