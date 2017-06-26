var app = require("../../express");
var commentModel=require("../model/comment/comment.model.server");

app.get('/api/project/comment/:commentId', getCommentById);
app.put('/api/project/comment/:commentId', updateComment);
app.get('/api/project/comment/comment/:seriesId', getCommentsBySeriesId);
app.post('/api/project/comment', createComment);
app.get('/api/project/comments', findAllComments);
app.delete('/api/project/comment/:commentId', deleteComment);

function createComment(req, res) {
    var comment = req.body;
    commentModel.createComment(comment)
        .then(function (comment) {
            res.json(comment);
        },function (err) {
            res.send(err);
        });
}

function getCommentById(req, res) {
    var commentId=req.params.commentId;
    commentModel.getCommentById(commentId)
        .then(function (comment) {
            res.json(comment);
        },function (err) {
            res.json(null);
        });
}

function updateComment(req, res) {
    var commentId=req.params.commentId;
    var comment=req.body;
    commentModel.updateComment(commentId,comment)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
}

function getCommentsBySeriesId(req, res) {
    var seriesId=req.params.seriesId;
    var comm=[];
    commentModel.getCommentsBySeriesId(seriesId)
        .then(function (comments) {
            res.json(comments);
        },function (err) {
            res.json([]);
        });
}

function findAllComments(req, res) {
    commentModel.findAllComments()
        .then(function (comments) {
            res.json(comments);
        }, function (err) {
            res.json([]);
        });
}

function deleteComment(req, res) {
    var commentId = req.params['commentId'];
    commentModel.deleteComment(commentId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}