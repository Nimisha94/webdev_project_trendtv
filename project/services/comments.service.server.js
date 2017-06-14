var app = require("../../express");

var comments = [
    {_id: "656", userId: "234", seriesId: "1668", "comment": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    {_id: "989",userId: "234", seriesId: "1425", "comment": "22Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." }
];

app.get('/api/project/comment/:commentId', getCommentById);
app.put('/api/project/comment/:commentId', updateComment);

function getCommentById(req, res) {
    var commentId=req.params.commentId;
    for(var c in comments)
    {
        if(comments[c]._id===commentId)
        {
            res.json(comments[c]);
            return;
        }
    }
    res.json(null);
}

function updateComment(req, res) {
    var commentId=req.params.commentId;
    var comment=req.body;
    for(var c in comments)
    {
        if(comments[c]._id===commentId)
        {
            comments[c]=comment;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}