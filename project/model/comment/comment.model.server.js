var mongoose = require("mongoose");
var userModel = require("../user/user.model.server");
var commentSchema = require("./comment.schema.server");

var commentModel = mongoose.model("CommentModel", commentSchema);

commentModel.getCommentById = getCommentById;
commentModel.updateComment = updateComment;
commentModel.getCommentsBySeriesId = getCommentsBySeriesId;
commentModel.createComment = createComment;
commentModel.findAllComments = findAllComments;
commentModel.deleteComment = deleteComment;

module.exports = commentModel;

function getCommentById(commentId) {
    return commentModel.findById(commentId);
}

function updateComment(commentId,comment) {
    return commentModel.update({_id:commentId}, {$set:comment});
}

function getCommentsBySeriesId(seriesId) {
    return commentModel.find({seriesId:seriesId});
}

function createComment(comment) {
    return commentModel.create(comment)
        /*.then(function (comment) {
            return userModel.addComment(comment.userId,comment._id);*/
        //});
}

function findAllComments() {
    return commentModel.find();
}

function deleteComment(commentId) {
    return commentModel.remove({_id: commentId});
}