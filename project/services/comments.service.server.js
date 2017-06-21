var app = require("../../express");
var commentModel=require("../model/comment/comment.model.server");

/*var comments = [
    {_id: "656", userId: "123", seriesId: "1425", "comment": "11Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    {_id: "989",userId: "234", seriesId: "1425", "comment": "22Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." }
];*/

app.get('/api/project/comment/:commentId', getCommentById);
app.put('/api/project/comment/:commentId', updateComment);
app.get('/api/project/comment/series/:seriesId', getCommentsBySeriesId);
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
    /*comment._id = (new Date().getTime())+"";
    comments.push(comment);
    res.json(comment);*/
}

function getCommentById(req, res) {
    var commentId=req.params.commentId;
    commentModel.getCommentById(commentId)
        .then(function (comment) {
            res.json(comment);
        },function (err) {
            res.json(null);
        });
    /*for(var c in comments)
    {
        if(comments[c]._id===commentId)
        {
            res.json(comments[c]);
            return;
        }
    }
    res.json(null);*/
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
    /*for(var c in comments)
    {
        if(comments[c]._id===commentId)
        {
            comments[c]=comment;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);*/
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
    /*for(var c in comments)
    {
        if(comments[c].seriesId===seriesId)
        {
            comm.push(comments[c]);
        }
    }
    res.json(comm);*/
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