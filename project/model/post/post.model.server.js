var mongoose = require("mongoose");
var postSchema = require("./post.schema.server");

var postModel = mongoose.model("PostModel", postSchema);

postModel.getPostsByActorId = getPostsByActorId;
postModel.createPost = createPost;
postModel.getPostById = getPostById;
postModel.updatePost = updatePost;
postModel.likePost = likePost;
postModel.removeFromDislike = removeFromDislike;
postModel.dislikePost = dislikePost;
postModel.removeFromLike = removeFromLike;
postModel.findAllPosts = findAllPosts;
postModel.deletePost = deletePost;

function getPostsByActorId(actorId) {
    return postModel.find({actorId: actorId});
}

function createPost(post) {
    return postModel.create(post);
}

function getPostById(postId) {
    return postModel.findById(postId);
}

function updatePost(postId, post) {
    return postModel.update({_id:postId}, {$set:post});
}

function likePost(postId, userId) {
    return postModel.findById(postId)
        .then(function (post) {
            post.likes.push(userId);
            return post.save();
        });
}

function removeFromDislike(postId, userId) {
    return postModel.findById(postId)
        .then(function (post) {
            var index = post.dislikes.indexOf(userId);
            post.dislikes.splice(index,1);
            return post.save();
        });
}

function dislikePost(postId, userId) {
    return postModel.findById(postId)
        .then(function (post) {
            post.dislikes.push(userId);
            return post.save();
        });
}

function removeFromLike(postId, userId) {
    return postModel.findById(postId)
        .then(function (post) {
            var index = post.dislikes.indexOf(userId);
            post.likes.splice(index,1);
            return post.save();
        });
}

function findAllPosts() {
    return postModel.find();
}

function deletePost(postId) {
    return postModel.remove({_id: postId});
}

module.exports = postModel;

